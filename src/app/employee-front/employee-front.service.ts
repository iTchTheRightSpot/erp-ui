import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AppointmentResponse,
  AppointmentResponseMapper,
  ConfirmationStatus,
  dummyAppointments,
  ServiceName
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

  /**
   * Returns an observable that emits a paginated list of {@link AppointmentResponse}
   * based on the day selected. The backend returns all appointments that fall
   * in-between `selected` and the end of the month. To improve UX and efficiency,
   * we cache response received from the backend to {@link cachedService}.
   *
   * @param selected the start date to return all {@link AppointmentResponse}.
   * @param refresh
   * @return an Observable that emits an array of {@link AppointmentResponse}.
   * */
  readonly appointmentsOnSelectedMonth = (
    selected: Date,
    refresh: boolean = false
  ) => {
    if (!this.production)
      return of<AppointmentResponse[]>(dummyAppointments(20));

    const user = this.authenticationService.activeUser();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const key = `${selected.getMonth()}_${selected.getFullYear()}_${timezone}`;

    let params = new HttpParams();
    params = params.append('day_of_month', 1);
    params = params.append('month', 1 + selected.getMonth());
    params = params.append('year', selected.getFullYear());
    params = params.append('employee_id', user ? user.user_id : '');
    params = params.append('timezone', timezone);

    const serverRequest = this.request(params).pipe(
      tap((arr) => EmployeeFrontService.cachedService.setItem(key, arr))
    );

    return refresh
      ? serverRequest
      : EmployeeFrontService.cachedService
          .getItem(key)
          .pipe(switchMap((value) => (value ? of(value) : serverRequest)));
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
      .get<IAppointmentResponse[]>(`${this.domain}employee/appointment`, {
        withCredentials: true,
        params: params
      })
      .pipe(
        map((objs) =>
          IAppointmentResponse_ARRAY_TO_AppointmentResponse_ARRAY(objs)
        ),
        map((objs) => objs.map((obj) => AppointmentResponseMapper(obj))),
        catchError((err) =>
          this.toastService.messageHandleIterateError<AppointmentResponse>(err)
        )
      );
}

interface IAppointmentResponse {
  appointment_id: number;
  customer_name: string;
  customer_email: string;
  detail: string;
  address: string;
  phone: string;
  image: string;
  status: ConfirmationStatus;
  created_at: number;
  scheduled_for: number;
  expired_at: number;
  services: ServiceName[];
}

const IAppointmentResponse_ARRAY_TO_AppointmentResponse_ARRAY = (
  arr: IAppointmentResponse[]
) =>
  arr.map(
    (obj) =>
      ({
        appointment_id: obj.appointment_id,
        customer_name: obj.customer_name,
        customer_email: obj.customer_email,
        detail: obj.detail,
        address: obj.address,
        phone: obj.phone,
        image: obj.image,
        status: obj.status,
        created_at: new Date(obj.created_at),
        scheduled_for: new Date(obj.scheduled_for),
        expired_at: new Date(obj.expired_at),
        services: obj.services
      }) as AppointmentResponse
  );
