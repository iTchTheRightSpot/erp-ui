import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  signal
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatCalendar } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats
} from '@angular/material/core';
import { startWith } from 'rxjs/operators';
import { CalendarService } from '@/app/shared-components/calendar/calendar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  template: `
    <div class="flex items-center p-2 text-black">
      <button mat-icon-button (click)="previousClicked('year')">
        <mat-icon>keyboard_double_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="flex-1 h-4 font-semibold text-center">{{
        periodLabel()
      }}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button mat-icon-button (click)="nextClicked('year')">
        <mat-icon>keyboard_double_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeaderComponent<D> {
  protected readonly header = CalendarHeaderComponent;

  protected readonly periodLabel = signal('');

  constructor(
    private readonly calendar: MatCalendar<D>,
    private readonly dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS)
    private readonly dateFormats: MatDateFormats,
    private readonly calendarService: CalendarService
  ) {
    calendar.stateChanges
      .pipe(startWith(null), takeUntilDestroyed())
      .subscribe((e) => {
        this.periodLabel.set(
          this.dateAdapter
            .format(
              this.calendar.activeDate,
              this.dateFormats.display.monthYearLabel
            )
            .toLocaleUpperCase()
        );
      });
  }

  protected readonly previousClicked = (mode: 'month' | 'year') => {
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1)
        : this.dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
    this.calendarService.emitNextPreviousDates(
      this.calendar.activeDate as Date
    );
  };

  protected readonly nextClicked = (mode: 'month' | 'year') => {
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1)
        : this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
    this.calendarService.emitNextPreviousDates(
      this.calendar.activeDate as Date
    );
  };
}
