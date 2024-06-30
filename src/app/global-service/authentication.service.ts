import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, delay, map, merge, of, startWith, tap } from 'rxjs';
import { ActiveUser, Role } from '@/app/app.util';
import { Router } from '@angular/router';
import { ToastService } from '@/app/shared-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  readonly csrf = () =>
    this.production
      ? this.http.get<{
          token: string;
          parameterName: string;
          headerName: string;
        }>(`${this.domain}csrf`, { withCredentials: true })
      : of({ token: 'token', parameterName: 'name', headerName: 'header' });

  private readonly activeUserSignal = signal<ActiveUser | undefined>(undefined);

  private readonly activeUser$ = () =>
    this.http
      .get<ActiveUser>(`${this.domain}active`, { withCredentials: true })
      .pipe(
        tap((staff) => this.activeUserSignal.set(staff)),
        catchError((err) => this.toastService.messageErrorNothing(err)),
      );

  readonly isStaff = () => {
    if (!this.production) {
      this.activeUserSignal.set({
        principal: 'Admin Developer',
        user_id: '1000',
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
