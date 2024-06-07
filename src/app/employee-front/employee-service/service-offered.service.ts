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

/**
 * Service for managing services offered in the application.
 * Handles the creation, update, and deletion of services, as well as the retrieval of all services offered.
 */
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

  /**
   * Observable that emits a signal to clear a form and resets to false after a delay.
   */
  readonly clearForm$ = this.clearFormSignal
    .asObservable()
    .pipe(switchMap((bool) => of(bool, false).pipe(delay(600))));

  /**
   * Makes an HTTP request to retrieve all {@link ServiceOfferedDto} objs.
   * If in production, makes an actual HTTP request, otherwise returns dummy services.
   */
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

  /**
   * Observable that emits the list of services offered.
   * If the services are not yet loaded, it triggers the allServicesRequest() to load them.
   */
  readonly servicesOffered$ = this.serviceOfferedSubject
    .asObservable()
    .pipe(switchMap((arr) => (arr ? of(arr) : this.allServicesRequest())));

  private readonly createUpdateSubject = new Subject<Observable<boolean>>();

  /**
   * Observable that emits the result of create or update operations of
   * a {@link ServiceOfferedDto}.
   */
  readonly onCreateUpdate$ = this.createUpdateSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  private readonly deleteSubject = new Subject<Observable<boolean>>();

  /**
   * Observable that emits the result of delete operations of a {@link ServiceOfferedDto}.
   */
  readonly onDelete$ = this.deleteSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  /**
   * Triggers the creation of a new {@link ServiceOfferedDto}.
   * @param dto - The data transfer object representing the service to be created.
   */
  readonly create = (dto: ServiceOfferedDto) =>
    this.createUpdateSubject.next(
      this.createRequest(dto).pipe(startWith(true)),
    );

  /**
   * Triggers the update of an existing service {@link ServiceOfferedDto}.
   * @param dto - The data transfer object representing the service to be updated.
   */
  readonly update = (dto: ServiceOfferedDto) =>
    this.createUpdateSubject.next(
      this.updateRequest(dto).pipe(startWith(true)),
    );

  /**
   * Triggers the deletion of a {@link ServiceOfferedDto} by ID.
   * @param serviceId - The ID of the service to be deleted.
   */
  readonly delete = (serviceId: string) =>
    this.deleteSubject.next(
      this.deleteRequest(serviceId).pipe(startWith(true)),
    );

  /**
   * Makes an HTTP request to add a service to a staff.
   * If in production, makes an actual HTTP request, otherwise returns false after a delay.
   * @param serviceName - The name of the service to be added.
   */
  private readonly addServiceToStaffRequest = (serviceName: string) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}employee/service-offered?name=${serviceName}`, {}, { withCredentials: true })
          .pipe(catchError((e) => this.toastService.messageErrorBool(e)))
      : of(false).pipe(delay(5000));

  /**
   * Makes an HTTP request to create a new service.
   * If in production, makes an actual HTTP request, otherwise returns false after a delay.
   * @param dto - The data transfer object representing the service to be created.
   */
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

  /**
   * Makes an HTTP request to update an existing service.
   * If in production, makes an actual HTTP request, otherwise returns false after a delay.
   * @param dto - The data transfer object representing the service to be updated.
   */
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

  /**
   * Makes an HTTP request to delete an existing service.
   * If in production, makes an actual HTTP request, otherwise returns false after a delay.
   * @param serviceId - The ID of the service to be deleted.
   */
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
