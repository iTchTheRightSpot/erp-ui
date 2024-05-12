import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ValidTimes } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.dto';
import { environment } from '@/environments/environment.ts';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { BookService } from '@/app/store-front/book/book.service';
import { ToastService } from '@/app/global-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentDatesService {
  private readonly domain = environment;
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly toastService = inject(ToastService);

  private readonly parent = this.bookService.dto;
  private readonly subject = new BehaviorSubject<Date>(new Date());

  private readonly cache = new Map<Date, ValidTimes>();

  readonly selectedAppointmentDate = (date: Date) => {
    this.bookService.setTimeSelected(date);
    this.subject.next(date);
  };

  /**
   * Called if a status of 409 is received from the server.
   * In other words, the time a customer wants to pre-book has
   * been confirmed.
   * */
  readonly deleteFromCache = (date: Date) => this.cache.delete(date);

  readonly dates$ = (): Observable<ValidTimes | undefined> =>
    this.subject.asObservable().pipe(
      switchMap((date) => {
        const cache = this.cache.get(date);
        if (this.cache.has(date) && cache) return of<ValidTimes>(cache);

        const dto = this.parent();
        const name = dto.serviceOffered ? dto.serviceOffered.service_name : '';
        const email = dto.staff ? dto.staff.email : '';

        const req = this.req$(name, email, date);

        return req.pipe(
          map((objs, index) =>
            objs[index].date === date ? objs[index] : undefined,
          ),
        );
      }),
      catchError((e: HttpErrorResponse) => this.toastService.messageObject(e)),
    );

  private readonly req$ = (name: string, email: string, date: Date) =>
    this.http
      .get<
        ValidTimes[]
      >(`${this.domain}appointment?service_name=${name}&employee_email=${email}&day=${date.getDate()}&month=${1 + date.getMonth()}&year=${date.getFullYear()}`, { withCredentials: true })
      .pipe(
        tap((objs) => objs.forEach((obj) => this.cache.set(obj.date, obj))),
      );
}
