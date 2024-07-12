import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { ValidTime } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.dto';
import { environment } from '@/environments/environment.ts';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { BookService } from '@/app/store-front/book/book.service';
import { Toast, ToastService } from '@/app/global-service/toast.service';
import { CacheService } from '@/app/global-service/cache.service';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentDatesService {
  /**
   * Cache to store {@link ValidTime} objects for every server request.
   */
  private static readonly VALID_TIMES_SERVER_RESPONSE_CACHE = new CacheService<
    string,
    ValidTime[]
  >();

  private readonly domain = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);

  readonly bookingInfoSignal = this.bookService.bookingInfo;

  /**
   * Updates the selected appointment date and notifies subscribers.
   *
   * @param date The date of the selected appointment.
   */
  readonly selectedAppointmentDate = (date: Date) => {
    this.bookService.setTimeDateSelected(date);
  };

  /**
   * Updates the selected appointment time and notifies subscribers.
   *
   * @param seconds The time of the selected appointment.
   */
  readonly selectedAppointmentTime = (seconds: number) =>
    this.bookService.setTimeSelected(seconds);

  /**
   * Returns valid appointment days and time times within those days that can be booked.
   *
   * @returns An Observable that emits an array of {@link ValidTime} objects.
   * */
  readonly validAppointmentTimes = (selected: Date) => {
    const coreBookingInfo = this.bookingInfoSignal();
    const services = coreBookingInfo.servicesOffered;
    const staffId = coreBookingInfo.staff?.user_id;

    if (!services || !staffId) {
      this.toastService.message({
        key: Toast.ERROR,
        message: 'please select a service and or staff.'
      });
      throw new Error();
    }

    const serviceNames = services.map((s) => s.service_name).join('_');

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const key = `${staffId}_${serviceNames}${selected.getMonth()}_${selected.getFullYear()}_${timezone}`;

    return BookAppointmentDatesService.VALID_TIMES_SERVER_RESPONSE_CACHE.getItem(
      key
    ).pipe(
      switchMap((validTimes) => {
        if (validTimes) {
          return of(validTimes);
        }

        let params = new HttpParams();
        services.forEach(
          (service) =>
            (params = params.append(
              'service_name',
              service.service_name.trim()
            ))
        );
        params = params.append('employee_id', staffId);
        params = params.append('day', selected.getDate());
        params = params.append('month', 1 + selected.getMonth());
        params = params.append('year', selected.getFullYear());
        params = params.append('timezone', timezone);

        // call to backend
        return this.http
          .get<
            { date: string; times: number[] }[]
          >(`${this.domain}appointment`, { withCredentials: true, params })
          .pipe(
            map((response) =>
              response.map(
                (res) =>
                  ({ date: new Date(res.date), times: res.times }) as ValidTime
              )
            ),
            tap((mappedToValidTimes: ValidTime[]) =>
              BookAppointmentDatesService.VALID_TIMES_SERVER_RESPONSE_CACHE.setItem(
                key,
                mappedToValidTimes
              )
            ),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError<ValidTime>(e)
            )
          );
      })
    );
  };
}
