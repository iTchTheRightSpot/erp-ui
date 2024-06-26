import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  DesiredTimeDto,
  ShiftDto,
} from '@/app/employee-front/employee-schedule/employee-schedule.util';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, delay, map, of, startWith, switchMap, tap } from 'rxjs';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { UserService } from '@/app/employee-front/user/user.service';
import { Schedule } from '@/app/employee-front/employee-schedule/all-schedule/all-schedule.dto';
import { CacheService } from '@/app/global-service/cache.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private static readonly shiftsCache = new CacheService<string, Schedule[]>();

  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);

  // Signal for tracking the selected date
  private readonly selectedDateSignal = signal<Date>(new Date());

  // Exposing the selected date signal as a readonly property
  readonly selected = this.selectedDateSignal;

  private readonly shiftsCacheKey = (month: number, year: number) =>
    `${month}_${year}`;

  readonly shiftsByMonth = (dayOfMonth: number, month: number, year: number) =>
    ScheduleService.shiftsCache
      .getItem(this.shiftsCacheKey(month, year))
      .pipe(
        switchMap((value) =>
          value
            ? of(value)
            : this.shiftsByMonthRequest(dayOfMonth, month, year),
        ),
      );

  // Method to update the selected date
  readonly updateSelectedDate = (selected: Date) =>
    this.selectedDateSignal.set(selected);

  // returns an observable of a Page of StaffDto
  readonly staffs$ = this.userService.users();

  // Method to create a schedule for an employee
  readonly createSchedule = (email: string, objs: DesiredTimeDto[]) =>
    this.createRequest({ employee_email: email, times: objs }).pipe(
      startWith(true),
    );

  // Private method to handle the create schedule request
  private readonly createRequest = (obj: ShiftDto) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}owner/shift`, obj, { withCredentials: true })
          .pipe(
            map(() => false),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e),
            ),
          )
      : of(false).pipe(delay(5000));

  private readonly shiftsByMonthRequest = (
    dayOfMonth: number,
    month: number,
    year: number,
  ) =>
    this.http
      .get<
        { shift_id: number; start: string; end: string }[]
      >(`${this.domain}employee/shift?day_of_month=${dayOfMonth}&month=${month}&year=${year}`, { withCredentials: true })
      .pipe(
        map((res) =>
          res.map(
            (obj) =>
              ({
                shift_id: obj.shift_id,
                start: new Date(obj.start),
                end: new Date(obj.end),
              }) as Schedule,
          ),
        ),
        tap((res) =>
          ScheduleService.shiftsCache.setItem(
            this.shiftsCacheKey(month, year),
            res,
          ),
        ),
        catchError((e) =>
          this.toastService.messageHandleIterateError<Schedule>(e),
        ),
      );
}
