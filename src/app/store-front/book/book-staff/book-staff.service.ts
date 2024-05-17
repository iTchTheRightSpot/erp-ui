import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';
import {
  StaffDto,
  staffs,
} from '@/app/store-front/book/book-staff/book-staff.dto';
import { BookService } from '@/app/store-front/book/book.service';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';

@Injectable({
  providedIn: 'root',
})
export class BookStaffService {
  private readonly domain: string | undefined = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly bookService = inject(BookService);

  private readonly cache = this.production
    ? new Map<string, StaffDto[]>()
    : staffs();

  private readonly buildCacheKey = (services: BookServiceOfferedDto[]) => {
    let key = '';
    services.forEach((s) => key.concat(s.name, '_'));
    return key;
  };

  readonly employeesByServicesSelected = (services: BookServiceOfferedDto[]) =>
    this.bookService.setServicesOfferedSelected(services);

  readonly staffs$ = () => {
    const services = this.bookService.bookingInfo().servicesOffered;

    if (!services) {
      this.toastService.message('please select a service pre-book');
      throw new Error();
    }

    const key = this.buildCacheKey(services);

    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      if (value) return of<StaffDto[]>(value);
    }

    let params = new HttpParams();
    services.forEach(
      (service) =>
        (params = params.append('service_name', service.name.trim())),
    );
    return this.request$(params, key);
  };

  private readonly request$ = (params: HttpParams, key: string) =>
    this.http
      .get<
        StaffDto[]
      >(`${this.domain}service-offered/staffs`, { withCredentials: true, params: params })
      .pipe(
        tap((staffs) => {
          const img = './assets/images/staffs/engin-akyurt.jpg';
          staffs.forEach(
            (obj) =>
              (obj.picture = obj.picture.length === 0 ? img : obj.picture),
          );
          this.cache.set(key, staffs);
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<StaffDto>(e),
        ),
      );
}
