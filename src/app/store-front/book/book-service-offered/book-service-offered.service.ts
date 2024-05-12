import { inject, Injectable } from '@angular/core';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BookServiceOfferedService {
  private readonly domain: string | undefined = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private servicesOffered: BookServiceOfferedDto[] | undefined = undefined;

  /**
   * Retrieves an Observable that emits an array of {@link BookServiceOfferedDto}
   * objects obtained from the backend. This function implements a form of caching
   * by saving the response from the server, thus preventing unnecessary server calls.
   *
   * @returns An Observable that emits an array of {@link BookServiceOfferedDto} objects.
   */
  readonly servicesOffered$ = this.servicesOffered
    ? of(this.servicesOffered)
    : this.http
        .get<
          BookServiceOfferedDto[]
        >(`${this.domain}service-offered`, { withCredentials: true })
        .pipe(
          tap((arr) => (this.servicesOffered = arr)),
          catchError((e: HttpErrorResponse) =>
            this.toastService.messageHandleIterateError<BookServiceOfferedDto>(
              e,
            ),
          ),
        );
}
