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
  const dto = service.dto();
  const bool = dto.service_name.length > 0 && dto.duration > -1;

  if (!bool) {
    const router = inject(Router);
    router.navigate([`${BOOK_ROUTE}/${BOOK_SERVICE_OFFERED_ROUTE}`]);
  }

  return bool;
};

export const BookAppointmentDateGuard = () => {
  const service = inject(BookService);
  const sig = service.dto();
  const bool =
    sig.service_name.length > 0 &&
    sig.duration > -1 &&
    sig.employee_email.length > 0;

  if (!bool) {
    const router = inject(Router);
    router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  }

  return bool;
};

export const BookAppointmentClientInformationGuard = () => {
  const service = inject(BookService);
  const sig = service.dto();
  const bool =
    sig.service_name.length > 0 &&
    sig.duration > -1 &&
    sig.employee_email.length > 0 &&
    sig.start;

  if (!bool) {
    const router = inject(Router);
    router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  }

  return bool;
};
