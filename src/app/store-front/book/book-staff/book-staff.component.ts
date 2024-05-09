import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { BookStaffService } from '@/app/store-front/book/book-staff/book-staff.service';
import { Router, RouterLink } from '@angular/router';
import { BOOK_APPOINTMENT_DATES_ROUTE } from '@/app/store-front/book/book.util';
import { BookAppointmentDatesService } from '@/app/store-front/book/book-appointment-dates/book-appointment-dates.service';
import { BOOK_ROUTE } from '@/app/store-front/util';

@Component({
  selector: 'app-book-staff',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="lg-scr mg-top px-1.5 xl:px-0">
      <div class="mb-2 flex flex-col gap-2">
        <h1
          class="h-fit font-normal underline underline-offset-4 decoration-1 text-base sm:text-xl md:text-2xl lg:text-4xl"
        >
          Book a staff
        </h1>
        <h4 class="h-fit text-sm sm:text-base md:text-lg">
          Select a staff you wish to book with
        </h4>
      </div>

      <div class="w-full">
        <ul class="flex flex-col gap-2">
          @for (staff of staffs$ | async; track staff.email) {
            <li
              tabindex="0"
              (click)="selected(staff.email)"
              (keydown.enter)="selected(staff.email)"
              class="px-1.5 py-3 h-fit cursor-pointer flex gap-2 border rounded text-left bg-[var(--list-of-items-background)] hover:bg-[var(--list-of-items-background-hover)]"
            >
              <div
                class="max-h-[5.5rem] max-w-[5.375rem] md:max-h-[7.5rem] md:max-w-[7.375rem] lg:max-h-[8.5rem] lg:max-w-[8.5rem] rounded-full overflow-hidden"
              >
                <img
                  [src]="staff.picture.length > 0 ? staff.picture : altImage"
                  [alt]="altImage"
                  class="h-full w-full object-cover object-center ring-2 ring-gray-400"
                />
              </div>
              <a class="relative">
                <h3
                  class="capitalize underline-offset-4 font-medium pb-1 text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  {{ staff.name }}
                </h3>
                <p class="text-xs sm:text-sm whitespace-wrap">
                  {{ staff.bio }}
                </p>
                <span
                  class="absolute bottom-0 right-0 transform translate-y-1/4 w-3.5 h-3.5 border border-black bg-white rounded-full"
                ></span>
              </a>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookStaffComponent {
  private readonly router = inject(Router);
  private readonly service = inject(BookStaffService);
  private readonly appointmentDatesService = inject(
    BookAppointmentDatesService,
  );
  readonly staffs$ = this.service.staffs$();

  protected readonly altImage = './assets/images/staffs/engin-akyurt.jpg';

  protected readonly selected = (staff: string) => {
    this.appointmentDatesService.selectedEmployee(staff);
    this.router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  };
}
