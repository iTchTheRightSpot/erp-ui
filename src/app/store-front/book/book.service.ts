import { Injectable, signal } from '@angular/core';
import { BookDto } from '@/app/store-front/book/book.util';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  /**
   * Manages the core information needed for booking appointments and acts as a
   * guard for each route. If any required property is not set, it redirects the
   * user to the page where the necessary info is needed.
   */
  private readonly bookingInfoSignal = signal<BookDto>({
    serviceOffered: undefined,
    staff: undefined,
    selectedDate: new Date(),
    time: undefined,
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
      selectedDate: this.bookingInfoSignal().selectedDate,
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
      selectedDate: this.bookingInfoSignal().selectedDate,
      time: this.bookingInfoSignal().time,
    });

  /**
   * Sets the selected date for booking.
   *
   * @param date The selected date for booking.
   */
  readonly setTimeDateSelected = (date: Date) =>
    this.bookingInfoSignal.set({
      serviceOffered: this.bookingInfoSignal().serviceOffered,
      staff: this.bookingInfoSignal().staff,
      selectedDate: date,
      time: this.bookingInfoSignal().time,
    });

  /**
   * Sets the selected time for booking.
   *
   * @param time The selected time for booking.
   */
  readonly setTimeSelected = (time: Date) =>
    this.bookingInfoSignal.set({
      serviceOffered: this.bookingInfoSignal().serviceOffered,
      staff: this.bookingInfoSignal().staff,
      selectedDate: this.bookingInfoSignal().selectedDate,
      time: time,
    });
}
