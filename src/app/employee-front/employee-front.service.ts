import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AppointmentResponse,
  AppointmentResponseMapper,
  dummyAppointments
} from '@/app/employee-front/employee-front.util';
import { environment } from '@/environments/environment';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ToastService } from '@/app/global-service/toast.service';
import { CacheService } from '@/app/global-service/cache.service';
import { AuthenticationService } from '@/app/global-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFrontService {
  private static readonly cachedService = new CacheService<
    string,
    AppointmentResponse[]
  >();

  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  protected readonly authenticationService = inject(AuthenticationService);

  private readonly cacheKeyBuilder = (selected: Date) =>
    `${1 + selected.getMonth()}_${selected.getFullYear()}`;

  /**
   * Returns an observable that emits a paginated list of {@link AppointmentResponse}
   * based on the day selected. The backend returns all appointments that fall
   * in-between `selected` and the end of the month. To improve UX and efficiency,
   * we cache response received from the backend to {@link cachedService}.
   *
   * @param selected the start date to return all {@link AppointmentResponse}.
   * @return an Observable that emits an array of {@link AppointmentResponse}.
   * */
  readonly appointmentsOnSelectedMonth = (selected: Date) => {
    if (!this.production)
      return of<AppointmentResponse[]>(dummyAppointments(20));

    const key = this.cacheKeyBuilder(selected);

    return EmployeeFrontService.cachedService.getItem(key).pipe(
      switchMap((value) => {
        if (value) return of(value);

        let params = new HttpParams();
        params = params.append('day_of_month', selected.getDate());
        params = params.append('month', 1 + selected.getMonth());
        params = params.append('year', selected.getFullYear());
        const user = this.authenticationService.activeUser();
        params = params.append('employee_id', user ? user.user_id : '');

        return this.request(params).pipe(
          tap((arr) => EmployeeFrontService.cachedService.setItem(key, arr))
        );
      })
    );
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
        params: params
      })
      .pipe(
        map((objs) => objs.map((obj) => AppointmentResponseMapper(obj))),
        catchError((err) =>
          this.toastService.messageHandleIterateError<AppointmentResponse>(err)
        )
      );
}
