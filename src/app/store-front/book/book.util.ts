export const BOOK_SERVICE_OFFERED_ROUTE = '';
export const BOOK_STAFF_ROUTE = 'staff';
export const BOOK_APPOINTMENT_DATES_ROUTE = 'dates';

export interface BookDto {
  service_name: string;
  duration: number;
  employee_email: string;
  start: Date;
}
