import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { EmployeeFrontService } from '@/app/employee-front/employee-front.service';
import { UpdateAppointmentStatusDto } from '@/app/employee-front/employee-appointment/employee-appointmen.util';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  delay,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  startWith,
  Subject
} from 'rxjs';
import { ToastService } from '@/app/global-service/toast.service';
import { AppointmentResponse } from '@/app/employee-front/employee-front.util';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAppointmentService {
  protected readonly domain = environment.domain;
  protected readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly parentService = inject(EmployeeFrontService);
  private readonly toastService = inject(ToastService);

  private readonly subject = new BehaviorSubject<
    Observable<AppointmentResponse[]>
  >(of([]));

  private readonly updateAppointmentStatusSubject = new Subject<
    Observable<boolean>
  >();

  readonly subject$ = this.subject.asObservable().pipe(
    debounceTime(400),
    mergeMap((obs) => obs)
  );

  readonly updateAppointment$ = this.updateAppointmentStatusSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  /**
   * Method does a few things. On load of dashboard or appointment components,
   * it makes a call to server to retrieve appointments for the month.
   * */
  readonly onUpdateCalendarMonth = (selected: Date) =>
    this.subject.next(this.parentService.appointmentsOnSelectedMonth(selected));

  /**
   * Makes call to server if
   * */
  readonly updateParentOnChangeMonthYear = (selected: Date) =>
    this.subject.next(this.parentService.appointmentsOnSelectedMonth(selected));

  readonly updateAppointmentStatus = (dto: UpdateAppointmentStatusDto) =>
    this.updateAppointmentStatusSubject.next(this.updateRequest(dto));

  private readonly updateRequest = (dto: UpdateAppointmentStatusDto) =>
    this.production
      ? this.http
          .put<
            HttpResponse<any>
          >(`${this.domain}employee/appointment`, dto, { withCredentials: true })
          .pipe(
            map(() => false),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e)
            ),
            startWith(true)
          )
      : merge(of(true), of(false).pipe(delay(5000)));
}
