import { inject, Injectable } from '@angular/core';
import { KEY_OF_ROLE, Page, Role } from '@/app/app.util';
import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import {
  catchError,
  combineLatest,
  concat,
  concatMap,
  map,
  of,
  switchMap,
  tap,
  timer
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { environment } from '@/environments/environment';
import { ToastService } from '@/app/global-service/toast.service';
import { CacheService } from '@/app/global-service/cache.service';
import { dummyUsers$ } from '@/app/employee-front/user/user.util';
import { AuthenticationService } from '@/app/global-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static readonly cacheService = new CacheService<
    string,
    Page<UserDto>
  >();

  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);

  private readonly cacheKey = (
    page: number,
    size: number,
    role: Role | null,
    name: string
  ) => `${page}_${size}_${role}_${name}`;

  readonly users = (
    pageNumber: number = 0,
    size: number = 30,
    role: Role | null = null,
    name: string = ''
  ) =>
    this.production
      ? UserService.cacheService
          .getItem(this.cacheKey(pageNumber, size, role, name))
          .pipe(
            switchMap((page) => {
              if (page) return of(page);
              let params = new HttpParams();
              params = params.append('page', pageNumber);
              params = params.append('size', size);
              params = params.append('username', name);
              if (role) params = params.append('role', role);
              return this.allUsersRequest$(params);
            })
          )
      : dummyUsers$();

  private readonly allUsersRequest$ = (params: HttpParams) =>
    this.http
      .get<
        Page<UserDto>
      >(`${this.domain}staff`, { withCredentials: true, params: params })
      .pipe(
        tap((page) => {
          const pageNumber = params.get('page');
          const size = params.get('size');
          const name = params.get('username');

          if (pageNumber !== null && size !== null && name !== null)
            UserService.cacheService.setItem(
              this.cacheKey(
                Number(pageNumber),
                Number(size),
                KEY_OF_ROLE(params.get('role')),
                name
              ),
              page
            );
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageErrorNothing(e)
        )
      );

  readonly updateUserRole = (
    obj: { employeeId: string; role: Role },
    pageNumber: number = 0,
    size: number = 30,
    role: Role | null = null,
    name: string = ''
  ) => {
    if (!this.production)
      return concat(of(true), timer(5000).pipe(concatMap(() => of(false))));

    let params = new HttpParams();
    params = params.append('employee_id', obj.employeeId);
    params = params.append('role', obj.role);

    let allUsersParams = new HttpParams();
    allUsersParams = allUsersParams.append('page', pageNumber);
    allUsersParams = allUsersParams.append('size', size);
    allUsersParams = allUsersParams.append('username', name);
    if (role) allUsersParams = allUsersParams.append('role', role);

    return this.updateUserRoleRequest(params, allUsersParams);
  };

  private readonly updateUserRoleRequest = (
    params: HttpParams,
    allUsersParams: HttpParams
  ) =>
    this.http
      .patch<
        HttpResponse<any>
      >(`${this.domain}staff`, {}, { withCredentials: true, params: params })
      .pipe(
        switchMap(() => {
          const request$ = this.allUsersRequest$(allUsersParams);
          const user = this.authenticationService.activeUser();
          const userIdInRequest = params.get('employee_id');

          if (
            user &&
            userIdInRequest !== null &&
            user.user_id === userIdInRequest
          ) {
            return combineLatest([
              request$,
              this.authenticationService.activeUser$()
            ]);
          }

          return request$;
        }),
        map(() => false),
        catchError((e) => this.toastService.messageErrorBool(e))
      );
}
