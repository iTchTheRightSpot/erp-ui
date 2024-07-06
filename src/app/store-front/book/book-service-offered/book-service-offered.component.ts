import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookServiceOfferedService } from '@/app/store-front/book/book-service-offered/book-service-offered.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BOOK_STAFF_ROUTE } from '@/app/store-front/book/book.util';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { map } from 'rxjs';
import { FORMAT_SECONDS } from '@/app/app.util';
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-service-offered',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgClass, SkeletonModule],
  template: `
    <div class="lg-scr mg-top px-1.5 xl:px-0">
      <div class="mb-4 flex flex-col gap-2">
        <h1
          class="h-fit font-light underline underline-offset-4 decoration-1 text-xl md:text-2xl lg:text-4xl"
        >
          Select a service
        </h1>
      </div>

      <div class="w-full">
        @if (services$ | async; as services) {
          <ul class="flex flex-col gap-2">
            @for (service of services; track service.obj.service_name; let i = $index) {
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
                    {{ service.obj.service_name }}
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
                  Starts at: {{ '$' + service.obj.price }}
                  <strong
                    class="inline-block w-2 h-2 rounded-full bg-[var(--calendar-background)] mx-1"
                  ></strong>
                  {{ formatSeconds(service.obj.duration) }}
                </p>
              </li>
              <li
                class="px-1.5 py-3 text-right"
                [ngClass]="{ hidden: servicesSet.size < 1 }"
              >
                <a
                  [routerLink]="BOOK_STAFF_ROUTE"
                  (click)="addServicesOffered()"
                  class="py-2 px-5 rounded text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
                >
                  Next
                </a>
              </li>
            } @empty {
              No services available to pre-book, please check back some other time
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
export class BookServiceOfferedComponent {
  private readonly service = inject(BookServiceOfferedService);

  protected readonly BOOK_STAFF_ROUTE = BOOK_STAFF_ROUTE;
  protected readonly servicesSet = new Set<BookServiceOfferedDto>();

  /**
   * Returns all the services offered by the company from the server or
   * cache.
   * */
  protected readonly services$ = this.service
    .servicesOffered$()
    .pipe(map((objs) => objs.map((obj) => ({ toggle: false, obj: obj }))));

  protected readonly formatSeconds = (seconds: number) =>
    FORMAT_SECONDS(seconds);

  /**
   * Retrieves all employees from the server of cache that offered the
   * service selected.
   * */
  protected readonly toggleServiceOffered = (
    service: BookServiceOfferedDto
  ) => {
    const bool = this.servicesSet.has(service);
    if (bool) this.servicesSet.delete(service);
    else this.servicesSet.add(service);
    return !bool;
  };

  protected readonly addServicesOffered = () =>
    this.service.setSelectedServicesOffered(Array.from(this.servicesSet));
}
