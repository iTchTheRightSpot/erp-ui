import { Routes } from '@angular/router';
import {
  BOOK_APPOINTMENT_DATES_ROUTE,
  BOOK_SERVICE_OFFERED_ROUTE,
  BOOK_STAFF_ROUTE,
} from '@/app/store-front/book/book.util';
import {
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
    loadComponent: () =>
      import('./book-staff/book-staff.component').then(
        (m) => m.BookStaffComponent,
      ),
    canActivateChild: [BookStaffGuard],
  },
  {
    path: BOOK_APPOINTMENT_DATES_ROUTE,
    loadComponent: () =>
      import('./book-appointment-dates/book-appointment-dates.component').then(
        (m) => m.BookAppointmentDatesComponent,
      ),
    canActivateChild: [BookAppointmentDateGuard],
  },
];