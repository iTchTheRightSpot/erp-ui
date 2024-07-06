import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
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
import { BehaviorSubject, debounceTime, switchMap, tap } from 'rxjs';
import { ValidTime } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.dto';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [AsyncPipe, CalendarModule, FormsModule, NgClass, SkeletonModule],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAppointmentDatesComponent {
  protected date: Date[] | undefined;

  private readonly router = inject(Router);
  private readonly service = inject(BookAppointmentDatesService);

  protected readonly today = new Date();
  protected selected: Date | undefined;
  protected onCalendarPreviousNextBtn = new Date();

  protected readonly timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  protected readonly details = this.service.bookingInfoSignal();
  protected readonly validAppointmentTimesSignal = signal<ValidTime[]>([]);
  protected readonly validAppointmentTimesInEpochSeconds = signal<number[]>([]);

  // on load of page, check if key contains in cache else call the server.
  private readonly onCalendarDateClickSubject = new BehaviorSubject<Date>(
    new Date()
  );

  protected readonly validAppointmentDays$ = this.onCalendarDateClickSubject
    .asObservable()
    .pipe(
      debounceTime(500),
      switchMap((selected) =>
        this.service.validAppointmentTimes(selected).pipe(
          tap((validTimes) => {
            this.validAppointmentTimesSignal.set(validTimes);
            if (validTimes && validTimes.length > 0) {
              const d = selected;
              const find = validTimes.find((validTime) => {
                const date = validTime.date;
                return (
                  d.getDate() === date.getDate() &&
                  d.getMonth() === date.getMonth() &&
                  d.getFullYear() === date.getFullYear()
                );
              });

              if (find) {
                this.validAppointmentTimesInEpochSeconds.set(find.times);
              } else {
                this.validAppointmentTimesInEpochSeconds.set([]);
              }
            }
          })
        )
      )
    );

  protected readonly validTimeObjectsToDates = (objs: ValidTime[]) =>
    objs.map((obj) => obj.date);

  protected readonly epochSecondsToDate = (seconds: number) =>
    EPOCH_SECONDS_TO_DATE(seconds);

  protected readonly contains = (dates: Date[], date: number, month: number) =>
    dates.some((d) => d.getDate() === date && d.getMonth() === month);

  protected readonly datesToDisable = (validDates: Date[]) =>
    DATES_TO_DISABLE(validDates, this.onCalendarPreviousNextBtn);

  protected readonly formatSeconds = (seconds: number) =>
    formatSeconds(seconds);

  protected readonly selectedAppointmentTime = async (seconds: number) => {
    this.service.selectedAppointmentTime(seconds);
    await this.router.navigate([`${BOOK_ROUTE}/${BOOK_CHECKOUT_ROUTE}`]);
  };

  protected readonly toHrMins = (time: Date) => toHrMins(time);

  protected readonly route = async () => {
    await this.router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  };

  protected readonly onSelectedCalendarDay = (selected: Date) => {
    this.selected = selected;
    this.onCalendarPreviousNextBtn = selected;
    this.onCalendarDateClickSubject.next(selected);
    this.service.selectedAppointmentDate(selected);
    this.clearOutValidAppointmentTimesInEpochSeconds();
  };

  protected readonly onSelectedCalendarMonth = (
    event: CalendarMonthChangeEvent
  ) => this.onSelectCalendarMonthOrYearImpl(event.month, event.year);

  protected readonly onSelectedCalendarYear = (
    event: CalendarYearChangeEvent
  ) => this.onSelectCalendarMonthOrYearImpl(event.month, event.year);

  private readonly onSelectCalendarMonthOrYearImpl = (
    month: number | undefined,
    year: number | undefined
  ) => {
    if (month && year) {
      this.onCalendarPreviousNextBtn = new Date(
        year,
        month - 1,
        this.onCalendarPreviousNextBtn.getDate()
      );
      this.onCalendarDateClickSubject.next(this.onCalendarPreviousNextBtn);
      // this.service.selectedAppointmentDate(this.selected);

      this.clearOutValidAppointmentTimesInEpochSeconds();
    }
  };

  private readonly clearOutValidAppointmentTimesInEpochSeconds = () => {
    const validTimes = this.validAppointmentTimesSignal();
    const find = validTimes.find((validTime) => {
      const date = validTime.date;
      return (
        this.selected?.getDate() === date.getDate() &&
        this.selected?.getMonth() === date.getMonth() &&
        this.selected?.getFullYear() === date.getFullYear()
      );
    });

    if (find) {
      this.validAppointmentTimesInEpochSeconds.set(find.times);
    } else {
      this.validAppointmentTimesInEpochSeconds.set([]);
    }
  };
}
