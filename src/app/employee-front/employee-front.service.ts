import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AppointmentResponse,
  AppointmentResponseMapper,
  dummyAppointments,
} from '@/app/employee-front/employee-front.util';
import { environment } from '@/environments/environment';
import { catchError, map, of, tap } from 'rxjs';
import { ToastService } from '@/app/shared-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFrontService {
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly appointmentResponseCache = new Map<
    string,
    AppointmentResponse[]
  >();

  private readonly cacheKeyBuilder = (selected: Date) =>
    `${1 + selected.getMonth()}_${selected.getFullYear()}`;

  /**
   * Returns an observable that emits a paginated list of {@link AppointmentResponse}
   * based on the day selected. The backend returns all appointments that fall
   * in-between `selected` and the end of the month. To improve UX and efficiency,
   * we cache response received from the backend to {@link appointmentResponseCache}.
   *
   * @param selected the start date to return all {@link AppointmentResponse}.
   * @return an Observable that emits an array of {@link AppointmentResponse}.
   * */
  readonly appointmentFilter = (selected: Date) => {
    const key = this.cacheKeyBuilder(selected);
    if (this.appointmentResponseCache.has(key)) {
      const value = this.appointmentResponseCache.get(key);
      if (value) return of<AppointmentResponse[]>(value);
    }

    let params = new HttpParams();
    params = params.append('day_of_month', selected.getDate());
    params = params.append('month', 1 + selected.getMonth());
    params = params.append('year', selected.getFullYear());

    return this.production
      ? this.request(params).pipe(
          tap((arr) => this.appointmentResponseCache.set(key, arr)),
        )
      : of<AppointmentResponse[]>(dummyAppointments(20));
  };

  /**
   * Implementation of {@link http} to call the server to return an observable
   * of {@link AppointmentResponse}.
   *
   * @param params contains the necessary details the backend needs to process
   * the request.
   * @return an observable that emits an array of {@link AppointmentResponse}.
   * */
  private readonly request = (params: HttpParams) =>
    this.http
      .get<AppointmentResponse[]>(`${this.domain}employee/appointment`, {
        withCredentials: true,
        params: params,
      })
      .pipe(
        map((objs) => objs.map((obj) => AppointmentResponseMapper(obj))),
        catchError((err) =>
          this.toastService.messageHandleIterateError<AppointmentResponse>(err),
        ),
      );
}
