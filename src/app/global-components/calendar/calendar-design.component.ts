import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { CalendarDay } from '@/app/global-components/calendar/calendar.util';

@Component({
  selector: 'app-calendar-design',
  standalone: true,
  imports: [DatePipe, NgClass],
  template: `
    <!-- max-w-md mx-auto  -->
    <div class="md:max-w-md p-2 md:p-4 rounded shadow-2xl">
      <div class="flex items-center justify-between mb-5">
        <div class="grid grid-cols-2">
          <p>{{ currentMonth | date: 'MMMM yyyy' }}</p>
          <button (click)="yearBtn()" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div>
          <!-- left -->
          <button (click)="prevMonth()" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!-- right -->
          <button (click)="nextMonth()" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1">
        @for (day of weekDays; track day) {
          <div class="text-center font-bold">{{ day }}</div>
        }

        @for (day of calendarDays; track day) {
          <!-- [ngClass]="{ 'bg-gray-200': !day.isCurrentMonth }" -->
          @if (!day.placeholder) {
            <button
              type="button"
              (click)="onDateSelected(day)"
              class="text-center p-3 opacity-1 md:p-4 hover:bg-[var(--app-theme)] hover:rounded-full"
              [ngClass]="{
                'bg-gray-200': day.date.toDateString() === today.toDateString(),
                'rounded-full':
                  day.date.toDateString() === today.toDateString(),
                'opacity-25': datesToDisable(day.date)
              }"
            >
              {{ day.date | date: 'd' }}
            </button>
          } @else {
            <div class="text-center p-2 md:p-4"></div>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDesignComponent {
  @Input() minDate?: Date;
  @Input() toHighlight?: Date[];

  @Output() readonly onDateSelectedEmitter = new EventEmitter<Date>();
  @Output() readonly previousNextEmitter = new EventEmitter<Date>();

  protected readonly today = new Date();

  protected currentMonth = new Date();
  protected calendarDays: CalendarDay[] = [];
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
    this.generateCalendarDays();
  }

  private readonly format = (date: Date) =>
    date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  protected readonly datesToDisable = (date: Date) => {
    const toHighlight = this.toHighlight;
    return (
      toHighlight &&
      toHighlight.length > 0 &&
      !toHighlight.some((d) => this.format(d) === this.format(date))
    );
  };

  protected readonly onDateSelected = (day: CalendarDay) =>
    this.onDateSelectedEmitter.emit(day.date);

  protected readonly yearBtn = () => console.log('year btn clicked');

  private readonly generateCalendarDays = () => {
    const startOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0,
    );

    const startDayOfWeek = startOfMonth.getDay();
    const endDayOfWeek = endOfMonth.getDay();

    const daysInMonth = endOfMonth.getDate();

    this.calendarDays = [];

    // previous month's days
    for (let i = startDayOfWeek; i > 0; i--) {
      const date = new Date(startOfMonth);
      date.setDate(startOfMonth.getDate() - i);
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        disable: false,
        placeholder: true,
      });
    }

    // current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        i,
      );
      this.calendarDays.push({
        date,
        isCurrentMonth: true,
        disable: false,
        placeholder: false,
      });
    }

    // next month's days
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
      const date = new Date(endOfMonth);
      date.setDate(endOfMonth.getDate() + i);
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        disable: false,
        placeholder: true,
      });
    }
  };

  protected readonly prevMonth = () => {
    const min = this.minDate;
    if (
      min &&
      min.getMonth() === this.currentMonth.getMonth() &&
      min.getFullYear() === this.currentMonth.getFullYear()
    ) {
      return;
    }

    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1,
    );
    this.generateCalendarDays();
    this.previousNextEmitter.emit(this.currentMonth);
  };

  protected readonly nextMonth = () => {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
    this.generateCalendarDays();
    this.previousNextEmitter.emit(this.currentMonth);
  };
}
