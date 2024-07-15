import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output
} from '@angular/core';
import { BOOK_ROUTE } from '@/app/store-front/store-front.util';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { EMPLOYEE_FRONT_HOME } from '@/app/app.util';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, NgStyle],
  template: `
    <div class="h-full w-full flex flex-col gap-3 bg-white">
      <div class="w-full p-2 flex justify-between">
        <!-- left cancel btn -->
        <button
          type="button"
          [ngStyle]="{ display: isStaff() ? 'block' : 'none' }"
          (click)="toggle.set(false)"
        >
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

        <!-- book now -->
        <div class="grid grid-cols-2 gap-1.5">
          <a
            [routerLink]="BOOK_ROUTE"
            class="p-1 uppercase rounded  items-center flex text-xs text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
          >
            book now
          </a>

          @if (!isSignedIn()) {
            <button type="button" (click)="redirect()" class="p-1 my-auto">
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
            </button>
          } @else {
            <button type="button" (click)="logoutClick()" class="p-1 my-auto">
              @if (logout()) {
                <span role="status" class="ml-3">
                  <svg
                    aria-hidden="true"
                    class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </span>
              } @else {
                <span class="sr-only">logout icon</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
              }
            </button>
          }
        </div>
      </div>

      <!-- drop down -->
      <ul class="flex-col list-none flex gap-3">
        @for (link of links; track link) {
          <li
            class="p-2.5 hidden border-b cursor-pointer active:border-black active:border-t-2 focus:border-black focus:border-2"
          >
            <a
              [routerLink]="link"
              (click)="toggle.set(false)"
              class="uppercase text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
              >{{ link }}</a
            >
          </li>
        }
        <li
          class="p-2.5 border-y cursor-pointer active:border-black active:border-2 focus:border-black focus:border-2"
        >
          <a
            [routerLink]="EMPLOYEE_ROUTE"
            (click)="toggle.set(false)"
            [ngStyle]="{ display: isStaff() ? 'block' : 'none' }"
            class="uppercase text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
            >employee</a
          >
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileNavComponent {
  isStaff = input<boolean>();
  isSignedIn = input.required<boolean>();
  logout = input.required<boolean>();

  readonly toggle = model<boolean>(false);
  readonly redirectEmitter = output<void>();

  protected readonly links = ['about', 'service'];

  protected readonly logo = './assets/images/logo.jpeg';
  protected readonly BOOK_ROUTE = BOOK_ROUTE;
  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_FRONT_HOME;

  protected readonly redirect = () => this.redirectEmitter.emit();

  protected readonly logoutEmitter = output<void>();
  protected readonly logoutClick = () => this.logoutEmitter.emit();
}
