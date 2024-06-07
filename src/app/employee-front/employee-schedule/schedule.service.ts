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
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import {
  StaffDto,
  staffs$,
} from '@/app/store-front/book/book-staff/book-staff.dto';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  // Cache for storing all staff data
  private readonly allStaffsCache = new BehaviorSubject<StaffDto[] | undefined>(
    undefined,
  );
  // Signal for tracking the selected date
  private readonly selectedDateSignal = signal<Date>(new Date());

  // Exposing the selected date signal as a readonly property
  readonly selected = this.selectedDateSignal;

  // Method to update the selected date
  readonly updateSelectedDate = (selected: Date) =>
    this.selectedDateSignal.set(selected);

  // Observable for getting staff data, will fetch if not cached
  readonly staffs$ = this.allStaffsCache
    .asObservable()
    .pipe(switchMap((arr) => (arr ? of(arr) : this.staffRequest$)));

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

  // Private observable for fetching staff data from the server
  private readonly staffRequest$ = this.production
    ? this.http
        .get<
          StaffDto[]
        >(`${this.domain}owner/staffs`, { withCredentials: true })
        .pipe(
          tap((arr) => this.allStaffsCache.next(arr)),
          catchError((e: HttpErrorResponse) =>
            this.toastService.messageHandleIterateError<StaffDto>(e),
          ),
        )
    : staffs$;
}
