import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { AboutAppointmentComponent } from '@/app/employee-front/shared/about-appointment.component';
import { EmployeeAppointmentComponent } from '@/app/employee-front/employee-appointment/employee-appointment.component';
import { map } from 'rxjs';
import { AppointmentDeconstruct } from '@/app/employee-front/employee-front.util';
import { EmployeeDashboardService } from '@/app/employee-front/employee-dashboard/employee-dashboard.service';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ApiStatus } from '@/app/app.util';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    AboutAppointmentComponent,
    CalendarModule,
    FormsModule,
    NgClass,
    SkeletonModule,
    TableModule
  ],
  templateUrl: './employee-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDashboardComponent extends EmployeeAppointmentComponent {
  protected override readonly ApiStatus = ApiStatus;

  constructor(
    dashboardService: EmployeeDashboardService,
    authenticationService: AuthenticationService,
    fb: FormBuilder
  ) {
    super(dashboardService, authenticationService, fb);
  }

  protected readonly apps$ = super.appointments$.pipe(
    map((objs) =>
      objs.map(
        (obj) =>
          ({
            id: obj.id,
            status: obj.status,
            service: obj.service,
            client: obj.client,
            timeslot: obj.timeslot
          }) as AppointmentDeconstruct
      )
    )
  );
}
