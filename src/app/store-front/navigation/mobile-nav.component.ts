import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { BOOK_ROUTE } from '@/app/store-front/util';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="h-full w-full flex flex-col gap-3 bg-white">
      <div class="flex justify-between w-full p-2">
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
        <a
          [routerLink]="BOOK_ROUTE"
          (click)="toggle.set(false)"
          class="p-1 uppercase rounded flex items-center text-xs text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
        >
          book now
        </a>
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
  readonly toggle = model<boolean>(false);
  protected readonly links = ['about', 'service'];
  protected readonly logo = './assets/images/logo.jpeg';
  protected readonly BOOK_ROUTE = BOOK_ROUTE;
}