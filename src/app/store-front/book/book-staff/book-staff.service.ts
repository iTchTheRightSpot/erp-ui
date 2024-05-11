import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';
import {
  DUMMY_STAFFS,
  StaffDto,
} from '@/app/store-front/book/book-staff/book-staff.dto';
import { BookService } from '@/app/store-front/book/book.service';

@Injectable({
  providedIn: 'root',
})
export class BookStaffService {
  private readonly domain: string | undefined = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly bookService = inject(BookService);

  private readonly map = new Map<string, StaffDto[]>();

  constructor() {
    DUMMY_STAFFS(this.map);
  }

  readonly employeesByService = (service: string, duration: number) =>
    this.bookService.setServiceName(service, duration);

  readonly staffs$ = () => {
    const parent = this.bookService.dto();
    const bool = this.map.has(parent.service_name);

    if (bool) return of(this.map.get(parent.service_name));

    return this.http
      .get<
        StaffDto[]
      >(`${this.domain}service-offered/employees`, { withCredentials: true })
      .pipe(
        tap((arr) => this.map.set(parent.service_name, arr)),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<StaffDto>(e),
        ),
      );
  };
}
