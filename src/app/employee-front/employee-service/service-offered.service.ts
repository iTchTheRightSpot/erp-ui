import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { ToastService } from '@/app/global-components/toast/toast.service';
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

  private readonly serviceInitialized: boolean | undefined = undefined;

  private readonly servicesOfferedSubject = new BehaviorSubject<
    Observable<ServiceOfferedDto[]>
  >(of([]));

  constructor() {
    if (this.serviceInitialized === undefined) {
      this.servicesOfferedSubject.next(this.allServicesRequest());
    }
    this.serviceInitialized = true;
  }

  private readonly createUpdateSubject = new Subject<Observable<boolean>>();

  readonly servicesOffered$ = this.servicesOfferedSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  readonly onCreateUpdateBtnLoading$ = this.createUpdateSubject
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

  private readonly addServiceToEmployee = (serviceName: string) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}employee/service-offered?name=${serviceName}`, {}, { withCredentials: true })
          .pipe(
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e),
            ),
          )
      : of(false).pipe(delay(5000));

  private readonly createRequest = (dto: ServiceOfferedDto) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}owner/service-offered`, dto, { withCredentials: true })
          .pipe(
            tap((dto) =>
              this.servicesOfferedSubject.next(this.allServicesRequest()),
            ),
            map(() => false),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e),
            ),
          )
      : of(false).pipe(delay(5000));

  private readonly updateRequest = (dto: ServiceOfferedDto) =>
    this.production
      ? this.http
          .put<
            HttpResponse<boolean>
          >(`${this.domain}owner/service-offered`, dto, { withCredentials: true })
          .pipe(
            tap((dto) =>
              this.servicesOfferedSubject.next(this.allServicesRequest()),
            ),
            map(() => false),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e),
            ),
          )
      : of(false).pipe(delay(5000));
}
