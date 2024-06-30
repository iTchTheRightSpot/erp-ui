import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Role } from '@/app/app.util';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatTooltipModule],
  template: `
    <div class="text-center text-gray-500 dark:text-gray-400">
      <img
        class="mx-auto mb-4 w-36 h-36 rounded-full"
        [src]="image()"
        [alt]="name()"
      />
      <button
        (click)="onCardClicked.emit(employeeId())"
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
              <li class="">
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  // reference css https://flowbite.com/blocks/marketing/team/
  protected readonly Role = Role;
  employeeId = input.required<string>();
  image = input.required<string>();
  name = input.required<string>();
  displayName = input.required<string>();
  roles = input.required<Role[]>();
  readonly onCardClicked = output<string>();
}
