import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./store-front/store-front.component').then(
        (m) => m.StoreFrontComponent,
      ),
    loadChildren: () =>
      import('./store-front/store.route').then((m) => m.route),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
  { path: '**', redirectTo: '/404' },
];
