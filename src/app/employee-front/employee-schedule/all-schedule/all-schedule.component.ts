import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPLOYEE_SCHEDULE_CREATE_ROUTE } from '@/app/employee-front/employee-schedule/employee-schedule.util';

@Component({
  selector: 'app-all-schedule',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllScheduleComponent {
  protected readonly EMPLOYEE_SCHEDULE_CREATE_ROUTE =
    EMPLOYEE_SCHEDULE_CREATE_ROUTE;
}
