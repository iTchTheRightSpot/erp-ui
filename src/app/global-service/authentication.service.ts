import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { BehaviorSubject, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ActiveUser } from '@/app/app.util';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly domain = environment.domain;
  private readonly http = inject(HttpClient);

  private readonly activeStaffRequest = () =>
    this.http.get<ActiveUser>(`${this.domain}active/staff`, {
      withCredentials: true,
    });

  private readonly activeStaffSubject = new BehaviorSubject<
    Observable<ActiveUser>
  >(this.activeStaffRequest());

  readonly activeStaff$ = this.activeStaffSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));
}
