import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-appointment',
  standalone: true,
  imports: [],
  templateUrl: './employee-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAppointmentComponent {}
