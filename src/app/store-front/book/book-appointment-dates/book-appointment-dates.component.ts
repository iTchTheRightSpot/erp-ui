import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [MatCard, MatCalendar, AsyncPipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAppointmentDatesComponent {
  private readonly service = inject(BookAppointmentDatesService);

  protected readonly today = new Date();
  protected selected: Date | null = null;
  protected readonly altImage = './assets/images/staffs/chicken.jpg';

  protected readonly dates$ = this.service
    .dates$()
    .pipe(tap((arr) => (this.selected = arr[0].date)));

  protected selectedAppointmentTime = (selected: Date) =>
    this.service.selectedAppointmentDate(selected);

  protected readonly toHrMins = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
