import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CalendarDesignComponent } from '@/app/global-components/calendar/calendar-design.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarDesignComponent],
  template: `
    @if (toHighlight.length > 0) {
      <app-calendar-design
        [minDate]="minDate"
        [toHighlight]="toHighlight"
        (onDateSelectedEmitter)="onDateSelectedEmitter.emit($event)"
        (previousNextEmitter)="previousNextEmitter.emit($event)"
      />
    } @else {
      <app-calendar-design
        [minDate]="minDate"
        [toHighlight]="toHighlight"
        (onDateSelectedEmitter)="onDateSelectedEmitter.emit($event)"
        (previousNextEmitter)="previousNextEmitter.emit($event)"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  @Input() minDate?: Date;
  @Input() toHighlight: Date[] = [];

  @Output() readonly onDateSelectedEmitter = new EventEmitter<Date>();
  @Output() readonly previousNextEmitter = new EventEmitter<Date>();
}
