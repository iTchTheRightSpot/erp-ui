import { inject } from '@angular/core';
import { BookService } from '@/app/store-front/book/book.service';
import { Router } from '@angular/router';
import { BOOK_ROUTE } from '@/app/store-front/util';
import {
  BOOK_APPOINTMENT_DATES_ROUTE,
  BOOK_SERVICE_OFFERED_ROUTE,
  BOOK_STAFF_ROUTE,
} from '@/app/store-front/book/book.util';

export const BookStaffGuard = () => {
  const service = inject(BookService);
  const sig = service.sig();
  const bool = sig && sig.service_name.length > 0;

  if (!bool) {
    const router = inject(Router);
    router.navigate([`${BOOK_ROUTE}/${BOOK_SERVICE_OFFERED_ROUTE}`]);
  }

  return bool;
};

export const BookAppointmentDateGuard = () => {
  const service = inject(BookService);
  const sig = service.sig();
  const bool =
    sig && sig.service_name.length > 0 && sig.employee_email.length > 0;

  if (!bool) {
    const router = inject(Router);
    router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  }

  return bool;
};

export const BookAppointmentClientInformationGuard = () => {
  const service = inject(BookService);
  const sig = service.sig();
  const bool =
    sig &&
    sig.service_name.length > 0 &&
    sig.employee_email.length > 0 &&
    sig.start;

  if (!bool) {
    const router = inject(Router);
    router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  }

  return bool;
};
