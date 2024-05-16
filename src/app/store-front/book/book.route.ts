import { Routes } from '@angular/router';
import {
  BOOK_APPOINTMENT_DATES_ROUTE,
  BOOK_CHECKOUT_ROUTE,
  BOOK_SERVICE_OFFERED_ROUTE,
  BOOK_STAFF_ROUTE,
} from '@/app/store-front/book/book.util';
import {
  BookCheckoutGuard,
  BookAppointmentDateGuard,
  BookStaffGuard,
} from '@/app/store-front/book/book.guard';

export const route: Routes = [
  {
    path: BOOK_SERVICE_OFFERED_ROUTE,
    loadComponent: () =>
      import('./book-service-offered/book-service-offered.component').then(
        (m) => m.BookServiceOfferedComponent,
      ),
  },
  {
    path: BOOK_STAFF_ROUTE,
    canActivate: [BookStaffGuard],
    loadComponent: () =>
      import('./book-staff/book-staff.component').then(
        (m) => m.BookStaffComponent,
      ),
  },
  {
    path: BOOK_APPOINTMENT_DATES_ROUTE,
    canActivate: [BookAppointmentDateGuard],
    loadComponent: () =>
      import('./book-appointment-dates/book-appointment-dates.component').then(
        (m) => m.BookAppointmentDatesComponent,
      ),
  },
  {
    path: BOOK_CHECKOUT_ROUTE,
    canActivate: [BookCheckoutGuard],
    loadComponent: () =>
      import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
];
