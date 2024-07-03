import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
} from '@angular/material/datepicker';
import { MatCard } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CalendarHeaderComponent } from '@/app/shared-components/calendar/calendar-header.component';
import { CalendarService } from '@/app/shared-components/calendar/calendar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
  imports: [MatCalendar, MatCard],
  template: `
    @if (datesToHighlightImpl(datesToHighlight())) {
      <mat-card class="w-full text-black">
        <mat-calendar
          [minDate]="minimumDateOnCalendar() || null"
          [(selected)]="onSelectedDate"
          [dateClass]="dateClass"
          [headerComponent]="header"
          (selectedChange)="emitCalendarDateSelected($event)"
        />
      </mat-card>
    } @else {
      <mat-card class="w-full text-black">
        <mat-calendar
          [minDate]="minimumDateOnCalendar() || null"
          [(selected)]="onSelectedDate"
          [headerComponent]="header"
          (selectedChange)="emitCalendarDateSelected($event)"
        />
      </mat-card>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  constructor(private readonly calendarService: CalendarService) {
    effect(() => {
      const date = this.selectedDate();
      if (date) this.onSelectedDate = date;
    });

    calendarService.onPreviousNextEmitterDate$
      .pipe(
        tap((date) => {
          if (date) this.onPreviousNextCalendarDateEmitter.emit(date);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected readonly header = CalendarHeaderComponent;
  protected onSelectedDate: Date | null = null;

  minimumDateOnCalendar = input<Date>();
  selectedDate = input<Date>();
  datesToHighlight = input<Date[]>();

  readonly onCalendarDateSelectedEmitter = output<Date>();
  readonly onPreviousNextCalendarDateEmitter = output<Date>();

  protected readonly datesToHighlightImpl = (dates: Date[] | undefined) =>
    dates ? dates.length > 0 : false;

  protected readonly emitCalendarDateSelected = (
    date: Date | undefined | null,
  ) => {
    if (date) {
      this.onCalendarDateSelectedEmitter.emit(date);
    }
  };

  // reference docs https://material.angular.io/components/datepicker/overview#highlighting-specific-dates
  protected readonly dateClass: MatCalendarCellClassFunction<Date> = (
    cellDate,
    view,
  ) => {
    if (view === 'month') {
      return this.datesToHighlight()?.some(
        (d) =>
          d.getDate() === cellDate.getDate() &&
          d.getMonth() === cellDate.getMonth() &&
          d.getFullYear() === cellDate.getFullYear(),
      )
        ? 'mat-calendar-dates-to-highlight'
        : '';
    }
    return '';
  };
}
