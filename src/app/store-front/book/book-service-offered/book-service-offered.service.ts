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

  private readonly servicesOffered: BookServiceOfferedDto[] = [
    {
      service_name: 'power grooming',
      price: 35,
      duration: 100,
      clean_up_time: 60,
    },
    {
      service_name: 'overgrown lawns',
      price: 30,
      duration: 50,
      clean_up_time: 60,
    },
    {
      service_name: 'utility cuts',
      price: 840,
      duration: 50,
      clean_up_time: 60,
    },
    {
      service_name: 'weekly trim and mow',
      price: 100,
      duration: 90,
      clean_up_time: 60,
    },
    {
      service_name: 'pre-call service',
      price: 30,
      duration: 10,
      clean_up_time: 60,
    },
  ];

  /**
   * Retrieves an Observable that emits an array of {@link BookServiceOfferedDto}
   * objects obtained from the backend. This function implements a form of caching
   * by saving the response from the server, thus preventing unnecessary server calls.
   *
   * @returns An Observable that emits an array of {@link BookServiceOfferedDto} objects.
   */
  readonly servicesOffered$ =
    this.servicesOffered.length > 0
      ? of(this.servicesOffered)
      : this.http
          .get<
            BookServiceOfferedDto[]
          >(`${this.domain}service-offered`, { withCredentials: true })
          .pipe(
            tap((arr) => {
              if (arr.length === 0)
                this.servicesOffered.push({
                  service_id: -1,
                  service_name: 'no service yes',
                  price: 0,
                  duration: 0,
                  clean_up_time: 0,
                });
              else this.servicesOffered.push(...arr);
            }),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError<BookServiceOfferedDto>(
                e,
              ),
            ),
          );
}
