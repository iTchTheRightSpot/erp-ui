import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role } from '@/app/app.util';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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
          <!--          <input-->
          <!--            type="text"-->
          <!--            name="name"-->
          <!--            [value]="roles()"-->
          <!--            disabled-->
          <!--            id="name"-->
          <!--            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"-->
          <!--          />-->
        </div>
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
}
