import { Routes } from '@angular/router';
import { EMPLOYEE_FRONT_HOME, STORE_FRONT_HOME } from '@/app/app.util';

export const routes: Routes = [
  {
    path: STORE_FRONT_HOME,
    loadComponent: () =>
      import('./store-front/store-front.component').then(
        (m) => m.StoreFrontComponent,
      ),
    loadChildren: () =>
      import('./store-front/store.routes').then((m) => m.route),
  },
  {
    path: EMPLOYEE_FRONT_HOME,
    loadComponent: () =>
      import('./employee-front/employee-front.component').then(
        (m) => m.EmployeeFrontComponent,
      ),
    loadChildren: () =>
      import('./employee-front/employee-front.routes').then((m) => m.routes),
  },
  {
    path: '404',
    loadComponent: () =>
      import(
        './global-components/page-not-found/page-not-found.component'
      ).then((m) => m.PageNotFoundComponent),
  },
  { path: '**', redirectTo: '/404' },
];
