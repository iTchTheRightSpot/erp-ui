import { Injectable, signal } from '@angular/core';
import { BookDto } from '@/app/store-front/book/book.util';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly sig = signal<BookDto>({
    serviceOffered: undefined,
    staff: undefined,
    time: new Date(),
  });
  readonly dto = this.sig;

  readonly setServiceOfferedSelected = (service: BookServiceOfferedDto) =>
    this.sig.set({
      serviceOffered: service,
      staff: this.sig().staff,
      time: this.sig().time,
    });

  readonly setStaffSelected = (staff: StaffDto) =>
    this.sig.set({
      serviceOffered: this.sig().serviceOffered,
      staff: staff,
      time: this.sig().time,
    });

  readonly setTimeSelected = (date: Date) =>
    this.sig.set({
      serviceOffered: this.sig().serviceOffered,
      staff: this.sig().staff,
      time: date,
    });
}
