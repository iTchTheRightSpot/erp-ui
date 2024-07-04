import { Routes } from '@angular/router';
import { EMPLOYEE_ALL_USERS_ROUTE } from '@/app/employee-front/user/user.util';
import { ownerRoleGuard } from '@/app/employee-front/owner-role.guard';

export const routes: Routes = [
  {
    path: EMPLOYEE_ALL_USERS_ROUTE,
    canActivate: [ownerRoleGuard],
    loadComponent: () =>
      import('./all-users/all-users.component').then((m) => m.AllUsersComponent)
  }
];
