import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { MobileNavComponent } from '@/app/global-components/mobile-nav/mobile-nav.component';
import { ABOUT_ROUTE, BOOK_ROUTE, SERVICE_ROUTE } from '@/app/store-front/util';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgStyle, MobileNavComponent],
  template: `
    <nav class="md:hidden flex p-1" [ngStyle]="navBg">
      <!-- burger -->
      <button
        (click)="toggle = !toggle"
        class="bg-transparent outline-none border-none cursor-pointer relative"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          style="color: var(--app-theme)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <!-- center logo -->
      <div class="my-0 mx-auto cursor-pointer">
        <button type="button" (click)="route('')">
          <img
            src="{{ logo }}"
            alt="logo"
            class="h-[2.5rem] w-[4.375rem] object-contain"
          />
        </button>
      </div>

      <div
        [style]="{ display: toggle ? 'block' : 'none' }"
        class="fixed top-0 right-0 bottom-0 left-0"
      >
        <app-mobile-nav [(toggle)]="toggle" (routeEmitter)="route($event)" />
      </div>

      <!--    Person icon    -->
      <button
        class="p-1 uppercase rounded flex text-xs text-white bg-[var(--app-theme)] items-center"
        (click)="route(BOOK_ROUTE)"
      >
        book now
      </button>
    </nav>
    <!--  end of Mobile  -->

    <nav
      class="hidden md:grid w-full p-3 grid-cols-3 bg-transparent"
      [ngStyle]="navBg"
    >
      <!-- left nav -->
      <div class="flex items-center mr-auto">
        <div class="flex gap-8">
          <button
            (click)="route(ABOUT_ROUTE)"
            type="button"
            class="h-full relative flex gap-1 items-center cursor-pointer uppercase text-[var(--app-theme)]"
          >
            about
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>

          <button
            type="button"
            class="h-full relative flex gap-1 items-center cursor-pointer uppercase text-[var(--app-theme)]"
            (click)="route(SERVICE_ROUTE)"
          >
            service
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- center logo -->
      <div class="my-0 mx-auto cursor-pointer">
        <button type="button" (click)="route('')">
          <img
            src="{{ logo }}"
            alt="logo"
            class="h-[2.5rem] w-[4.375rem] object-contain"
          />
        </button>
      </div>

      <!-- right nav -->
      <div class="flex items-center ml-auto">
        <ul class="flex gap-2 lg:gap-8 justify-end list-none">
          <li class="hidden md:block">
            <button
              type="button"
              class="p-2 uppercase rounded flex text-white bg-[var(--app-theme)]"
              (click)="route(BOOK_ROUTE)"
            >
              book now
            </button>
          </li>

          <!--    Person icon    -->
          <li class="hidden md:block">
            <button type="button" class="p-2 uppercase flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
                style="color: var(--app-theme)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  protected navBg: any;
  protected readonly logo = './assets/images/logo.jpeg';
  protected readonly BOOK_ROUTE = BOOK_ROUTE;
  protected readonly SERVICE_ROUTE = SERVICE_ROUTE;
  protected readonly ABOUT_ROUTE = ABOUT_ROUTE;
  toggle = false;
  @Output() protected readonly routeEmitter = new EventEmitter<string>();

  @HostListener('document:scroll') scroll(): void {
    const bool =
      document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
    const css = {
      'background-color': 'var(--white)',
      'box-shadow': '4px 6px 12px rgba(0, 0, 0, 0.2)',
      'border-bottom-right-radius': '3px',
      'border-bottom-left-radius': '3px',
    };

    this.navBg = bool ? css : {};
  }

  route = (path: string): void => this.routeEmitter.emit(path);
}
