import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPLOYEE_SCHEDULE_CREATE_ROUTE } from '@/app/employee-front/employee-schedule/employee-schedule.util';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { AsyncPipe } from '@angular/common';
import { ScheduleTable } from '@/app/employee-front/employee-schedule/all-schedule/all-schedule.dto';
import { BehaviorSubject, debounceTime, map, switchMap } from 'rxjs';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';

@Component({
  selector: 'app-all-schedule',
  standalone: true,
  imports: [RouterLink, TableComponent, AsyncPipe, CalendarComponent],
  templateUrl: './all-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllScheduleComponent {
  private readonly service = inject(ScheduleService);

  protected readonly currentDate = new Date();

  protected readonly EMPLOYEE_SCHEDULE_CREATE_ROUTE =
    EMPLOYEE_SCHEDULE_CREATE_ROUTE;

  protected toggleCalendar = false;

  private readonly selectedDateSubject = new BehaviorSubject<Date>(new Date());

  protected readonly onDateSelected = (selected: Date) => {
    this.selectedDateSubject.next(selected);
    this.service.updateSelectedDate(selected);
  };

  protected readonly onPrevNextCalendar = (selected: Date) =>
    this.selectedDateSubject.next(selected);

  protected readonly tHead: Array<keyof ScheduleTable> = [
    'id',
    'startDate',
    'startTime',
    'endTime'
  ];

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
                  startDate: shift.start.toLocaleDateString(),
                  startTime: shift.start.toLocaleTimeString(),
                  endTime: shift.end.toLocaleTimeString()
                }) as ScheduleTable
            )
          )
        )
    )
  );
}
