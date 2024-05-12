import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { BookService } from '@/app/store-front/book/book.service';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';

@Injectable({
  providedIn: 'root',
})
export class BookStaffService {
  private readonly domain: string | undefined = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly bookService = inject(BookService);

  private readonly cache = new Map<string, StaffDto[]>();

  readonly employeesByServiceSelected = (service: BookServiceOfferedDto) =>
    this.bookService.setServiceOfferedSelected(service);

  readonly staffs$ = () => {
    const obj = this.bookService.dto().serviceOffered;
    const service = obj ? obj.service_name : '';
    const bool = this.cache.has(service);

    if (bool) return of(this.cache.get(service));

    return this.http
      .get<
        StaffDto[]
      >(`${this.domain}service-offered/employees`, { withCredentials: true })
      .pipe(
        tap((arr) => {
          const img = './assets/images/staffs/engin-akyurt.jpg';
          arr.forEach((obj) => (obj.picture.length === 0 ? img : obj.picture));
          this.cache.set(service, arr);
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<StaffDto>(e),
        ),
      );
  };
}
