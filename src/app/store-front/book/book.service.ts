import { Injectable, signal } from '@angular/core';
import { BookDto } from '@/app/store-front/book/book.util';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  /**
   * To book an appointment, a few details need to be met so this signal
   * holds the core information needed before a user can fill out their
   * information to make a booking. The properties of BookDto also acts
   * as a guard for each route. If one of the properties is not met, it
   * returns the user back to the page where the necessary info is needed.
   * */
  /**
   * Manages the core information needed for booking appointments and acts as a
   * guard for each route. If any required property is not set, it redirects the
   * user to the page where the necessary info is needed.
   */
  private readonly bookingInfoSignal = signal<BookDto>({
    serviceOffered: undefined,
    staff: undefined,
    time: new Date(),
  });

  readonly bookingInfo = this.bookingInfoSignal;

  /**
   * Sets the selected service offered for booking.
   *
   * @param service The selected service offered for booking.
   */
  readonly setServiceOfferedSelected = (service: BookServiceOfferedDto) =>
    this.bookingInfoSignal.set({
      serviceOffered: service,
      staff: this.bookingInfoSignal().staff,
      time: this.bookingInfoSignal().time,
    });

  /**
   * Sets the selected staff member for booking.
   *
   * @param staff The selected staff member for booking.
   */
  readonly setStaffSelected = (staff: StaffDto) =>
    this.bookingInfoSignal.set({
      serviceOffered: this.bookingInfoSignal().serviceOffered,
      staff: staff,
      time: this.bookingInfoSignal().time,
    });

  /**
   * Sets the selected time/date for booking.
   *
   * @param date The selected time/date for booking.
   */
  readonly setTimeSelected = (date: Date) =>
    this.bookingInfoSignal.set({
      serviceOffered: this.bookingInfoSignal().serviceOffered,
      staff: this.bookingInfoSignal().staff,
      time: date,
    });
}
