import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  MatCalendar,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { BOOK_STAFF_ROUTE } from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/util';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [MatCard, MatCalendar, AsyncPipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAppointmentDatesComponent {
  private readonly router = inject(Router);
  private readonly service = inject(BookAppointmentDatesService);

  protected readonly today = new Date();
  protected selected = new Date();
  protected readonly altImage = './assets/images/staffs/engin-akyurt.jpg';

  protected readonly details = this.service.parent();
  protected readonly dates$ = this.service.dates$();
  protected readonly toHighlight = this.service.datesToHighlight();

  protected selectedAppointmentTime = (time: Date) => {};

  protected readonly toHrMins = (time: Date) =>
    new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  protected readonly format = (date: Date) =>
    date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  protected readonly dateClass =
    () =>
    (date: Date): MatCalendarCellCssClasses =>
      this.toHighlight.some((d) => this.format(date) === this.format(d))
        ? 'highlight-date'
        : '';

  protected readonly filterDates = (date: Date) =>
    this.toHighlight.some((d) => date.getDate() === d.getDate());

  protected readonly route = async () => {
    await this.router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  };

  protected readonly selectedAppointmentDate = (selected: Date | null) =>
    this.service.selectedAppointmentDate(
      selected === null ? new Date() : selected,
    );

  protected readonly monthSelect = (date: Date) =>
    this.service.selectedAppointmentDate(date);
}
