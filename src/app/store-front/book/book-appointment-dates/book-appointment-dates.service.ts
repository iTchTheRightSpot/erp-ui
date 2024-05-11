import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ValidTimes } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.dto';
import { environment } from '@/environments/environment.ts';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
import { BookService } from '@/app/store-front/book/book.service';
import { ToastService } from '@/app/global-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentDatesService {
  private readonly domain = environment;
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);

  private readonly parent = this.bookService.dto;
  private readonly subject = new BehaviorSubject<Date>(this.parent().start);

  private readonly cache = new Map<String, ValidTimes[]>();

  readonly selectedAppointmentDate = (date: Date) => {
    this.bookService.setStart(date);
    this.subject.next(date);
  };

  /**
   * Called if a status of 409 is received from the server.
   * In other words, the time a customer wants to pre-book has
   * been confirmed.
   * */
  readonly deleteFromCache = (date: Date) => {
    const dto = this.parent();
    this.cache.delete(
      `${dto.service_name}-${dto.employee_email}-${date.getMonth()}-${date.getFullYear()}`,
    );
  };

  readonly dates$ = () =>
    this.subject.asObservable().pipe(
      switchMap((date) => {
        const dto = this.parent();
        const key = `${dto.service_name}-${dto.employee_email}-${date.getMonth()}-${date.getFullYear()}`;

        if (this.cache.has(key)) return of<ValidTimes[]>(this.cache.get(key));

        return this.http
          .get<
            ValidTimes[]
          >(`${this.domain}appointment?service_name=${dto.service_name}&employee_email=${dto.employee_email}&day=${date.getDate()}&month=${1 + date.getMonth()}&year=${date.getFullYear()}`, { withCredentials: true })
          .pipe(tap((obj) => this.cache.set(key, obj)));
      }),
      catchError((e: HttpErrorResponse) =>
        this.toastService.messageHandleIterateError<ValidTimes>(e),
      ),
    );
}
