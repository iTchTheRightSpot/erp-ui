import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [],
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
          <button type="button">
            <img
              src="{{ logo }}"
              alt="logo"
              class="h-[2.5rem] w-[4.375rem] object-contain"
            />
          </button>
        </div>

        <!--    book now    -->
        <button
          class="p-1 uppercase rounded flex text-xs text-white bg-[var(--app-theme)] items-center"
        >
          book now
        </button>
      </div>

      <!-- drop down -->
      <ul class="flex-col list-none flex gap-3">
        @for (link of links; track link) {
          <li class="p-2.5 border-b">
            <a
              class="uppercase text-[var(--app-theme)]"
              (click)="toggle.set(false)"
            >
              {{ link }}
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  toggle = model<boolean>(false);

  protected readonly links = ['about', 'service'];

  protected readonly logo = './assets/images/logo.jpeg';
}