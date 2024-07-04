import { Routes } from '@angular/router';
import {
  EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE,
  EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE
} from '@/app/employee-front/employee-service/employee-service.util';
import {
  EMPLOYEE_SCHEDULE_ALL_ROUTE,
  EMPLOYEE_SCHEDULE_CREATE_ROUTE
} from '@/app/employee-front/employee-schedule/employee-schedule.util';
import { ownerRoleGuard } from '@/app/employee-front/owner-role.guard';

export const routes: Routes = [
  {
    path: EMPLOYEE_SCHEDULE_CREATE_ROUTE,
    canActivate: [ownerRoleGuard],
    loadComponent: () =>
      import('./create-schedule/create-schedule.component').then(
        (m) => m.CreateScheduleComponent
      )
  },
  {
    path: EMPLOYEE_SCHEDULE_ALL_ROUTE,
    loadComponent: () =>
      import('./all-schedule/all-schedule.component').then(
        (m) => m.AllScheduleComponent
      )
  },
  {
    path: '',
    redirectTo: EMPLOYEE_SCHEDULE_ALL_ROUTE,
    pathMatch: 'full'
  }
];
