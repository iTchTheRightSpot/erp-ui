import { Routes } from '@angular/router';
import { EMPLOYEE_ALL_USERS_ROUTE } from '@/app/employee-front/user/user.util';

export const routes: Routes = [
  {
    path: EMPLOYEE_ALL_USERS_ROUTE,
    loadComponent: () =>
      import('./all-users.component').then((m) => m.AllUsersComponent),
  },
];
