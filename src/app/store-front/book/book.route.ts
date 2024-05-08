import { Routes } from '@angular/router';

export const route: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./service-offered/service-offered.component').then(
        (m) => m.ServiceOfferedComponent,
      ),
  },
];
