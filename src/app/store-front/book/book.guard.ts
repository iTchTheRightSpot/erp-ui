import { inject } from '@angular/core';
import { BookService } from '@/app/store-front/book/book.service';
import { Router } from '@angular/router';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import {
  BOOK_APPOINTMENT_DATES_ROUTE,
  BOOK_SERVICE_OFFERED_ROUTE,
  BOOK_STAFF_ROUTE,
} from '@/app/store-front/book/book.util';

export const bookStaffGuard = async () => {
  const service = inject(BookService);
  const servicesOffered = service.bookingInfo().servicesOffered;

  if (!servicesOffered || servicesOffered.length < 1) {
    const router = inject(Router);
    await router.navigate([`${BOOK_ROUTE}/${BOOK_SERVICE_OFFERED_ROUTE}`]);
  }

  return true;
};

export const bookAppointmentDateGuard = async () => {
  const service = inject(BookService);
  const info = service.bookingInfo();
  const bool = !info.servicesOffered || !info.staff;

  if (bool) {
    const router = inject(Router);
    await router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  }

  return !bool;
};

export const bookCheckoutGuard = async () => {
  const service = inject(BookService);
  const info = service.bookingInfo();
  const bool = !info.servicesOffered || !info.staff || !info.time;

  if (bool) {
    const router = inject(Router);
    await router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  }

  return !bool;
};
