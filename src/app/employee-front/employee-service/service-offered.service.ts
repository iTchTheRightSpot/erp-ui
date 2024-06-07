import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import {
  dummyServices,
  ServiceOfferedDto,
} from '@/app/employee-front/employee-service/employee-service.util';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  mergeMap,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferedService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly serviceOfferedSubject = new BehaviorSubject<
    ServiceOfferedDto[] | undefined
  >(undefined);

  private readonly clearFormSignal = new Subject<boolean>();
  readonly clearForm$ = this.clearFormSignal
    .asObservable()
    .pipe(switchMap((bool) => of(bool, false).pipe(delay(600))));

  private readonly allServicesRequest = () =>
    this.production
      ? this.http
          .get<
            ServiceOfferedDto[]
          >(`${this.domain}employee/service-offered`, { withCredentials: true })
          .pipe(
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError<ServiceOfferedDto>(e),
            ),
          )
      : of(dummyServices(15));

  readonly servicesOffered$ = this.serviceOfferedSubject
    .asObservable()
    .pipe(switchMap((arr) => (arr ? of(arr) : this.allServicesRequest())));

  private readonly createUpdateSubject = new Subject<Observable<boolean>>();

  readonly onCreateUpdate$ = this.createUpdateSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  private readonly deleteSubject = new Subject<Observable<boolean>>();

  readonly onDelete$ = this.deleteSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  readonly create = (dto: ServiceOfferedDto) =>
    this.createUpdateSubject.next(
      this.createRequest(dto).pipe(startWith(true)),
    );

  readonly update = (dto: ServiceOfferedDto) =>
    this.createUpdateSubject.next(
      this.updateRequest(dto).pipe(startWith(true)),
    );

  readonly delete = (serviceId: string) =>
    this.deleteSubject.next(
      this.deleteRequest(serviceId).pipe(startWith(true)),
    );

  private readonly addServiceToEmployeeRequest = (serviceName: string) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}employee/service-offered?name=${serviceName}`, {}, { withCredentials: true })
          .pipe(catchError((e) => this.toastService.messageErrorBool(e)))
      : of(false).pipe(delay(5000));

  private readonly createRequest = (dto: ServiceOfferedDto) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}owner/service-offered`, dto, { withCredentials: true })
          .pipe(
            switchMap(() =>
              this.allServicesRequest().pipe(
                tap((arr) => {
                  this.serviceOfferedSubject.next(arr);
                  this.clearFormSignal.next(true);
                }),
                map(() => false),
              ),
            ),
            catchError((e) => this.toastService.messageErrorBool(e)),
          )
      : of(false).pipe(delay(5000));

  private readonly updateRequest = (dto: ServiceOfferedDto) =>
    this.production
      ? this.http
          .put<
            HttpResponse<boolean>
          >(`${this.domain}owner/service-offered`, dto, { withCredentials: true })
          .pipe(
            switchMap(() =>
              this.allServicesRequest().pipe(
                tap((arr) => {
                  this.serviceOfferedSubject.next(arr);
                  this.clearFormSignal.next(true);
                }),
                map(() => false),
              ),
            ),
            catchError((e) => this.toastService.messageErrorBool(e)),
          )
      : of(false).pipe(delay(5000));

  private readonly deleteRequest = (serviceId: string) =>
    this.production
      ? this.http
          .delete<
            HttpResponse<any>
          >(`${this.domain}owner/service-offered/${serviceId}`, { withCredentials: true })
          .pipe(
            switchMap(() =>
              this.allServicesRequest().pipe(
                tap((arr) => {
                  this.serviceOfferedSubject.next(arr);
                  this.clearFormSignal.next(true);
                }),
                map(() => false),
              ),
            ),
            catchError((e) => this.toastService.messageErrorBool(e)),
          )
      : of(false).pipe(delay(5000));
}
