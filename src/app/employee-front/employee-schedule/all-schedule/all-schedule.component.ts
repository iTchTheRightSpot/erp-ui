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
import { BehaviorSubject, debounceTime, map, switchMap, tap } from 'rxjs';
import {
  CalendarModule,
  CalendarMonthChangeEvent,
  CalendarYearChangeEvent
} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DATES_TO_DISABLE } from '@/app/app.util';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-all-schedule',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    CalendarModule,
    FormsModule,
    NgClass,
    TableModule
  ],
  templateUrl: './all-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllScheduleComponent {
  protected date: Date[] | undefined;

  private readonly service = inject(ScheduleService);

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

  protected readonly datesToDisable = (validDates: Date[]) =>
    DATES_TO_DISABLE(validDates, this.selectedDate);

  protected readonly tHead: Array<keyof ScheduleTable> = [
    'id',
    'startDate',
    'startTime',
    'endTime'
  ];

  protected readonly scheduleTableToDate = (objs: ScheduleTable[]) =>
    objs?.map((obj) => new Date(obj.startDate));

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
                  id: shift.shift_id,
                  startDate: shift.start.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
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
}
