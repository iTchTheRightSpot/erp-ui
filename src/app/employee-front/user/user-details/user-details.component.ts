import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { keyOfRole, Role } from '@/app/app.util';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="min-w-full flex p-2 gap-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img class="w-36 h-36" [src]="image()" alt="" />
      <div class="px-3 flex-1 flex flex-col gap-3 text-left">
        <!-- fullname -->
        <div class="sm:col-span-2">
          <label
            for="fullname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Fullname <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            name="fullname"
            [value]="fullname()"
            disabled
            id="fullname"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <!-- display name -->
        <div class="sm:col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            name="name"
            [value]="displayName()"
            disabled
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <!-- email -->
        <div class="sm:col-span-2">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            name="email"
            [value]="email()"
            disabled
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <!-- roles -->
        <div class="sm:col-span-2">
          <label
            for="roles"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Roles <span class="text-red-500">*</span></label
          >
          <select
            id="roles"
            class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>Roles</option>
            @for (role of roles(); track role) {
              <option [value]="role">{{ role }}</option>
            }
          </select>
        </div>

        <!-- add role -->
        @if (filterRoles(roles()).length > 0) {
          <form class="sm:col-span-2">
            <label
              for="add-roles"
              class="block text-sm font-medium text-gray-900 dark:text-white"
              >Add role? <span class="text-red-500">*</span></label
            >
            <div class="flex gap-1">
              <select
                [formControl]="addRole"
                id="add-roles"
                class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected>Select role</option>
                @for (role of filterRoles(roles()); track role) {
                  <option [value]="role">{{ role }}</option>
                }
              </select>
              <button
                (click)="onClickUpdateRole(employeeId())"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                update
              </button>
            </div>
          </form>
        }

        <!-- bio -->
        <div class="sm:col-span-2">
          <label
            for="bio"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Bio <span class="text-red-500">*</span></label
          >
          <textarea
            type="text"
            name="bio"
            [value]="bio()"
            disabled
            id="bio"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          ></textarea>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  protected readonly addRole = new FormControl<string>('Select role');

  employeeId = input.required<string>();
  image = input.required<string>();
  fullname = input.required<string>();
  email = input.required<string>();
  bio = input.required<string>();
  displayName = input.required<string>();
  roles = input.required<Role[]>();
  btnLoading = input.required<boolean>();

  readonly onUpdateRoleEmitter = output<{ employeeId: string; role: Role }>();

  protected readonly filterRoles = (roles: Role[]) =>
    [Role.DEVELOPER, Role.OWNER, Role.EMPLOYEE, Role.USER].filter(
      (role) => !roles.includes(role),
    );

  protected readonly onClickUpdateRole = (employeeId: string) => {
    const value = this.addRole.value;
    if (value === null || value === 'Select role') return;
    const role = keyOfRole(this.addRole.value);
    if (role === null) return;
    this.onUpdateRoleEmitter.emit({ employeeId: employeeId, role: role });
  };
}
