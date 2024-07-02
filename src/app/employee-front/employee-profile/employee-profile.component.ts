import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeProfileService } from '@/app/employee-front/employee-profile/employee-profile.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  EMPLOYEE_GENERAL_SERVICE_ROUTE,
  EMPLOYEE_UPDATE_PROFILE_ROUTE,
} from '@/app/employee-front/employee-profile/employee-profile.util';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  template: `
    <div class="p-2 text-gray-900 dark:text-white">
      <div class="w-full">
        <h1
          class="mb-6 text-4xl underline underline-offset-4 decoration-1 font-light tracking-tight text-gray-900 dark:text-white"
        >
          Profile
        </h1>
      </div>

      <div class="flex gap-5 flex-col md:flex-row">
        <div class="p-1">
          <div class="text-center text-gray-500 dark:text-gray-400">
            <img
              class="mx-auto mb-4 w-36 h-36 rounded-full"
              [src]="user()?.image_key"
              alt="user photo"
            />
            <h3
              class="mb-1 text-2xl font-light tracking-tight text-gray-900 dark:text-white"
            >
              {{ user()?.name }}
            </h3>
            <div class="w-full flex justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="size-4 text-[#ea4c89]"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="size-4 text-[#00acee]"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="size-4 text-[#39569c]"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- user details -->
        <div class="flex-1">
          <div
            class="w-full font-light text-2xl underline-offset-4 decoration-1 mb-2 flex gap-2"
          >
            <a
              [routerLink]="EMPLOYEE_UPDATE_PROFILE_ROUTE"
              [ngClass]="{
                'font-medium text-gray-900 dark:text-white underline': isActive(
                  EMPLOYEE_UPDATE_PROFILE_ROUTE
                )
              }"
            >
              General information</a
            >
            <a
              class="pl-2 font-light border-l-2 border-gray-900 dark:border-white"
              [routerLink]="EMPLOYEE_GENERAL_SERVICE_ROUTE"
              [ngClass]="{
                'font-medium text-gray-900 dark:text-white underline': isActive(
                  EMPLOYEE_GENERAL_SERVICE_ROUTE
                )
              }"
              >Services</a
            >
          </div>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeProfileComponent {
  private readonly router = inject(Router);
  protected readonly user = inject(EmployeeProfileService).user;

  protected readonly EMPLOYEE_UPDATE_PROFILE_ROUTE =
    EMPLOYEE_UPDATE_PROFILE_ROUTE;
  protected readonly EMPLOYEE_GENERAL_SERVICE_ROUTE =
    EMPLOYEE_GENERAL_SERVICE_ROUTE;

  protected readonly isActive = (route: string) =>
    this.router.url.endsWith(route);
}
