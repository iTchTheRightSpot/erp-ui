import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { CalendarDay } from '@/app/global-components/calendar/calendar.util';
import { CalendarService } from '@/app/global-components/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, NgClass, AsyncPipe],
  template: `
    <!-- max-w-md mx-auto md:max-w-md   -->
    <div class="p-2 md:p-4 rounded shadow-2xl">
      <div class="flex items-center justify-between mb-5">
        <div class="grid grid-cols-2">
          <p>{{ currentMonth() | date: 'MMMM yyyy' }}</p>
          <button (click)="yearBtn()" type="button" class="hidden">
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
          <button
            (click)="prevMonth()"
            type="button"
            [disabled]="disablePrevMonthBtn()"
            [ngClass]="{ 'opacity-25': disablePrevMonthBtn() }"
          >
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

        @for (day of calendarDays$ | async; track day) {
          <div class="p-3 flex justify-center items-center">
            @if (!day.placeholder) {
              <button
                type="button"
                (click)="onDateSelected(day)"
                class="text-center p-2 md:px-3 md:py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4 hover:bg-[var(--app-theme)] hover:rounded-full"
                [disabled]="day.disable"
                [ngClass]="{
                  'bg-gray-200':
                    day.date.toDateString() === today.toDateString(),
                  'rounded-full':
                    day.date.toDateString() === today.toDateString() ||
                    day.date.toDateString() === selected.toDateString(),
                  'opacity-25': day.disable,
                  'hover:bg-transparent': day.disable,
                  'hover:rounded-none': day.disable,
                  'bg-[var(--app-theme)]':
                    day.date.toDateString() === selected.toDateString()
                }"
              >
                {{ day.date | date: 'd' }}
              </button>
            } @else {
              <div class="text-center p-2 md:p-4"></div>
            }
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  private readonly service = inject(CalendarService);

  minDate = input<Date>();
  toHighlight = input<Date[]>();

  @Output() readonly onDateSelectedEmitter = new EventEmitter<Date>();
  @Output() readonly previousNextEmitter = new EventEmitter<Date>();

  protected readonly today = new Date();

  protected selected = this.today;

  protected currentMonth = this.service.currentMonth;
  protected readonly calendarDays$ = this.service.calendarDays$;
  protected readonly weekDays = this.service.weekDays;

  constructor() {
    effect(() => this.service.appendToDatesToHighlight(this.toHighlight()), {
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

  protected readonly prevMonth = () =>
    this.previousNextEmitter.emit(this.service.prevMonth());

  protected readonly nextMonth = () =>
    this.previousNextEmitter.emit(this.service.nextMonth());
}
