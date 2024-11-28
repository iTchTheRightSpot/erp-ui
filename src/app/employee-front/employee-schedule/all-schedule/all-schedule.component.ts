import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPLOYEE_SCHEDULE_CREATE_ROUTE } from '@/app/employee-front/employee-schedule/employee-schedule.util';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { ScheduleTable } from '@/app/employee-front/employee-schedule/all-schedule/all-schedule.dto';
import {
  BehaviorSubject,
  debounceTime,
  map,
  mergeMap,
  Observable,
  Subject,
  switchMap,
  tap
} from 'rxjs';
import {
  CalendarModule,
  CalendarMonthChangeEvent,
  CalendarYearChangeEvent
} from 'primeng/calendar';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  Validators
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { UpdateScheduleComponent } from '@/app/employee-front/employee-schedule/update-schedule/update-schedule.component';
import { ApiStatus, TIMEZONE } from '@/app/app.util';

@Component({
  selector: 'app-all-schedule',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    CalendarModule,
    FormsModule,
    NgClass,
    TableModule,
    UpdateScheduleComponent
  ],
  templateUrl: './all-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllScheduleComponent {
  private readonly service = inject(ScheduleService);
  private readonly fb = inject(FormBuilder);

  protected date: Date[] | undefined;
  protected toggleUpdateScheduleDialog = false;
  protected readonly selectedShift = signal<
    { shiftId: string; localDate: Date } | undefined
  >(undefined);
  protected selectedDate = new Date();

  protected readonly EMPLOYEE_SCHEDULE_CREATE_ROUTE =
    EMPLOYEE_SCHEDULE_CREATE_ROUTE;

  protected toggleCalendar = false;

  private readonly selectedDateSubject = new BehaviorSubject<Date>(new Date());

  protected readonly onDateSelected = (selected: Date) => {
    this.selectedDateSubject.next(selected);
    this.service.updateSelectedDate(selected);
  };

  protected readonly onMonth = (event: CalendarMonthChangeEvent) => {
    const year = event.year;
    const month = event.month;
    if (year && month)
      this.selectedDateSubject.next(
        (this.selectedDate = new Date(
          year,
          month - 1,
          this.selectedDate.getDate()
        ))
      );
  };

  protected readonly onYear = (event: CalendarYearChangeEvent) => {
    const year = event.year;
    const month = event.month;
    if (year && month)
      this.selectedDateSubject.next(
        (this.selectedDate = new Date(
          year,
          month - 1,
          this.selectedDate.getDate()
        ))
      );
  };

  protected readonly contains = (dates: Date[], date: number, month: number) =>
    dates.some((d) => d.getDate() === date && d.getMonth() === month);

  protected readonly scheduleTableToDate = (objs: ScheduleTable[]) =>
    objs.map((obj) => obj.startDate);

  protected readonly scheduleTable = signal<ScheduleTable[]>([]);

  protected readonly shifts$ = this.selectedDateSubject.asObservable().pipe(
    debounceTime(400),
    switchMap((date) =>
      this.service
        .shiftsByMonth(date.getDate(), date.getMonth(), date.getFullYear())
        .pipe(
          map((shifts) =>
            shifts.map(
              (shift) =>
                ({
                  shiftId: shift.shift_id,
                  isVisible: shift.is_visible,
                  startDate: shift.start,
                  startTime: shift.start.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }),
                  endTime: shift.end.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                }) as ScheduleTable
            )
          ),
          tap((arr) => this.scheduleTable.set(arr))
        )
    )
  );

  protected readonly onSelectedSchedule = (shiftId: string, date: Date) => {
    this.selectedShift.set({ shiftId: shiftId, localDate: date });
    this.toggleUpdateScheduleDialog = !this.toggleUpdateScheduleDialog;
  };

  protected readonly form = this.fb.group({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });

  private readonly updateShiftVisibilitySubject = new Subject<
    Observable<ApiStatus>
  >();

  protected readonly updateShiftVisibility$ = this.updateShiftVisibilitySubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  protected readonly updateShiftVisibilityInStoreFrontEmitter = (
    obj: {
      shiftId: string;
      isVisible: boolean;
    },
    shiftSelected: Date
  ) =>
    this.updateShiftVisibilitySubject.next(
      this.service.toggleShiftVisibilityRequest(
        obj.shiftId,
        obj.isVisible,
        shiftSelected
      )
    );

  private readonly updateShiftDateTimeSubject = new Subject<
    Observable<ApiStatus>
  >();

  protected readonly updateShiftDateTime$ = this.updateShiftDateTimeSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  protected readonly updateShiftDateTime = (
    obj: {
      shiftId: string;
      start: number;
      duration: number;
    },
    shiftSelected: Date
  ) =>
    this.updateShiftDateTimeSubject.next(
      this.service.updateShiftDateTimeRequest(
        obj.shiftId,
        obj.start,
        obj.duration,
        shiftSelected
      )
    );
  protected readonly TIMEZONE = TIMEZONE;
}
