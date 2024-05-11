import { Injectable, signal } from '@angular/core';
import { BookDto } from '@/app/store-front/book/book.util';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly sig = signal<BookDto>({
    service_name: '',
    duration: -1,
    employee_email: '',
    start: new Date(),
  });
  readonly dto = this.sig;

  readonly setServiceName = (service: string, duration: number) =>
    this.sig.set({
      service_name: service,
      duration: duration,
      employee_email: this.sig().employee_email,
      start: this.sig().start,
    });

  readonly setStaffEmail = (email: string) =>
    this.sig.set({
      service_name: this.sig().service_name,
      duration: this.sig().duration,
      employee_email: email,
      start: this.sig().start,
    });

  readonly setStart = (date: Date) =>
    this.sig.set({
      service_name: this.sig().service_name,
      duration: this.sig().duration,
      employee_email: this.sig().employee_email,
      start: date,
    });
}
