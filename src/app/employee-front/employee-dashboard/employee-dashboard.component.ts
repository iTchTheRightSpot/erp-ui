import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { AsyncPipe } from '@angular/common';
import { AboutAppointmentComponent } from '@/app/employee-front/shared/about-appointment.component';
import { EmployeeAppointmentComponent } from '@/app/employee-front/employee-appointment/employee-appointment.component';
import { map } from 'rxjs';
import { toHrMins } from '@/app/app.util';
import { AppointmentDeconstruct } from '@/app/employee-front/employee-front.util';
import { EmployeeAppointmentService } from '@/app/employee-front/employee-appointment/employee-appointment.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CalendarComponent,
    TableComponent,
    AsyncPipe,
    AboutAppointmentComponent,
  ],
  templateUrl: './employee-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDashboardComponent extends EmployeeAppointmentComponent {
  constructor(
    private readonly employeeDashboardService: EmployeeAppointmentService,
  ) {
    super(employeeDashboardService);
  }

  protected override thead: Array<keyof AppointmentDeconstruct> = [
    'id',
    'status',
    'client',
    'service',
    'timeslot',
  ];

  protected override appointments$ =
    this.employeeDashboardService.subjectClick$.pipe(
      map((objs) =>
        objs.map(
          (obj) =>
            ({
              id: obj.appointment_id,
              status: obj.status,
              service: obj.services[0].name,
              client: obj.customer_name,
              timeslot: `${toHrMins(obj.scheduled_for)} to ${toHrMins(obj.expire_at)}`,
            }) as AppointmentDeconstruct,
        ),
      ),
    );
}
