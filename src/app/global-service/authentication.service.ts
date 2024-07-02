import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, delay, map, merge, of, startWith, tap } from 'rxjs';
import { Role } from '@/app/app.util';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  readonly csrf = () =>
    this.production
      ? this.http.get<{
          token: string;
          parameterName: string;
          headerName: string;
        }>(`${this.domain}csrf`, { withCredentials: true })
      : of({ token: 'token', parameterName: 'name', headerName: 'header' });

  private readonly activeUserSignal = signal<UserDto | undefined>(undefined);

  readonly activeUser$ = () =>
    this.http
      .get<UserDto>(`${this.domain}active`, { withCredentials: true })
      .pipe(
        tap((staff) => this.activeUserSignal.set(staff)),
        catchError((err) => this.toastService.messageErrorNothing(err)),
      );

  readonly isStaff = () => {
    if (!this.production) {
      this.activeUserSignal.set({
        user_id: '1000',
        name: 'Landscape Developer',
        display_name: 'Developer',
        email: 'developer@landscape.com',
        image_key:
          'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur cupiditate, dignissimos dolores eos est ex harum impedit iste maxime minus, nesciunt odit, porro possimus repellat sapiente sed sint ullam velit.',
        roles: [Role.DEVELOPER],
      });
      return of(true);
    }

    const staff = this.activeUserSignal();

    if (staff) {
      return of(
        staff.roles.includes(Role.EMPLOYEE) ||
          staff.roles.includes(Role.OWNER) ||
          staff.roles.includes(Role.DEVELOPER),
      );
    }

    return this.activeUser$().pipe(
      map(
        (s) =>
          s.roles.includes(Role.EMPLOYEE) ||
          s.roles.includes(Role.OWNER) ||
          s.roles.includes(Role.DEVELOPER),
      ),
    );
  };

  readonly activeUser = this.activeUserSignal;

  readonly logout = () =>
    this.production
      ? this.http
          .post<{
            redirect_url: string;
            status: string;
          }>(`${this.domain}logout`, {}, { withCredentials: true })
          .pipe(
            tap((res) => (window.location.href = res.redirect_url)),
            map(() => false),
            startWith(true),
            catchError((e) => this.toastService.messageErrorBool(e)),
          )
      : merge(of(true), of(false).pipe(delay(3000)));
}
