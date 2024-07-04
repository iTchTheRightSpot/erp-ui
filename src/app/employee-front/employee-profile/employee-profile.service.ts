import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  catchError,
  concat,
  concatMap,
  map,
  mergeMap,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  timer
} from 'rxjs';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { UpdateProfileDto } from '@/app/employee-front/employee-profile/employee-profile.util';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);

  private readonly updateProfileStatusSubject = new Subject<
    Observable<boolean>
  >();

  readonly user = this.authenticationService.activeUser;

  readonly updateProfileStatus$ = this.updateProfileStatusSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  readonly updateUserProfile = (dto: UpdateProfileDto) =>
    this.updateProfileStatusSubject.next(
      this.production
        ? this.updateUserProfileRequest(dto).pipe(startWith(true))
        : concat(of(true), timer(5000).pipe(concatMap(() => of(false))))
    );

  private readonly updateUserProfileRequest = (dto: UpdateProfileDto) =>
    this.http
      .put<
        HttpResponse<any>
      >(`${this.domain}staff`, dto, { withCredentials: true })
      .pipe(
        switchMap(() =>
          this.authenticationService.activeUser$().pipe(map(() => false))
        ),
        catchError((e) => this.toastService.messageErrorNothing(e))
      );
}
