import { Routes } from '@angular/router';
import {
  EMPLOYEE_FRONT_APPOINTMENT,
  EMPLOYEE_FRONT_DASHBOARD,
  EMPLOYEE_FRONT_PROFILE,
  EMPLOYEE_FRONT_SCHEDULE,
  EMPLOYEE_FRONT_SERVICE,
} from '@/app/employee-front/employee-front.util';

export const routes: Routes = [
  {
    path: EMPLOYEE_FRONT_DASHBOARD,
    loadComponent: () =>
      import('./employee-dashboard/employee-dashboard.component').then(
        (m) => m.EmployeeDashboardComponent,
      ),
  },
  {
    path: EMPLOYEE_FRONT_SCHEDULE,
    loadComponent: () =>
      import('./employee-schedule/employee-schedule.component').then(
        (m) => m.EmployeeScheduleComponent,
      ),
    loadChildren: () =>
      import('./employee-schedule/employee-schedule.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: EMPLOYEE_FRONT_APPOINTMENT,
    loadComponent: () =>
      import('./employee-appointment/employee-appointment.component').then(
        (m) => m.EmployeeAppointmentComponent,
      ),
  },
  {
    path: EMPLOYEE_FRONT_SERVICE,
    loadComponent: () =>
      import('./employee-service/employee-service.component').then(
        (m) => m.EmployeeServiceComponent,
      ),
    loadChildren: () =>
      import('./employee-service/employee-service.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: EMPLOYEE_FRONT_PROFILE,
    loadComponent: () =>
      import('./employee-profile/employee-profile.component').then(
        (m) => m.EmployeeProfileComponent,
      ),
  },
  {
    path: '',
    redirectTo: EMPLOYEE_FRONT_DASHBOARD,
    pathMatch: 'full',
  },
];
