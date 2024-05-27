import { Routes } from '@angular/router';
import {
  EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE,
  EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE,
} from '@/app/employee-front/employee-service/employee-service.util';

export const routes: Routes = [
  {
    path: EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE,
    loadComponent: () =>
      import('./all-service-offered/all-service-offered.component').then(
        (m) => m.AllServiceOfferedComponent,
      ),
  },
  {
    path: EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE,
    loadComponent: () =>
      import('./new-service/new-service.component').then(
        (m) => m.NewServiceComponent,
      ),
  },
  {
    path: '',
    redirectTo: EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE,
    pathMatch: 'full',
  },
];
