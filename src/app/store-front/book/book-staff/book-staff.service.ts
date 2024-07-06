import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';
import { ToastService } from '@/app/global-service/toast.service';
import {
  UserDto,
  staffs
} from '@/app/store-front/book/book-staff/book-staff.dto';
import { BookService } from '@/app/store-front/book/book.service';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { CacheService } from '@/app/global-service/cache.service';

@Injectable({
  providedIn: 'root'
})
export class BookStaffService {
  private static readonly cacheService = new CacheService<string, UserDto[]>();

  private readonly domain: string | undefined = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly bookService = inject(BookService);

  private readonly buildCacheKey = (services: BookServiceOfferedDto[]) =>
    services.map((s) => s.service_name).join('_');

  readonly employeesByServicesSelected = (services: BookServiceOfferedDto[]) =>
    this.bookService.setServicesOfferedSelected(services);

  readonly staffs$ = () => {
    const services = this.bookService.bookingInfo().servicesOffered;

    if (!services) {
      this.toastService.message('please select a service pre-book');
      throw new Error();
    }

    const key = this.buildCacheKey(services);

    return this.production
      ? BookStaffService.cacheService.getItem(key).pipe(
          switchMap((value) => {
            if (value) return of(value);

            let params = new HttpParams();
            services.forEach(
              (service) =>
                (params = params.append(
                  'service_name',
                  service.service_name.trim()
                ))
            );
            return this.request$(params, key);
          })
        )
      : of(staffs().get(key));
  };

  private readonly request$ = (params: HttpParams, key: string) =>
    this.http
      .get<
        UserDto[]
      >(`${this.domain}service-offered/staffs`, { withCredentials: true, params: params })
      .pipe(
        tap((staffs) => BookStaffService.cacheService.setItem(key, staffs)),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<UserDto>(e)
        )
      );
}
