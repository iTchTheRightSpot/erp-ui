import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookStaffService } from '@/app/store-front/book/book-staff/book-staff.service';
import { Router } from '@angular/router';
import { BOOK_APPOINTMENT_DATES_ROUTE } from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import { BookService } from '@/app/store-front/book/book.service';
import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';

@Component({
  selector: 'app-book-staff',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="lg-scr mg-top px-1.5 xl:px-0">
      <div class="mb-4 flex flex-col gap-2">
        <h1
          class="h-fit font-normal underline underline-offset-4 decoration-1 text-base sm:text-xl md:text-2xl lg:text-4xl"
        >
          Select a staff
        </h1>
      </div>

      <div class="w-full">
        <ul class="flex flex-col gap-2">
          @for (staff of staffs$ | async; track staff) {
            <li
              tabindex="0"
              (click)="selectedStaff(staff)"
              (keydown.enter)="selectedStaff(staff)"
              class="relative px-1.5 py-3 h-fit cursor-pointer flex gap-2 border rounded text-left bg-[var(--list-of-items-background)] hover:bg-[var(--list-of-items-background-hover)]"
            >
              <div class="flex-shrink-0">
                <img
                  [src]="staff.image_key"
                  alt="staff profile picture"
                  class="w-20 h-20 rounded-full object-cover object-center"
                />
              </div>
              <a>
                <h3
                  class="capitalize underline-offset-4 font-medium pb-1 text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  {{ staff.display_name }}
                </h3>
                <p class="text-xs sm:text-sm whitespace-wrap">
                  {{ staff.bio }}
                </p>
              </a>
              <span
                class="absolute bottom-1 right-0 transform translate-y-1/4 w-3.5 h-3.5 border border-black bg-white rounded-full"
              ></span>
            </li>
          } @empty {
            We are still in development, please check back some other time
          }
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookStaffComponent {
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);
  private readonly service = inject(BookStaffService);

  protected readonly staffs$ = this.service.staffs$();

  protected readonly selectedStaff = (staff: UserDto) => {
    this.bookService.setStaffSelected(staff);
    this.router.navigate([`${BOOK_ROUTE}/${BOOK_APPOINTMENT_DATES_ROUTE}`]);
  };
}
