import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ValidTimes } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.dto';
import { environment } from '@/environments/environment.ts';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { BookService } from '@/app/store-front/book/book.service';
import { ToastService } from '@/app/global-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentDatesService {
  private readonly domain = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);

  readonly parent = this.bookService.dto;
  private readonly subject = new BehaviorSubject<Date>(new Date());

  private readonly cache = new Map<string, Date[]>();
  private readonly sig = signal<Date[]>([]);

  readonly datesToHighlight = this.sig;

  readonly selectedAppointmentDate = (date: Date) => {
    this.bookService.setTimeSelected(date);
    this.subject.next(date);
  };

  /**
   * Called if a status of 409 is received from the server.
   * In other words, the time a customer wants to pre-book has
   * been confirmed.
   * */
  readonly deleteFromCache = (date: Date) => {
    const dto = this.parent();
    const email = dto.staff ? dto.staff.email : '';
    // TODO delete date from dates to highlight
    this.cache.delete(
      `${date.getDate()}_${1 + date.getMonth()}_${date.getFullYear()}_${email}`,
    );
  };

  readonly dates$ = () =>
    this.subject.asObservable().pipe(
      switchMap((date) => {
        const dto = this.parent();
        const email = dto.staff ? dto.staff.email : '';

        const key = `${date.getDate()}_${1 + date.getMonth()}_${date.getFullYear()}_${email}`;

        const cache = this.cache.get(key);
        if (this.cache.has(key) && cache) return of<Date[]>(cache);

        const name = dto.serviceOffered ? dto.serviceOffered.name : '';
        return this.req$(name, email, date);
      }),
      catchError((e: HttpErrorResponse) =>
        this.toastService.messageHandleIterateError<Date>(e),
      ),
    );

  private readonly req$ = (
    name: string,
    email: string,
    selected: Date,
  ): Observable<Date[]> =>
    this.http
      .get<
        ValidTimes[]
      >(`${this.domain}appointment?service_name=${name}&employee_email=${email}&day=${selected.getDate()}&month=${1 + selected.getMonth()}&year=${selected.getFullYear()}`, { withCredentials: true })
      .pipe(
        tap((objs) =>
          objs.forEach((obj) => {
            const date = new Date(obj.date);
            this.sig().push(date);
            this.cache.set(
              `${date.getDate()}_${1 + date.getMonth()}_${date.getFullYear()}_${email}`,
              obj.times,
            );
          }),
        ),
        map((objs: ValidTimes[]) => {
          const found = objs.find((obj) => {
            const format = selected.toLocaleDateString([], {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            const res = new Date(obj.date).toLocaleDateString([], {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return format === res;
          });

          return found ? found.times : [];
        }),
      );
}
