import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="h-full w-full flex flex-col gap-3 bg-white">
      <div class="w-full p-2 flex justify-between">
        <!-- left cancel btn -->
        <button type="button" (click)="toggle.set(false)">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- center (logo) -->
        <div class="my-0 mx-auto cursor-pointer">
          <a type="button" routerLink="" (click)="toggle.set(false)">
            <img
              src="{{ logo }}"
              alt="logo"
              class="h-[2.5rem] w-[4.375rem] object-contain"
            />
          </a>
        </div>

        <!--    book now    -->
        <div class="grid grid-cols-2 gap-1.5">
          <a
            [routerLink]="BOOK_ROUTE"
            class="p-1 uppercase rounded  items-center flex text-xs text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
          >
            book now
          </a>

          <a class="p-1 my-auto" [href]="login">
            <span class="sr-only">login icon</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- drop down -->
      <ul class="flex-col list-none flex gap-3">
        @for (link of links; track link) {
          <li
            class="p-2.5 border-b cursor-pointer active:border-black active:border-2 focus:border-black focus:border-2"
          >
            <a
              [routerLink]="link"
              (click)="toggle.set(false)"
              class="uppercase text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
              >{{ link }}</a
            >
          </li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  login = input.required<string>();
  readonly toggle = model<boolean>(false);
  protected readonly links = ['about', 'service'];
  protected readonly logo = './assets/images/logo.jpeg';
  protected readonly BOOK_ROUTE = BOOK_ROUTE;
}
