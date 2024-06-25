import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPLOYEE_SCHEDULE_CREATE_ROUTE } from '@/app/employee-front/employee-schedule/employee-schedule.util';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';

@Component({
  selector: 'app-all-schedule',
  standalone: true,
  imports: [RouterLink, CalendarComponent],
  templateUrl: './all-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllScheduleComponent {
  private readonly service = inject(ScheduleService);

  protected readonly EMPLOYEE_SCHEDULE_CREATE_ROUTE =
    EMPLOYEE_SCHEDULE_CREATE_ROUTE;
  protected toggleCalendar = false;

  private readonly selectedDate = signal<Date>(new Date());

  protected readonly onDateSelected = (selected: Date) => {
    this.selectedDate.set(selected);
    this.service.updateSelectedDate(selected);
  };

  protected readonly shifts$ = () => {
    const date = this.selectedDate();
    return this.service.shiftsByMonth(
      date.getDate(),
      date.getMonth() + 1,
      date.getUTCFullYear(),
    );
  };
}
