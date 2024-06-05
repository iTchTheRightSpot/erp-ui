import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, delay, map, merge, of, startWith, tap } from 'rxjs';
import { ActiveUser, Role, STORE_FRONT_HOME } from '@/app/app.util';
import { toSignal } from '@angular/core/rxjs-interop';
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

  private readonly activeStaffSignal = signal<ActiveUser | undefined>(
    undefined,
  );

  readonly staff = this.activeStaffSignal;

  private readonly activeStaff = () =>
    this.http
      .get<ActiveUser>(`${this.domain}active/staff`, { withCredentials: true })
      .pipe(
        tap((staff) => this.activeStaffSignal.set(staff)),
        catchError((err) => this.toastService.messageErrorNothing(err)),
      );

  readonly isStaff = () => {
    if (!this.production) return of(true);

    const staff = this.activeStaffSignal();

    if (staff) {
      return of(
        staff.role === Role.EMPLOYEE ||
          staff.role === Role.OWNER ||
          staff.role === Role.DEVELOPER,
      );
    }

    return this.activeStaff().pipe(
      map(
        (s) =>
          s.role === Role.EMPLOYEE ||
          s.role === Role.OWNER ||
          s.role === Role.DEVELOPER,
      ),
    );
  };

  readonly logout = () =>
    this.production
      ? this.http
          .get<
            HttpResponse<any>
          >(`${this.domain}logout`, { withCredentials: true })
          .pipe(
            tap(() => this.router.navigate([STORE_FRONT_HOME])),
            map(() => false),
            startWith(true),
            catchError((e) => this.toastService.messageErrorBool(e)),
          )
      : merge(of(true), of(false).pipe(delay(3000)));
}
