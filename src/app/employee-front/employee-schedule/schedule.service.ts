import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  DesiredTimeDto,
  ShiftDto
} from '@/app/employee-front/employee-schedule/employee-schedule.util';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {
  catchError,
  concat,
  map,
  of,
  startWith,
  switchMap,
  tap,
  timer
} from 'rxjs';
import { Toast, ToastService } from '@/app/global-service/toast.service';
import { UserService } from '@/app/employee-front/user/user.service';
import { Schedule } from '@/app/employee-front/employee-schedule/all-schedule/all-schedule.dto';
import { CacheService } from '@/app/global-service/cache.service';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { ApiStatus } from '@/app/app.util';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private static readonly shiftsCache = new CacheService<string, Schedule[]>();

  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);
  protected readonly authenticationService = inject(AuthenticationService);

  // Signal for tracking the selected date
  private readonly selectedDateSignal = signal<Date>(new Date());

  private readonly shiftsCacheKey = (month: number, year: number) =>
    `${month}_${year}`;

  readonly shiftsByMonth = (dayOfMonth: number, month: number, year: number) =>
    this.production
      ? ScheduleService.shiftsCache
          .getItem(this.shiftsCacheKey(month, year))
          .pipe(
            switchMap((value) =>
              value
                ? of(value)
                : this.shiftsByMonthRequest(dayOfMonth, month, year)
            )
          )
      : of<Schedule[]>(
          Array.from(
            { length: 30 },
            (_, index) =>
              ({
                shift_id: `${index}`,
                is_visible: index % 2 === 0,
                start: new Date(),
                end: new Date()
              }) as Schedule
          )
        );

  // Method to update the selected date
  readonly updateSelectedDate = (selected: Date) =>
    this.selectedDateSignal.set(selected);

  // returns an observable of a Page of StaffDto
  readonly staffs$ = this.userService.users();

  // Method to create a schedule for an employee
  readonly createSchedule = (staffId: string, objs: DesiredTimeDto[]) =>
    this.createRequest({ employee_id: staffId, times: objs });

  // Private method to handle the create schedule request
  private readonly createRequest = (obj: ShiftDto) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}owner/shift`, obj, { withCredentials: true })
          .pipe(
            map(() => new Date(obj.times[0].start)),
            switchMap((date: Date) =>
              this.shiftsByMonthRequest(
                date.getDate(),
                date.getMonth(),
                date.getFullYear()
              ).pipe(map(() => ApiStatus.LOADED))
            ),
            tap((apiStatus) => {
              if (apiStatus === ApiStatus.LOADED)
                this.toastService.message({
                  key: Toast.SUCCESS,
                  message: 'created shift(s)!'
                });
            }),
            startWith(ApiStatus.LOADING),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorApiStatus(e)
            )
          )
      : concat(
          of(ApiStatus.LOADING),
          timer(2000).pipe(map(() => ApiStatus.LOADED))
        );

  private readonly shiftsByMonthRequest = (
    dayOfMonth: number,
    month: number,
    year: number
  ) =>
    this.http
      .get<
        { shift_id: string; is_visible: boolean; start: string; end: string }[]
      >(`${this.domain}employee/shift?day_of_month=${dayOfMonth}&month=${month + 1}&year=${year}&employee_id=${this.authenticationService.activeUser()?.user_id}`, { withCredentials: true })
      .pipe(
        map((res) =>
          res.map(
            (obj) =>
              ({
                shift_id: obj.shift_id,
                is_visible: obj.is_visible,
                start: new Date(obj.start),
                end: new Date(obj.end)
              }) as Schedule
          )
        ),
        tap((res) =>
          ScheduleService.shiftsCache.setItem(
            this.shiftsCacheKey(month, year),
            res
          )
        ),
        catchError((e) =>
          this.toastService.messageHandleIterateError<Schedule>(e)
        )
      );

  readonly updateShiftDateTimeRequest = (
    shiftId: string,
    start: number,
    duration: number,
    date: Date
  ) =>
    this.production
      ? this.http
          .patch(
            `${this.domain}owner/shift?employee_id=${this.authenticationService.activeUser()?.user_id}&shift_id=${shiftId}&shift_start=${start}&shift_duration=${duration}`,
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() =>
              this.shiftsByMonthRequest(
                date.getDate(),
                date.getMonth(),
                date.getFullYear()
              ).pipe(map(() => ApiStatus.LOADED))
            ),
            tap((apiStatus) => {
              if (apiStatus === ApiStatus.LOADED)
                this.toastService.message({
                  key: Toast.SUCCESS,
                  message: 'update!'
                });
            }),
            startWith(ApiStatus.LOADING),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorApiStatus(e)
            )
          )
      : concat(
          of(ApiStatus.LOADING),
          timer(2000).pipe(map(() => ApiStatus.LOADED))
        );

  readonly toggleShiftVisibilityRequest = (
    shiftId: string,
    isVisible: boolean,
    date: Date
  ) =>
    this.production
      ? this.http
          .patch(
            `${this.domain}owner/shift/invalidate?shift_id=${shiftId}&is_visible=${isVisible}`,
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() =>
              this.shiftsByMonthRequest(
                date.getDate(),
                date.getMonth(),
                date.getFullYear()
              ).pipe(map(() => ApiStatus.LOADED))
            ),
            tap((apiStatus) => {
              if (apiStatus === ApiStatus.LOADED)
                this.toastService.message({
                  key: Toast.SUCCESS,
                  message: isVisible ? 'shift visible' : 'invalidated shift'
                });
            }),
            startWith(ApiStatus.LOADING),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorApiStatus(e)
            )
          )
      : concat(
          of(ApiStatus.LOADING),
          timer(2000).pipe(map(() => ApiStatus.LOADED))
        );
}
