import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';

export const BOOK_SERVICE_OFFERED_ROUTE = '';
export const BOOK_STAFF_ROUTE = 'staff';
export const BOOK_APPOINTMENT_DATES_ROUTE = 'dates-available';
export const BOOK_CHECKOUT_ROUTE = 'checkout';

export interface BookDto {
  servicesOffered: BookServiceOfferedDto[] | undefined;
  staff: StaffDto | undefined;
  selectedDate: Date | undefined;
  time: Date | undefined;
}
