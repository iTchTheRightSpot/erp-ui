import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ValidTime } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.dto';
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

  readonly bookingInfoSignal = this.bookService.bookingInfo;

  /**
   * BehaviorSubject used to emit selected dates.
   */
  private readonly subject = new BehaviorSubject<Date>(new Date());

  /**
   * Cache to store fetched valid times.
   */
  private readonly cache = new Map<string, ValidTime[]>();

  /**
   * Cache to store fetched valid dates from {@link ValidTime}s.
   * */
  private readonly datesToHighlightCache = new Map<string, Date[]>();

  /**
   * Signal for dates to be highlighted on the calendar.
   */
  private readonly datesToHighlightSignal = signal<Date[]>([]);
  readonly datesToHighlight = this.datesToHighlightSignal;

  /**
   * Updates the selected appointment date and notifies subscribers.
   *
   * @param date The date of the selected appointment.
   */
  readonly selectedAppointmentDate = (date: Date) => {
    this.bookService.setTimeDateSelected(date);
    this.subject.next(date);
  };

  /**
   * Updates the selected appointment time and notifies subscribers.
   *
   * @param time The time of the selected appointment.
   */
  readonly selectedAppointmentTime = (time: Date) =>
    this.bookService.setTimeSelected(time);

  /**
   * Constructs the key for the cache based on the date and staff email.
   *
   * @param name The name of the {@link BookServiceOfferedDto}
   * @param date The date used to construct the key.
   * @param staffEmail The email of the staff member.
   * @returns The constructed cache key.
   */
  private readonly key = (name: string, date: Date, staffEmail: string) =>
    `${name}_${1 + date.getMonth()}_${date.getFullYear()}_${staffEmail}`;

  /**
   * Formats the date in the "dd-mm-yyyy" format.
   *
   * @param date The date to be formatted.
   * @returns A string representing the formatted date.
   */
  readonly format = (date: Date) =>
    date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  /**
   * Handles deletion from the cache when a 409 status is received from the server,
   * indicating that the time a customer wants to pre-book has already been confirmed.
   *
   * @param name The name of the service offered from {@link BookServiceOfferedDto}.
   * @param date The date used to construct the cache key.
   */
  readonly deleteFromCache = (name: string, date: Date) => {
    const info = this.bookingInfoSignal();
    this.cache.delete(this.key(name, date, info.staff ? info.staff.email : ''));
  };

  /**
   * Retrieves available booking dates from the server based on the selected date.
   * If the data is available in the cache, it returns the cached dates;
   * otherwise, it makes a request to the server.
   *
   * @returns An observable that emits an array of available booking dates for the
   *          specified day. The dates are contained in the {@link ValidTime}
   *          property.
   */
  readonly dates$ = () =>
    this.subject.asObservable().pipe(
      switchMap((selected) => {
        const dto = this.bookingInfoSignal();
        const name = dto.serviceOffered ? dto.serviceOffered.name : '';
        const email = dto.staff ? dto.staff.email : '';

        const key = this.key(name, selected, email);

        if (this.cache.has(key)) {
          const objs = this.cache.get(key) || [];
          const found = objs.find(
            (obj) => this.format(selected) === this.format(new Date(obj.date)),
          );

          const highlight = this.datesToHighlightCache.get(key);

          if (highlight) this.datesToHighlight.set(highlight);

          return found ? of<Date[]>(found.times) : of<Date[]>([]);
        }

        return this.req$(name, email, selected);
      }),
      catchError((e: HttpErrorResponse) =>
        this.toastService.messageHandleIterateError<Date>(e),
      ),
    );

  /**
   * Retrieves available booking times from the server based on the specified date.
   * The received data is cached in a HashMap for efficiency, where the key is
   * generated based on the month, year, and staff email, and the value is an array
   * of {@link ValidTime} objects received from the server.
   *
   * The server always returns a paginated list of available booking times
   * from the selected date to the end of the month. For example, if the selected
   * date is May 15, 2024, the server returns available booking times from May 15
   * to May 31, 2024.
   *
   * @param name The {@link BookServiceOfferedDto} for which the user wants to book.
   * @param email The email of the {@link StaffDto} the user wants to book with.
   * @param selected The date the user wants to book for.
   * @returns An observable that emits an array of available booking times for
   *          the specified day. The times are contained in the {@link ValidTime}
   *          property.
   */
  private readonly req$ = (
    name: string,
    email: string,
    selected: Date,
  ): Observable<Date[]> =>
    this.http
      .get<
        ValidTime[]
      >(`${this.domain}appointment?service_name=${name}&employee_email=${email}&day=${selected.getDate()}&month=${1 + selected.getMonth()}&year=${selected.getFullYear()}`, { withCredentials: true })
      .pipe(
        tap((objs) => {
          const key = this.key(name, selected, email);
          const value = objs.map((obj) => new Date(obj.date));

          this.datesToHighlightCache.set(key, value);
          this.datesToHighlight.set(value);

          this.cache.set(this.key(name, selected, email), objs);
        }),
        map((objs: ValidTime[]) => {
          const found = objs.find(
            (obj) => this.format(selected) === this.format(new Date(obj.date)),
          );
          return found ? found.times : [];
        }),
      );
}
