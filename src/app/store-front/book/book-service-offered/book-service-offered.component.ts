import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookServiceOfferedService } from '@/app/store-front/book/book-service-offered/book-service-offered.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BOOK_STAFF_ROUTE } from '@/app/store-front/book/book.util';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { map } from 'rxjs';

@Component({
  selector: 'app-service-offered',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgClass],
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
          @for (service of services$ | async; track service; let i = $index) {
            <li
              (click)="service.toggle = toggleServiceOffered(service.obj)"
              (keydown.enter)="
                service.toggle = toggleServiceOffered(service.obj)
              "
              tabIndex="0"
              class="relative cursor-pointer px-1.5 py-3 border rounded text-left bg-[var(--list-of-items-background)] hover:bg-[var(--list-of-items-background-hover)]"
            >
              <div class="w-full flex justify-between items-center">
                <h3
                  class="capitalize underline underline-offset-4 font-normal pb-1 text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  {{ service.obj.name }}
                </h3>
                @if (service.toggle) {
                  <span class="w-3.5 h-3.5 rounded-full bg-green-500"></span>
                } @else {
                  <span
                    class="w-3.5 h-3.5 border border-black rounded-full bg-white"
                  ></span>
                }
              </div>
              <p class="text-xs sm:text-sm whitespace-nowrap">
                Price varies but starts at: {{ '$' + service.obj.price }}
                <strong>|</strong>
                Duration: {{ service.obj.duration }} seconds
              </p>
            </li>
          } @empty {
            We are still in development, please check back some other time
          }
          <li
            class="px-1.5 py-3 text-right"
            [ngClass]="{ hidden: services.size < 1 }"
          >
            <a
              [routerLink]="BOOK_STAFF_ROUTE"
              (click)="addServicesOffered()"
              class="py-2 px-5 rounded text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookServiceOfferedComponent {
  private readonly service = inject(BookServiceOfferedService);

  protected readonly BOOK_STAFF_ROUTE = BOOK_STAFF_ROUTE;
  protected readonly services = new Set<BookServiceOfferedDto>();

  /**
   * Returns all the services offered by the company from the server or
   * cache.
   * */
  protected readonly services$ = this.service
    .servicesOffered$()
    .pipe(map((objs) => objs.map((obj) => ({ toggle: false, obj: obj }))));

  /**
   * Retrieves all employees from the server of cache that offered the
   * service selected.
   * */
  protected readonly toggleServiceOffered = (
    service: BookServiceOfferedDto,
  ) => {
    const bool = this.services.has(service);
    if (bool) this.services.delete(service);
    else this.services.add(service);
    return !bool;
  };

  protected readonly addServicesOffered = () =>
    this.service.setSelectedServicesOffered(Array.from(this.services));
}
