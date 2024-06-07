import { inject, Injectable, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
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
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { CacheService } from '@/app/global-service/cache.service';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentDatesService {
  private readonly domain = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);
  private readonly cacheService: CacheService<string, ValidTime[]> =
    inject(CacheService);

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
  private readonly buildCacheKey = (
    name: string,
    date: Date,
    staffEmail: string,
  ) => `${name}_${1 + date.getMonth()}_${date.getFullYear()}_${staffEmail}`;

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
    this.cacheService.deleteItem(
      this.buildCacheKey(name, date, info.staff ? info.staff.email : ''),
    );
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
        const info = this.bookingInfoSignal();
        const services = info.servicesOffered;
        const staffEmail = info.staff?.email;

        if (!services || !staffEmail) {
          this.toastService.message(
            'please select a service or staff pre-book',
          );
          throw new Error();
        }

        const name = services.map((s) => s.name).join('_');
        const key = this.buildCacheKey(name, selected, staffEmail);

        return this.cacheService.getItem(key).pipe(
          switchMap((objs) => {
            if (objs) {
              const found = objs.find(
                (obj) =>
                  this.format(selected) === this.format(new Date(obj.date)),
              );

              const highlight = this.datesToHighlightCache.get(key);

              if (highlight) this.datesToHighlight.set(highlight);

              return found ? of<Date[]>(found.times) : of<Date[]>([]);
            }

            let params = new HttpParams();
            services.forEach(
              (service) =>
                (params = params.append('service_name', service.name.trim())),
            );
            params = params.append('employee_email', staffEmail);
            params = params.append('day', selected.getDate());
            params = params.append('month', 1 + selected.getMonth());
            params = params.append('year', selected.getFullYear());

            return this.req$(params, key, selected);
          }),
        );
      }),
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
   * @param params
   * @param key
   * @param selected The date the user wants to book for.
   * @returns An observable that emits an array of available booking times for
   *          the specified day. The times are contained in the {@link ValidTime}
   *          property.
   */
  private readonly req$ = (
    params: HttpParams,
    key: string,
    selected: Date,
  ): Observable<Date[]> => {
    return this.http
      .get<
        ValidTime[]
      >(`${this.domain}appointment`, { withCredentials: true, params })
      .pipe(
        tap((validTimes) => {
          const value = validTimes.map((obj) => new Date(obj.date));

          this.datesToHighlightCache.set(key, value);
          this.datesToHighlight.set(value);

          this.cache.set(key, validTimes);
        }),
        map((objs: ValidTime[]) => {
          const found = objs.find(
            (obj) => this.format(selected) === this.format(new Date(obj.date)),
          );
          return found ? found.times : [];
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<Date>(e),
        ),
      );
  };
}
