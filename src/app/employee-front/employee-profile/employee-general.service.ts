import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  concat,
  concatMap,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  timer
} from 'rxjs';
import {
  DummyServices,
  ServiceOfferedDto
} from '@/app/employee-front/employee-service/employee-service.util';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { AuthenticationService } from '@/app/global-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGeneralService {
  private readonly domain = `${environment.domain}employee/service-offered`;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);

  private readonly allServiceOfferedByEmployeeSubject = new BehaviorSubject<
    ServiceOfferedDto[] | undefined
  >(undefined);

  private readonly addServiceToEmployeeSubject = new Subject<
    Observable<boolean>
  >();

  private readonly deleteServiceAttachedToEmployeeSubject = new Subject<
    Observable<boolean>
  >();

  readonly addToServiceToUserStatus$ = this.addServiceToEmployeeSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  readonly deleteServiceAttachedToEmployeeStatus$ =
    this.deleteServiceAttachedToEmployeeSubject
      .asObservable()
      .pipe(mergeMap((obs) => obs));

  readonly allServicesOfferedByEmployeeId$ =
    this.allServiceOfferedByEmployeeSubject
      .asObservable()
      .pipe(
        switchMap((arr) =>
          arr
            ? of(arr)
            : this.allServicesOfferedByEmployeeRequest(
                this.authenticationService.activeUser()?.user_id
              )
        )
      );

  private readonly allServicesOfferedByEmployeeRequest = (
    employeeId: string | undefined
  ) =>
    this.production
      ? this.http
          .get<
            ServiceOfferedDto[]
          >(`${this.domain}/by-employee-id?employee_id=${employeeId}`, { withCredentials: true })
          .pipe(
            tap((arr) => this.allServiceOfferedByEmployeeSubject.next(arr)),
            catchError((e) =>
              this.toastService.messageHandleIterateError<ServiceOfferedDto>(e)
            )
          )
      : of(DummyServices(6));

  readonly addServiceToEmployee = (serviceName: string) =>
    this.addServiceToEmployeeSubject.next(
      this.production
        ? this.addServiceToEmployeeRequest(
            this.authenticationService.activeUser()?.user_id,
            serviceName
          )
        : concat(of(true), timer(5000).pipe(concatMap(() => of(false))))
    );

  private readonly addServiceToEmployeeRequest = (
    employeeId: string | undefined,
    serviceName: string
  ) =>
    this.http
      .patch<
        HttpResponse<any>
      >(`${this.domain}?employee_id=${employeeId}&service_name=${serviceName}`, {}, { withCredentials: true })
      .pipe(
        switchMap((e) => this.allServicesOfferedByEmployeeRequest(employeeId)),
        map(() => false),
        catchError((e) => this.toastService.messageErrorNothing(e))
      );

  readonly deleteServiceAttachedToEmployee = (serviceId: string) =>
    this.deleteServiceAttachedToEmployeeSubject.next(
      this.production
        ? this.deleteServiceAttachedToEmployeeRequest(
            this.authenticationService.activeUser()?.user_id,
            serviceId
          )
        : concat(of(true), timer(5000).pipe(concatMap(() => of(false))))
    );

  private readonly deleteServiceAttachedToEmployeeRequest = (
    employeeId: string | undefined,
    serviceId: string
  ) =>
    this.http
      .delete<
        HttpResponse<any>
      >(`${this.domain}?employee_id=${employeeId}&service_name=${serviceId}`, { withCredentials: true })
      .pipe(
        switchMap((e) => this.allServicesOfferedByEmployeeRequest(employeeId)),
        map(() => false),
        catchError((e) => this.toastService.messageErrorNothing(e))
      );
}
