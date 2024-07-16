import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { GalleriaModule } from 'primeng/galleria';
import { ApiStatus, TIMEZONE } from '@/app/app.util';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    AboutAppointmentComponent,
    CalendarModule,
    FormsModule,
    NgClass,
    SkeletonModule,
    TableModule,
    GalleriaModule
  ],
  templateUrl: './employee-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDashboardComponent extends EmployeeAppointmentComponent {
  protected override readonly ApiStatus = ApiStatus;
  protected override readonly TIMEZONE = TIMEZONE;
  protected readonly apps$ = super.appointments$;

  constructor(
    dashboardService: EmployeeDashboardService,
    authenticationService: AuthenticationService,
    fb: FormBuilder
  ) {
    super(dashboardService, authenticationService, fb);
  }
}
