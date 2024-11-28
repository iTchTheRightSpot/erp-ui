import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookStaffService } from '@/app/store-front/book/book-staff/book-staff.service';
import { Router } from '@angular/router';
import { BOOK_APPOINTMENT_DATES_ROUTE } from '@/app/store-front/book/book.util';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import { BookService } from '@/app/store-front/book/book.service';
import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-book-staff',
  standalone: true,
  imports: [AsyncPipe, SkeletonModule],
  template: `
    <div class="lg-scr mg-top px-1.5 xl:px-0">
      <div class="mb-4 flex flex-col gap-2">
        <h1
          class="h-fit font-light underline underline-offset-4 decoration-1 text-xl md:text-2xl lg:text-4xl"
        >
          Select a staff
        </h1>
      </div>

      <div class="w-full">
        @if (staffs$ | async; as asyncStaffs) {
          <ul class="flex flex-col gap-2">
            @for (staff of asyncStaffs; track staff.user_id) {
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
              No staffs available, please check back some other time
            }
          </ul>
        } @else {
          <div class="border-round border-1 surface-border p-4 surface-card">
            <ul class="m-0 p-0 list-none">
              <li class="mb-3">
                <div class="flex">
                  <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                  <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                  </div>
                </div>
              </li>
              <li class="mb-3">
                <div class="flex">
                  <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                  <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                  </div>
                </div>
              </li>
              <li class="mb-3">
                <div class="flex">
                  <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                  <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                  </div>
                </div>
              </li>
              <li>
                <div class="flex">
                  <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                  <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        }
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
