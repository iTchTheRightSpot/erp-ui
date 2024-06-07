import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import {
  EMPLOYEE_FRONT_APPOINTMENT,
  EMPLOYEE_FRONT_DASHBOARD,
  EMPLOYEE_FRONT_PROFILE,
  EMPLOYEE_FRONT_SCHEDULE,
  EMPLOYEE_FRONT_SERVICE,
} from '@/app/employee-front/employee-front.util';
import { RouterLink } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-mobile-navigation',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="h-screen flex fixed top-0 right-0 bottom-0 left-0 z-40">
      <aside id="logo-sidebar" class="h-full" aria-label="Sidebar">
        <div
          class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
        >
          <a
            [routerLink]="DASHBOARD_ROUTE"
            (click)="toggle.set(false)"
            class="flex items-center ps-2.5 mb-5"
          >
            <img
              [src]="logo()"
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
      <button
        type="button"
        class="flex-1 p-4 bg-black opacity-50"
        (click)="toggle.set(false)"
      ></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeMobileNavigationComponent {
  readonly toggle = model<boolean>(false);
  logo = input.required<string>();
  logout = input.required<boolean>();
  routes = input.required<{ link: string; html: SafeHtml }[]>();

  protected readonly SERVICE_ROUTE = EMPLOYEE_FRONT_SERVICE;
  protected readonly APPOINTMENT_ROUTE = EMPLOYEE_FRONT_APPOINTMENT;
  protected readonly DASHBOARD_ROUTE = EMPLOYEE_FRONT_DASHBOARD;
  protected readonly SCHEDULE_ROUTE = EMPLOYEE_FRONT_SCHEDULE;
  protected readonly PROFILE_ROUTE = EMPLOYEE_FRONT_PROFILE;

  protected readonly logoutEmitter = output<void>();
  protected readonly logoutClick = () => this.logoutEmitter.emit();
}
