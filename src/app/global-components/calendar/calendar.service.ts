import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarDay } from '@/app/global-components/calendar/calendar.util';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly currentMonthSignal = signal<Date>(new Date());
  readonly currentMonth = this.currentMonthSignal;

  private readonly toHighlightSignal = signal<Date[] | undefined>(undefined);
  private readonly subject = new BehaviorSubject<CalendarDay[]>([]);

  constructor() {
    this.subject.next(this.generateCalendarDays());
  }

  readonly calendarDays$ = this.subject.asObservable();

  readonly notInToHighlightSignal = (date: Date) => {
    const arr = this.toHighlightSignal();

    if (!arr) {
      return false;
    } else if (arr.length < 1) {
      return true;
    }

    return !arr.some((d) => this.format(d) === this.format(date));
  };

  readonly weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  readonly prevMonth = () => {
    const month = this.currentMonthSignal();

    this.currentMonthSignal.set(
      new Date(month.getFullYear(), month.getMonth() - 1, 1),
    );

    this.subject.next(this.generateCalendarDays());
    return this.currentMonthSignal();
  };

  readonly nextMonth = () => {
    const month = this.currentMonthSignal();

    this.currentMonthSignal.set(
      new Date(month.getFullYear(), month.getMonth() + 1, 1),
    );

    this.subject.next(this.generateCalendarDays());
    return this.currentMonthSignal();
  };

  private readonly format = (date: Date) =>
    date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  readonly appendToDatesToHighlight = (dates?: Date[]) => {
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
