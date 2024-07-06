import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalendarModule,
  CalendarMonthChangeEvent,
  CalendarYearChangeEvent
} from 'primeng/calendar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, FormsModule, NgClass],
  template: `
    <div class="w-full">
      <p-calendar
        class="max-w-full"
        [(ngModel)]="date"
        [inline]="true"
        [minDate]="minimumDateOnCalendar()"
        (onSelect)="onDateSelect($event)"
        (onMonthChange)="onMonth($event, selectedDate())"
        (onYearChange)="onYear($event, selectedDate())"
        [disabledDates]="[]"
        [showWeek]="false"
      >
        <ng-template pTemplate="date" let-date>
          <span
            [ngClass]="{
              'font-medium text-black': contains(
                datesToHighlight(),
                date.day,
                date.month
              ),
              'line-through pointer-events-none opacity-50': !contains(
                datesToHighlight(),
                date.day,
                date.month
              )
            }"
          >
            {{ date.day }}
          </span>
        </ng-template>
      </p-calendar>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  protected date: Date[] | undefined;

  minimumDateOnCalendar = input<Date>();
  selectedDate = input<Date>();
  datesToHighlight = input<Date[]>();

  readonly onCalendarDateSelectedEmitter = output<Date>();
  readonly onPreviousNextCalendarDateEmitter = output<Date>();

  protected readonly contains = (
    dates: Date[] | undefined,
    date: number,
    month: number
  ) => dates?.some((d) => d.getDate() === date && d.getMonth() === month);

  protected readonly onDateSelect = (date: Date) =>
    this.onCalendarDateSelectedEmitter.emit(date);

  protected readonly onMonth = (
    event: CalendarMonthChangeEvent,
    currentDate: Date | undefined
  ) => {
    const year = event.year;
    const month = event.month;
    if (year && month && currentDate)
      this.onPreviousNextCalendarDateEmitter.emit(
        new Date(year, month - 1, currentDate.getDate())
      );
  };

  protected readonly onYear = (
    event: CalendarYearChangeEvent,
    currentDate: Date | undefined
  ) => {
    const year = event.year;
    const month = event.month;
    if (year && month && currentDate)
      this.onPreviousNextCalendarDateEmitter.emit(
        new Date(year, month - 1, currentDate.getDate())
      );
  };
}
