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
import { catchError, delay, map, of, startWith } from 'rxjs';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { UserService } from '@/app/employee-front/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);

  // Signal for tracking the selected date
  private readonly selectedDateSignal = signal<Date>(new Date());

  // Exposing the selected date signal as a readonly property
  readonly selected = this.selectedDateSignal;

  // Method to update the selected date
  readonly updateSelectedDate = (selected: Date) =>
    this.selectedDateSignal.set(selected);

  // returns an observable of a Page of StaffDto
  readonly staffs$ = this.userService.users();
  // readonly staffs$: Observable<Page<StaffDto>> = of();

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
}
