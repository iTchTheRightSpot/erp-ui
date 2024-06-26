import { inject, Injectable } from '@angular/core';
import { Page, Role } from '@/app/app.util';
import {
  StaffDto,
  staffs$,
} from '@/app/store-front/book/book-staff/book-staff.dto';
import { catchError, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { CacheService } from '@/app/global-service/cache.service';

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

  private readonly cacheKey = (page: number, size: number, role: Role | null) =>
    `${page}_${size}_${role}`;

  readonly users = (
    pageNumber: number = 0,
    size: number = 30,
    role: Role | null = null,
  ) =>
    UserService.cacheService
      .getItem(this.cacheKey(pageNumber, size, role))
      .pipe(
        switchMap((page) =>
          page ? of(page) : this.usersRequest$(pageNumber, size, role),
        ),
      );

  private readonly usersRequest$ = (
    pageNum: number,
    size: number,
    role: Role | null,
  ) =>
    this.production
      ? this.http
          .get<
            Page<StaffDto>
          >(role ? `${this.domain}staff?page=${pageNum}&size=${size}&role=${role}` : `${this.domain}staff?page=${pageNum}&size=${size}`, { withCredentials: true })
          .pipe(
            tap((page) =>
              UserService.cacheService.setItem(
                this.cacheKey(pageNum, size, role),
                page,
              ),
            ),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorNothing(e),
            ),
          )
      : staffs$;
}
