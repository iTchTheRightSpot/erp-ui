import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { EmployeeMobileNavigationComponent } from '@/app/employee-front/employee-navigation/employee-mobile-navigation.component';
import { EMPLOYEE_FRONT_DASHBOARD } from '@/app/employee-front/employee-front.util';
import { RouterLink } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-navigation',
  standalone: true,
  imports: [EmployeeMobileNavigationComponent, RouterLink, CdkDrag],
  template: `
    <button
      cdkDrag
      (click)="toggle = !toggle"
      data-drawer-target="logo-sidebar"
      data-drawer-toggle="logo-sidebar"
      aria-controls="logo-sidebar"
      type="button"
      class="lg:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm bg-gray-600 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed top-0 left-0 z-40"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <div [style]="{ display: toggle ? 'block' : 'none' }">
      <app-employee-mobile-navigation
        [routes]="routes()"
        [logo]="logo"
        [logout]="logout()"
        [(toggle)]="toggle"
        (logoutEmitter)="logoutEmitter.emit()"
      />
    </div>

    <aside
      id="logo-sidebar"
      class="hidden lg:block w-fit h-full"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <a [routerLink]="DASHBOARD_ROUTE" class="flex items-center ps-2.5 mb-5">
          <img
            [src]="logo"
            class="h-12 w-16"
            alt="Saturday Mowing Company Logo"
          />
        </a>
        <ul class="space-y-2 font-medium">
          @for (route of routes(); track route.link) {
            <li>
              <a
                [routerLink]="route.link"
                [innerHTML]="route.html"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              ></a>
            </li>
          }

          <li>
            <button
              (click)="logoutClick()"
              [disabled]="logout()"
              type="button"
              class="w-full text-left flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>

              @if (logout()) {
                <span role="status" class="ml-3">
                  <svg
                    aria-hidden="true"
                    class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
              }
            </button>
          </li>
        </ul>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeNavigationComponent {
  logout = input.required<boolean>();
  routes = input.required<{ link: string; html: SafeHtml }[]>();
  protected readonly logo = './assets/images/logo.jpeg';
  protected toggle = false;
  protected readonly DASHBOARD_ROUTE = EMPLOYEE_FRONT_DASHBOARD;

  protected readonly logoutEmitter = output<void>();
  protected readonly logoutClick = () => this.logoutEmitter.emit();
}
