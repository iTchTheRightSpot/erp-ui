import { Routes } from '@angular/router';
import {
  EMPLOYEE_GENERAL_SERVICE_ROUTE,
  EMPLOYEE_UPDATE_PROFILE_ROUTE
} from '@/app/employee-front/employee-profile/employee-profile.util';

export const routes: Routes = [
  {
    path: EMPLOYEE_UPDATE_PROFILE_ROUTE,
    loadComponent: () =>
      import('./update-employee-profile.component').then(
        (m) => m.UpdateEmployeeProfileComponent
      )
  },
  {
    path: EMPLOYEE_GENERAL_SERVICE_ROUTE,
    loadComponent: () =>
      import('./employee-general-service.component').then(
        (m) => m.EmployeeGeneralServiceComponent
      )
  },
  { path: '', redirectTo: EMPLOYEE_UPDATE_PROFILE_ROUTE, pathMatch: 'full' }
];
