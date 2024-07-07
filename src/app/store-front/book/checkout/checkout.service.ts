import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { BookService } from '@/app/store-front/book/book.service';
import { Toast, ToastService } from '@/app/global-service/toast.service';
import {
  catchError,
  concat,
  concatMap,
  map,
  mergeMap,
  Observable,
  of,
  startWith,
  Subject,
  timer
} from 'rxjs';
import { ApiStatus } from '@/app/app.util';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);

  readonly bookingInfoSignal = this.bookService.bookingInfo;

  private readonly submitSubject = new Subject<Observable<ApiStatus>>();

  readonly submit$ = this.submitSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  /**
   * Submits FormData to observable but only difference we update submitSubject
   * in other to show a loading button in form component.
   * */
  readonly prebook = (data: FormData) =>
    this.submitSubject.next(this.request(data));

  /**
   * Submits request to server to pre-book
   * */
  private readonly request = (data: FormData) =>
    this.production
      ? this.http
          .post<
            HttpResponse<any>
          >(`${this.domain}appointment`, data, { observe: 'response', withCredentials: true })
          .pipe(
            map(() => {
              this.toastService.message({
                key: Toast.SUCCESS,
                message: 'appointment pre-booked!'
              });
              return ApiStatus.LOADED;
            }),
            startWith(ApiStatus.LOADING),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorApiStatus(e)
            )
          )
      : concat(
          of(ApiStatus.LOADING),
          timer(5000).pipe(concatMap(() => of(ApiStatus.LOADED)))
        );
}
