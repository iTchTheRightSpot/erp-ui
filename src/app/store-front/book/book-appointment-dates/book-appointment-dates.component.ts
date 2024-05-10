import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [MatCard, MatCalendar],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAppointmentComponent {
  protected readonly today = new Date();
  protected selected: Date | null = new Date();
}
