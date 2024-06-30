import { inject, Injectable } from '@angular/core';
import { keyOfRole, Page, Role } from '@/app/app.util';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { catchError, of, switchMap, tap } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '@/environments/environment';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { CacheService } from '@/app/global-service/cache.service';
import { dummyUsers$ } from '@/app/employee-front/user/user.util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly cacheService = new CacheService<
    string,
    Page<StaffDto>
  >();

  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly cacheKey = (
    page: number,
    size: number,
    role: Role | null,
    name: string,
  ) => `${page}_${size}_${role}_${name}`;

  readonly users = (
    pageNumber: number = 0,
    size: number = 30,
    role: Role | null = null,
    name: string = '',
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
              params = params.append('name', name);
              if (role) params = params.append('role', role);
              return this.usersRequest$(params);
            }),
          )
      : dummyUsers$();

  private readonly usersRequest$ = (params: HttpParams) =>
    this.http
      .get<
        Page<StaffDto>
      >(`${this.domain}staff`, { withCredentials: true, params: params })
      .pipe(
        tap((page) => {
          const pageNumber = params.get('page');
          const size = params.get('size');
          const name = params.get('name');

          if (pageNumber !== null && size !== null && name !== null)
            UserService.cacheService.setItem(
              this.cacheKey(
                Number(pageNumber),
                Number(size),
                keyOfRole(params.get('role')),
                name,
              ),
              page,
            );
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageErrorNothing(e),
        ),
      );
}
