import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  readonly employeesByServiceSelected = (service: BookServiceOfferedDto) =>
    this.bookService.setServiceOfferedSelected(service);

  readonly staffs$ = () => {
    const serviceOffered = this.bookService.bookingInfo().serviceOffered;
    const name = serviceOffered ? serviceOffered.name : '';
    const bool = this.cache.has(name);

    if (bool) return of(this.cache.get(name));

    return this.http
      .get<
        StaffDto[]
      >(`${this.domain}service-offered/staffs?service_name=${name}`, { withCredentials: true })
      .pipe(
        tap((arr) => {
          const img = './assets/images/staffs/engin-akyurt.jpg';
          arr.forEach((obj) => (obj.picture.length === 0 ? img : obj.picture));
          this.cache.set(name, arr);
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<StaffDto>(e),
        ),
      );
  };
}
