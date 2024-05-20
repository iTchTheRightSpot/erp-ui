import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-schedule',
  standalone: true,
  imports: [],
  templateUrl: './employee-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeScheduleComponent {}
