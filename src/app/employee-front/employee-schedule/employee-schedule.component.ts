import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';
import { RouterOutlet } from '@angular/router';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';

@Component({
  selector: 'app-employee-schedule',
  standalone: true,
  imports: [CalendarComponent, RouterOutlet],
  templateUrl: './employee-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeScheduleComponent {
  private readonly service = inject(ScheduleService);
  protected readonly onDateSelected = (selected: Date) =>
    this.service.updateSelectedDate(selected);
}
