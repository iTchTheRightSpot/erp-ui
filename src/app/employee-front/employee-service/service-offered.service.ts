import { inject, Injectable, signal } from '@angular/core';
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
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferedService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly servicesOfferedSignal = signal<
    ServiceOfferedDto[] | undefined
  >(undefined);

  private readonly allServicesRequest = toSignal(
    this.production
      ? this.http
          .get<
            ServiceOfferedDto[]
          >(`${this.domain}employee/service-offered`, { withCredentials: true })
          .pipe(
            tap((arr) => this.servicesOfferedSignal.set(arr)),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError<ServiceOfferedDto>(e),
            ),
          )
      : of(dummyServices(15)),
    {
      initialValue: [] as ServiceOfferedDto[],
    },
  );

  readonly servicesOffered = () => {
    const arr = this.servicesOfferedSignal();
    return arr ? arr : this.allServicesRequest();
  };

  private readonly createUpdateSubject = new Subject<Observable<boolean>>();

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
            tap(() =>
              this.servicesOfferedSignal.set(this.allServicesRequest()),
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
            tap(() =>
              this.servicesOfferedSignal.set(this.allServicesRequest()),
            ),
            map(() => false),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e),
            ),
          )
      : of(false).pipe(delay(5000));
}
