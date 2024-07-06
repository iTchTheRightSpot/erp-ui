import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { MobileNavComponent } from '@/app/store-front/navigation/mobile-nav.component';
import {
  ABOUT_ROUTE,
  BOOK_ROUTE,
  SERVICE_ROUTE
} from '@/app/store-front/store-front.util';
import { RouterLink } from '@angular/router';
import { environment } from '@/environments/environment';
import { EMPLOYEE_FRONT_HOME } from '@/app/app.util';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgStyle, MobileNavComponent, RouterLink, NgClass],
  template: `
    <nav class="md:hidden flex p-1" [ngStyle]="navBg">
      <!-- burger -->
      <button
        (click)="toggle = !toggle"
        type="button"
        class="bg-transparent border-none cursor-pointer relative"
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
        <a routerLink="">
          <img
            src="{{ logo }}"
            alt="logo"
            class="h-[2.5rem] w-[4.375rem] object-contain"
          />
        </a>
      </div>

      <div
        [style]="{ display: toggle ? 'block' : 'none' }"
        class="fixed top-0 right-0 bottom-0 left-0"
      >
        <app-mobile-nav
          [isStaff]="isStaff()"
          [isSignedIn]="isSignedIn()"
          [logout]="logout()"
          [(toggle)]="toggle"
          (redirectEmitter)="redirect()"
          (logoutEmitter)="logoutClick()"
        />
      </div>

      <div class="flex gap-1.5 justify-center">
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
    </nav>
    <!--  end of Mobile  -->

    <nav
      class="hidden md:grid w-full p-3 grid-cols-3 bg-transparent"
      [ngStyle]="navBg"
    >
      <!-- left nav -->
      <div class="flex items-center mr-auto">
        <li class="flex gap-8">
          <a
            [routerLink]="ABOUT_ROUTE"
            class="h-full relative flex gap-1 items-center cursor-pointer uppercase text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
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
          </a>

          <a
            [routerLink]="SERVICE_ROUTE"
            class="h-full relative flex gap-1 items-center cursor-pointer uppercase text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
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
          </a>

          <a
            [routerLink]="EMPLOYEE_FRONT_HOME"
            [ngStyle]="{ display: isStaff() ? 'flex' : 'none' }"
            class="h-full relative hidden gap-1 items-center cursor-pointer uppercase text-[var(--app-theme)] hover:text-[var(--app-theme-hover)]"
          >
            employee
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </a>
        </li>
      </div>

      <!-- center logo -->
      <div class="my-0 mx-auto cursor-pointer">
        <a routerLink="">
          <img
            [src]="logo"
            alt="logo"
            class="h-[2.5rem] w-[4.375rem] object-contain"
          />
        </a>
      </div>

      <!-- right nav -->
      <div class="flex items-center ml-auto">
        <ul class="flex gap-2 lg:gap-8 justify-end list-none">
          <li class="hidden md:block">
            <a
              [routerLink]="BOOK_ROUTE"
              class="p-2 uppercase rounded flex text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
            >
              book now
            </a>
          </li>

          <!--    person icon    -->
          <li class="hidden md:block" tabindex="0">
            @if (!isSignedIn()) {
              <button
                type="button"
                (click)="redirect()"
                class="p-2 uppercase flex"
              >
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
              <button
                type="button"
                (click)="logoutClick()"
                class="p-2 uppercase flex"
              >
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
          </li>
        </ul>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  isStaff = input.required<boolean>();
  isSignedIn = input.required<boolean>();
  logout = input.required<boolean>();

  protected readonly logoutEmitter = output<void>();

  protected navBg: any;
  protected readonly logo = './assets/images/logo.jpeg';
  protected readonly BOOK_ROUTE = BOOK_ROUTE;
  protected readonly SERVICE_ROUTE = SERVICE_ROUTE;
  protected readonly ABOUT_ROUTE = ABOUT_ROUTE;
  protected readonly EMPLOYEE_FRONT_HOME = EMPLOYEE_FRONT_HOME;
  toggle = false;

  @HostListener('document:scroll')
  protected readonly scroll = () => {
    const bool =
      document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;
    const css = {
      'background-color': 'var(--white)',
      'box-shadow': '4px 6px 12px rgba(0, 0, 0, 0.2)',
      'border-bottom-right-radius': '3px',
      'border-bottom-left-radius': '3px'
    };

    this.navBg = bool ? css : {};
  };

  protected readonly redirect = () =>
    (window.location.href = `${environment.domain}authentication/authenticate`);

  protected readonly logoutClick = () => this.logoutEmitter.emit();
}
