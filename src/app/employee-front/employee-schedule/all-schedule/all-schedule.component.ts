import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  protected readonly onDateSelected = (selected: Date) =>
    this.service.updateSelectedDate(selected);
}
