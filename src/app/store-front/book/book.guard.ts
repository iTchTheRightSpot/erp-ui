import { inject } from '@angular/core';
import { BookService } from '@/app/store-front/book/book.service';
import { CanActivateFn, Router } from '@angular/router';
import { BOOK_ROUTE } from '@/app/store-front/util';
import {
  BOOK_APPOINTMENT_DATES_ROUTE,
  BOOK_SERVICE_OFFERED_ROUTE,
  BOOK_STAFF_ROUTE,
} from '@/app/store-front/book/book.util';

export const BookStaffGuard = async () => {
  const service = inject(BookService);
  const dto = service.dto();
  const bool = dto.serviceOffered === undefined;

  if (bool) {
    const router = inject(Router);
    await router.navigate([`${BOOK_ROUTE}/${BOOK_SERVICE_OFFERED_ROUTE}`]);
  }

  return !bool;
};

export const BookAppointmentDateGuard = async () => {
  const service = inject(BookService);
  const sig = service.dto();
  const bool = sig.serviceOffered === undefined || sig.staff === undefined;

  if (bool) {
    const router = inject(Router);
    await router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  }

  return !bool;
};

export const BookAppointmentClientInformationGuard = async () => {
  const service = inject(BookService);
  const sig = service.dto();
  const bool =
    sig.serviceOffered === undefined ||
    sig.staff === undefined ||
    sig.time == undefined;

  if (bool) {
    const router = inject(Router);
    await router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  }

  return !bool;
};
