import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeNavigationComponent } from '@/app/employee-front/employee-navigation/employee-navigation.component';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { AsyncPipe } from '@angular/common';
import { Subject, switchMap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import {
  EMPLOYEE_FRONT_APPOINTMENT,
  EMPLOYEE_FRONT_DASHBOARD,
  EMPLOYEE_FRONT_PROFILE,
  EMPLOYEE_FRONT_SCHEDULE,
  EMPLOYEE_FRONT_SERVICE,
  EMPLOYEE_FRONT_USER,
} from '@/app/employee-front/employee-front.util';
import { Role } from '@/app/app.util';

@Component({
  selector: 'app-employee-front',
  standalone: true,
  imports: [RouterOutlet, EmployeeNavigationComponent, AsyncPipe],
  template: `
    <div class="min-h-screen flex bg-white dark:bg-gray-900">
      <div class="grow-1">
        <app-employee-navigation
          [routes]="routes"
          [logout]="(logout$ | async) || false"
          (logoutEmitter)="emit()"
        />
      </div>

      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFrontComponent {
  constructor(
    private readonly authenticationService: AuthenticationService,
    protected readonly sanitize: DomSanitizer,
  ) {
    const user = this.authenticationService.activeUser();

    if (
      user &&
      (user.roles.includes(Role.DEVELOPER) || user.roles.includes(Role.OWNER))
    )
      this.routes.push({
        link: EMPLOYEE_FRONT_USER,
        html: this.sanitize.bypassSecurityTrustHtml(`
            <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
            >
                <path
                  d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"
                />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
      `),
      });
  }

  private readonly subject = new Subject<void>();

  protected readonly logout$ = this.subject
    .asObservable()
    .pipe(switchMap(() => this.authenticationService.logout()));

  protected readonly emit = () => this.subject.next();

  protected readonly routes = [
    {
      link: EMPLOYEE_FRONT_DASHBOARD,
      html: this.sanitize.bypassSecurityTrustHtml(
        `
        <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path
                  d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
                />
              </svg>
        <span class="ms-3">Dashboard</span>
      `,
      ),
    },
    {
      link: EMPLOYEE_FRONT_SCHEDULE,
      html: this.sanitize.bypassSecurityTrustHtml(
        `
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Schedule</span>
      `,
      ),
    },
    {
      link: EMPLOYEE_FRONT_APPOINTMENT,
      html: this.sanitize.bypassSecurityTrustHtml(`
        <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Appointments</span>
              <span
                class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >3</span
              >
      `),
    },
    {
      link: EMPLOYEE_FRONT_SERVICE,
      html: this.sanitize.bypassSecurityTrustHtml(
        `
      <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path
                  d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Services</span>
      `,
      ),
    },
    {
      link: EMPLOYEE_FRONT_PROFILE,
      html: this.sanitize.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
        <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
      `),
    },
  ];
}
