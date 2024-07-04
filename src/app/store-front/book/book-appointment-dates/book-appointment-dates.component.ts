import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  BOOK_CHECKOUT_ROUTE,
  BOOK_STAFF_ROUTE
} from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import { formatSeconds, toHrMins } from '@/app/app.util';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [AsyncPipe, CalendarComponent],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAppointmentDatesComponent {
  private readonly router = inject(Router);
  private readonly service = inject(BookAppointmentDatesService);

  protected readonly today = new Date();
  protected selected = new Date();

  protected readonly details = this.service.bookingInfoSignal();
  protected readonly dates$ = this.service.dates$();
  protected readonly toHighlight = this.service.datesToHighlight;

  protected readonly formatSeconds = (seconds: number) =>
    formatSeconds(seconds);

  protected readonly selectedAppointmentTime = async (time: Date) => {
    this.service.selectedAppointmentTime(new Date(time));
    await this.router.navigate([`${BOOK_ROUTE}/${BOOK_CHECKOUT_ROUTE}`]);
  };

  protected readonly toHrMins = (time: Date) => toHrMins(time);

  protected readonly format = (date: Date) => this.service.format(date);

  protected readonly route = async () => {
    await this.router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  };

  protected readonly onSelectedAppointmentDate = (selected: Date) => {
    this.selected = selected;
    this.service.selectedAppointmentDate(selected);
  };

  protected readonly onPreviousOrNextBtn = (date: Date) => {
    this.selected = date;
    this.service.selectedAppointmentDate(date);
  };
}
