import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { BOOK_STAFF_ROUTE } from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/util';

@Component({
  selector: 'app-book-appointment-dates',
  standalone: true,
  imports: [MatCard, MatCalendar, AsyncPipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-appointment-dates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAppointmentDatesComponent {
  private readonly router = inject(Router);
  private readonly service = inject(BookAppointmentDatesService);

  protected readonly today = new Date();
  protected selected: Date | undefined = undefined;
  protected readonly altImage = './assets/images/staffs/engin-akyurt.jpg';

  protected readonly dates$ = this.service
    .dates$()
    .pipe(tap((arr) => (this.selected = arr?.date)));

  protected selectedAppointmentTime = (selected: Date) =>
    this.service.selectedAppointmentDate(selected);

  protected readonly toHrMins = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  protected readonly route = (): void => {
    this.router.navigate([`${BOOK_ROUTE}/${BOOK_STAFF_ROUTE}`]);
  };
}
