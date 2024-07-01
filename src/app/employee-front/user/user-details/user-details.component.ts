import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { keyOfRole, Role } from '@/app/app.util';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
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
                (change)="onUpdateRoleStatus($event)"
                id="add-roles"
                class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected>Select role</option>
                @for (role of filterRoles(roles()); track role) {
                  <option [value]="role">{{ role }}</option>
                }
              </select>
              @if (updateRoleStatus()) {
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                </div>
              } @else {
                <button
                  (click)="onClickUpdateRole(employeeId(), roles())"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  update
                </button>
              }
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
  employeeId = input.required<string>();
  image = input.required<string>();
  fullname = input.required<string>();
  email = input.required<string>();
  bio = input.required<string>();
  displayName = input.required<string>();
  roles = input.required<Role[]>();
  updateRoleStatus = input.required<boolean>();

  readonly onUpdateRoleEmitter = output<{ employeeId: string; role: Role }>();

  protected readonly filterRoles = (roles: Role[]) =>
    [Role.DEVELOPER, Role.OWNER, Role.EMPLOYEE, Role.USER].filter(
      (role) => !roles.includes(role),
    );

  private selectedRoleToUpdateTo: Role | null = null;
  protected readonly onUpdateRoleStatus = (event: Event) =>
    (this.selectedRoleToUpdateTo = keyOfRole(
      (event.target as HTMLSelectElement).value,
    ));

  protected readonly onClickUpdateRole = (
    employeeId: string,
    roles: Role[],
  ) => {
    const role = this.selectedRoleToUpdateTo;
    if (role === null || roles.includes(role)) return;
    this.onUpdateRoleEmitter.emit({ employeeId: employeeId, role: role });
  };
}
