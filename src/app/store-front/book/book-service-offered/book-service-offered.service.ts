import { inject, Injectable } from '@angular/core';
import {
  BookServiceOfferedDto,
  development
} from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { BookStaffService } from '@/app/store-front/book/book-staff/book-staff.service';

@Injectable({
  providedIn: 'root'
})
export class BookServiceOfferedService {
  private readonly domain: string | undefined = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly service = inject(BookStaffService);
  private readonly toastService = inject(ToastService);

  private servicesOffered: BookServiceOfferedDto[] | undefined = this.production
    ? undefined
    : development;

  readonly setSelectedServicesOffered = (services: BookServiceOfferedDto[]) =>
    this.service.employeesByServicesSelected(services);

  /**
   * Retrieves an Observable that emits an array of {@link BookServiceOfferedDto}
   * objects obtained from the backend. This function implements a form of caching
   * by saving the response from the server, thus preventing unnecessary server calls.
   *
   * @returns An Observable that emits an array of {@link BookServiceOfferedDto} objects.
   */
  readonly servicesOffered$ = () =>
    this.servicesOffered !== undefined
      ? of(this.servicesOffered)
      : this.http
          .get<
            BookServiceOfferedDto[]
          >(`${this.domain}service-offered`, { withCredentials: true })
          .pipe(
            tap((arr) => (this.servicesOffered = arr)),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError<BookServiceOfferedDto>(
                e
              )
            )
          );
}
