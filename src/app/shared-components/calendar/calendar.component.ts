import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation
} from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction
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
    <mat-card class="w-full text-black">
      <mat-calendar
        [minDate]="minimumDateOnCalendar() || null"
        [(selected)]="selectedDate"
        [dateClass]="dateClass"
        [dateFilter]="myFilter"
        [headerComponent]="header"
        (selectedChange)="emitCalendarDateSelected($event)"
      />
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  constructor(calendarService: CalendarService) {
    calendarService.onPreviousNextEmitterDate$
      .pipe(
        tap((date) => {
          if (date) this.onPreviousNextCalendarDateEmitter.emit(date);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  protected readonly header = CalendarHeaderComponent;

  minimumDateOnCalendar = input<Date>();
  selectedDate = model<Date | null>(null);
  datesToHighlight = input<Date[]>();

  readonly onCalendarDateSelectedEmitter = output<Date>();
  readonly onPreviousNextCalendarDateEmitter = output<Date>();

  protected readonly emitCalendarDateSelected = (
    date: Date | undefined | null
  ) => {
    if (date) {
      this.onCalendarDateSelectedEmitter.emit(date);
    }
  };

  // reference docs https://material.angular.io/components/datepicker/overview#highlighting-specific-dates
  protected readonly dateClass: MatCalendarCellClassFunction<Date> = (
    cellDate,
    view
  ) => {
    if (view === 'month') {
      const bool = this.datesToHighlight()?.some(
        (d) =>
          d.getDate() === cellDate.getDate() &&
          d.getMonth() === cellDate.getMonth() &&
          d.getFullYear() === cellDate.getFullYear()
      );
      return bool ? 'mat-calendar-dates-to-highlight' : '';
    }
    return '';
  };

  protected readonly myFilter = (cellDate: Date | null) => {
    if (!cellDate) {
      return false;
    }

    const datesToHighlight = this.datesToHighlight();

    if (datesToHighlight) {
      return datesToHighlight.some(
        (d) =>
          d.getDate() === cellDate.getDate() &&
          d.getMonth() === cellDate.getMonth() &&
          d.getFullYear() === cellDate.getFullYear()
      );
    }

    return true;
  };
}
