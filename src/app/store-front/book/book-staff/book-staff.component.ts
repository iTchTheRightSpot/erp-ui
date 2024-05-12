import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookStaffService } from '@/app/store-front/book/book-staff/book-staff.service';
import { Router } from '@angular/router';
import { BOOK_APPOINTMENT_DATES_ROUTE } from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/util';
import { BookService } from '@/app/store-front/book/book.service';
import { StaffDto } from '@/app/store-front/book/book-staff/book-staff.dto';

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
          @for (staff of staffs$ | async; track staff) {
            <li
              tabindex="0"
              (click)="selectedStaff(staff)"
              (keydown.enter)="selectedStaff(staff)"
              class="px-1.5 py-3 h-fit cursor-pointer flex gap-2 border rounded text-left bg-[var(--list-of-items-background)] hover:bg-[var(--list-of-items-background-hover)]"
            >
              <div
                class="max-h-[6.5rem] max-w-[6.5rem] md:max-h-[7.5rem] md:max-w-[7.375rem] lg:max-h-[8.5rem] lg:max-w-[8.5rem] rounded-full overflow-hidden"
              >
                <img
                  [src]="staff.picture"
                  alt="staff profile picture"
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
          } @empty {
            We are still in development, please check back some other time
          }
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookStaffComponent {
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);
  private readonly service = inject(BookStaffService);
  protected readonly staffs$ = this.service.staffs$();

  protected readonly selectedStaff = (staff: StaffDto) => {
    this.bookService.setStaffSelected(staff);
    this.router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  };
}
