import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import {
  BOOK_CHECKOUT_ROUTE,
  BOOK_STAFF_ROUTE
} from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import {
  DATES_TO_DISABLE,
  EPOCH_SECONDS_TO_DATE,
  formatSeconds,
  toHrMins
} from '@/app/app.util';
import {
  CalendarModule,
  CalendarMonthChangeEvent,
  CalendarYearChangeEvent
} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [AsyncPipe, CalendarModule, FormsModule, NgClass],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAppointmentDatesComponent {
  protected date: Date[] | undefined;

  private readonly router = inject(Router);
  private readonly service = inject(BookAppointmentDatesService);

  protected readonly today = new Date();
  protected selected = new Date();

  protected readonly timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  protected readonly details = this.service.bookingInfoSignal();
  protected readonly epocSeconds$ = this.service.epochSeconds$();
  protected readonly toHighlight = this.service.datesToHighlight;

  protected readonly epochSecondsToDate = (seconds: number) =>
    EPOCH_SECONDS_TO_DATE(seconds);

  protected readonly formatSeconds = (seconds: number) =>
    formatSeconds(seconds);

  protected readonly selectedAppointmentTime = async (seconds: number) => {
    this.service.selectedAppointmentTime(seconds);
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

  protected readonly onMonth = (event: CalendarMonthChangeEvent) => {
    const year = event.year;
    const month = event.month;
    if (year && month)
      this.service.selectedAppointmentDate(
        (this.selected = new Date(year, month - 1, this.selected.getDate()))
      );
  };

  protected readonly onYear = (event: CalendarYearChangeEvent) => {
    const year = event.year;
    const month = event.month;
    if (year && month)
      this.service.selectedAppointmentDate(
        (this.selected = new Date(year, month - 1, this.selected.getDate()))
      );
  };

  protected readonly contains = (dates: Date[], date: number, month: number) =>
    dates.some((d) => d.getDate() === date && d.getMonth() === month);

  protected readonly datesToDisable = (validDates: Date[]) =>
    DATES_TO_DISABLE(validDates);

  protected readonly onPreviousOrNextBtn = (date: Date) => {
    this.selected = date;
    this.service.selectedAppointmentDate(date);
  };
}
