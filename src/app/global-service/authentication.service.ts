import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { ActiveUser } from '@/app/app.util';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly domain = environment.domain;
  private readonly http = inject(HttpClient);

  private readonly activeStaffSubject = new BehaviorSubject<
    ActiveUser | undefined
  >(undefined);

  readonly activeStaff$ = this.activeStaffSubject
    .asObservable()
    .pipe(switchMap((obj) => (obj ? of(obj) : this.activeStaffRequest())));

  private readonly activeStaffRequest = () =>
    this.http.get<ActiveUser>(`${this.domain}active/staff`, {
      withCredentials: true,
    });
}
