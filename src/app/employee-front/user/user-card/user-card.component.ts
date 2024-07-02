import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Role } from '@/app/app.util';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserDetailsComponent } from '@/app/employee-front/user/user-details/user-details.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatTooltipModule, UserDetailsComponent],
  template: `
    <div class="text-center text-gray-500 dark:text-gray-400">
      <img
        class="mx-auto mb-4 w-36 h-36 rounded-full"
        [src]="image()"
        [alt]="name()"
      />
      <button
        (click)="toggleUserDetailComponent = !toggleUserDetailComponent"
        class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ name() }}
      </button>
      <p>{{ displayName() }}</p>
      <ul class="flex justify-center mt-4 gap-2">
        @for (role of roles(); track role) {
          @switch (role) {
            @case (Role.DEVELOPER) {
              <li
                class="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white"
              >
                <button
                  type="button"
                  matTooltip="{{ role }}"
                  aria-label="Button that displays a tooltip when focused or hovered over"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="size-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            }
            @case (Role.OWNER) {
              <li
                class="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
              >
                <button
                  type="button"
                  matTooltip="{{ role }}"
                  aria-label="Button that displays a tooltip when focused or hovered over"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="size-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            }
            @case (Role.EMPLOYEE) {
              <li
                class="text-[#39569c] hover:text-gray-900 dark:hover:text-white"
              >
                <button
                  type="button"
                  matTooltip="{{ role }}"
                  aria-label="Button that displays a tooltip when focused or hovered over"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="size-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            }
            @default {
              <li>
                <button
                  type="button"
                  matTooltip="{{ role }}"
                  aria-label="Button that displays a tooltip when focused or hovered over"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="size-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM6.5 5.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            }
          }
        }
      </ul>
    </div>

    <!-- body -->
    <div
      [style]="{ display: toggleUserDetailComponent ? 'block' : 'none' }"
      class="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[var(--half-black)]"
    >
      <div class="lg-scr p-2 flex flex-col">
        <div class="ml-auto mt-1 w-fit">
          <button
            (click)="toggleUserDetailComponent = !toggleUserDetailComponent"
            type="button"
            class="p-1 rounded-lg bg-gray-300 hover:bg-gray-600"
            aria-controls="close-user-details-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="w-full max-h-[500px] xl:max-h-fit overflow-y-scroll mx-auto">
          <app-user-details
            [employeeId]="employeeId()"
            [image]="image()"
            [fullname]="name()"
            [displayName]="displayName()"
            [email]="email()"
            [bio]="bio()"
            [roles]="roles()"
            [updateRoleStatus]="updateRoleStatus()"
            (onUpdateRoleEmitter)="onUpdateRole($event)"
          />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  // reference css https://flowbite.com/blocks/marketing/team/
  protected readonly Role = Role;
  protected toggleUserDetailComponent = false;

  employeeId = input.required<string>();
  image = input.required<string>();
  name = input.required<string>();
  email = input.required<string>();
  bio = input.required<string>();
  displayName = input.required<string>();
  roles = input.required<Role[]>();
  updateRoleStatus = input.required<boolean>();

  readonly onUpdateRoleEmitter = output<{ employeeId: string; role: Role }>();

  protected readonly onUpdateRole = (obj: { employeeId: string; role: Role }) =>
    this.onUpdateRoleEmitter.emit(obj);
}
