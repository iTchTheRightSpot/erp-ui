import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  disable: boolean;
  placeholder: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, NgClass, AsyncPipe],
  templateUrl: 'calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  minDate = input<Date>();
  toHighlight = input<Date[]>();

  readonly onDateSelectedEmitter = output<Date>();
  readonly previousNextEmitter = output<Date>();

  protected readonly today = new Date();

  protected selected = this.today;

  private readonly currentMonthSignal = signal<Date>(this.today);
  private readonly toHighlightSignal = signal<Date[] | undefined>(undefined);
  private readonly subject = new BehaviorSubject<CalendarDay[]>([]);

  protected currentMonth = this.currentMonthSignal;
  protected readonly calendarDays$ = this.subject.asObservable();
  protected readonly weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];

  constructor() {
    this.subject.next(this.generateCalendarDays());
    effect(() => this.appendToDatesToHighlight(this.toHighlight()), {
      allowSignalWrites: true,
    });
  }

  protected readonly onDateSelected = (day: CalendarDay) => {
    this.selected = day.date;
    this.onDateSelectedEmitter.emit(day.date);
  };

  protected readonly yearBtn = () => console.log('year btn clicked');

  protected readonly disablePrevMonthBtn = () =>
    this.minDate()?.getMonth() === this.currentMonth().getMonth() &&
    this.minDate()?.getFullYear() === this.currentMonth().getFullYear();

  protected readonly onPrevMonth = () =>
    this.previousNextEmitter.emit(this.prevMonth());

  protected readonly onNextMonth = () =>
    this.previousNextEmitter.emit(this.nextMonth());

  private readonly prevMonth = () => {
    const month = this.currentMonthSignal();

    this.currentMonthSignal.set(
      new Date(month.getFullYear(), month.getMonth() - 1, 1),
    );

    this.subject.next(this.generateCalendarDays());
    return this.currentMonthSignal();
  };

  private readonly nextMonth = () => {
    const month = this.currentMonthSignal();

    this.currentMonthSignal.set(
      new Date(month.getFullYear(), month.getMonth() + 1, 1),
    );

    this.subject.next(this.generateCalendarDays());
    return this.currentMonthSignal();
  };

  private readonly notInToHighlightSignal = (date: Date) => {
    const arr = this.toHighlightSignal();

    if (!arr) {
      return false;
    } else if (arr.length < 1) {
      return true;
    }

    return !arr.some((d) => this.format(d) === this.format(date));
  };

  private readonly format = (date: Date) =>
    date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  private readonly appendToDatesToHighlight = (dates?: Date[]) => {
    if (dates) {
      this.toHighlightSignal.set(dates);
      this.subject.next(this.generateCalendarDays());
    }
  };

  private readonly generateCalendarDays = () => {
    const currentMonth = this.currentMonthSignal();
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );

    const startDayOfWeek = startOfMonth.getDay();
    const endDayOfWeek = endOfMonth.getDay();

    const daysInMonth = endOfMonth.getDate();

    const calendarDays: CalendarDay[] = [];

    // previous month's days
    for (let i = startDayOfWeek; i > 0; i--) {
      const date = new Date(startOfMonth);
      date.setDate(startOfMonth.getDate() - i);
      calendarDays.push({
        date,
        isCurrentMonth: false,
        placeholder: true,
        disable: this.notInToHighlightSignal(date),
      });
    }

    // current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i,
      );
      calendarDays.push({
        date,
        isCurrentMonth: true,
        placeholder: false,
        disable: this.notInToHighlightSignal(date),
      });
    }

    // next month's days
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
      const date = new Date(endOfMonth);
      date.setDate(endOfMonth.getDate() + i);
      calendarDays.push({
        date,
        isCurrentMonth: false,
        placeholder: true,
        disable: this.notInToHighlightSignal(date),
      });
    }
    return calendarDays;
  };
}
