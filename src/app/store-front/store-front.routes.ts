import { Routes } from '@angular/router';
import {
  ABOUT_ROUTE,
  BOOK_ROUTE,
  SERVICE_ROUTE
} from '@/app/store-front/store-front.util';

export const route: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: ABOUT_ROUTE,
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: SERVICE_ROUTE,
    loadComponent: () =>
      import('./service/service.component').then((m) => m.ServiceComponent)
  },
  {
    path: BOOK_ROUTE,
    loadComponent: () =>
      import('./book/book.component').then((m) => m.BookComponent),
    loadChildren: () => import('./book/book.route').then((m) => m.route)
  }
];
