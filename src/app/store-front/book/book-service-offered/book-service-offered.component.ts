import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookServiceOfferedService } from '@/app/store-front/book/book-service-offered/book-service-offered.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BOOK_STAFF_ROUTE } from '@/app/store-front/book/book.util';
import { BookStaffService } from '@/app/store-front/book/book-staff/book-staff.service';
import { BookService } from '@/app/store-front/book/book.service';

@Component({
  selector: 'app-service-offered',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <div class="lg-scr mg-top px-1.5 xl:px-0">
      <div class="mb-2 flex flex-col gap-2">
        <h1
          class="h-fit font-normal underline underline-offset-4 decoration-1 text-base sm:text-xl md:text-2xl lg:text-4xl"
        >
          Schedule an appointment
        </h1>
        <h4 class="h-fit text-sm sm:text-base md:text-lg">
          Select a service that you wish to book a schedule for
        </h4>
      </div>

      <div class="w-full">
        <ul class="flex flex-col gap-2">
          @for (service of services$ | async; track service) {
            <li
              class="px-1.5 py-3 border rounded text-left bg-[var(--list-of-items-background)] hover:bg-[var(--list-of-items-background-hover)]"
            >
              <a
                [routerLink]="BOOK_STAFF_ROUTE"
                (click)="
                  selectedServiceOffered(service.service_name, service.duration)
                "
              >
                <h3
                  class="capitalize underline underline-offset-4 font-normal pb-1 text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  {{ service.service_name }}
                </h3>
                <p class="text-xs sm:text-sm whitespace-nowrap">
                  Price varies but starts at: {{ '$' + service.price }}
                  <span
                    class="h-2 w-2 mx-2 rounded-full inline-block bg-white"
                  ></span>
                  Duration: {{ service.duration }}
                </p>
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
export class BookServiceOfferedComponent {
  private readonly service = inject(BookServiceOfferedService);
  private readonly bookStaffService = inject(BookStaffService);
  protected readonly BOOK_STAFF_ROUTE = BOOK_STAFF_ROUTE;

  /**
   * Returns all the services offered by the company from the server or
   * cache.
   * */
  protected readonly services$ = this.service.servicesOffered$;

  /**
   * Retrieves all employees from the server of cache that offered the
   * service selected.
   * */
  protected readonly selectedServiceOffered = (
    service: string,
    duration: number,
  ) => this.bookStaffService.employeesByService(service, duration);
}
