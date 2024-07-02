import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ConfirmationStatus } from '@/app/employee-front/employee-front.util';
import { toHrMins } from '@/app/app.util';
import { AppointmentDetail } from '@/app/employee-front/shared/about-appointment.util';

@Component({
  selector: 'app-about-appointment',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="min-w-full p-2 bg-white flex flex-col md:flex-row gap-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        class="w-36 h-36 md:w-52 md:h-52"
        [src]="detail().image"
        alt="appointment picture"
      />

      <div class="w-full">
        <!-- customer info -->
        <div class="">
          <h1
            class="mb-2 text-2xl text-gray-900 underline underline-offset-4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            Customer information
          </h1>

          <div class="px-3 flex-1 flex flex-col gap-3 text-left">
            <!-- fullname -->
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                name="name"
                [value]="detail().name"
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
                [value]="detail().email"
                disabled
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
            <!-- phone -->
            <div class="sm:col-span-2">
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Phone <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                name="phone"
                [value]="detail().phone"
                disabled
                id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <!-- appointment info -->
        <div class="w-full">
          <h1
            class="my-3 text-2xl text-gray-900 underline underline-offset-4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            Appointment information
          </h1>

          <div class="px-3 flex-1 flex flex-col gap-3 text-left">
            <!-- status -->
            <div class="sm:col-span-2">
              <label
                for="status"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Status <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                name="status"
                [value]="detail().status"
                disabled
                id="status"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                [ngClass]="{
                  'text-green-600':
                    detail().status === ConfirmationStatus.CONFIRMED,
                  'text-red-600':
                    detail().status === ConfirmationStatus.CANCELLED,
                  'text-yellow-400':
                    detail().status === ConfirmationStatus.PENDING,
                  'text-neutral-600':
                    detail().status === ConfirmationStatus.EXPIRED
                }"
              />
            </div>
            <!-- services -->
            <div class="sm:col-span-2">
              <label
                for="services"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Services <span class="text-red-500">*</span></label
              >
              <select
                id="services"
                class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected>services</option>
                @for (serv of detail().services; track serv) {
                  <option [value]="serv">{{ serv }}</option>
                }
              </select>
            </div>
            <!-- created date -->
            <div class="sm:col-span-2">
              <label
                for="created-on"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Scheduled for <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                name="created-on"
                [value]="detail().created.toDateString()"
                disabled
                id="created-on"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
            <!-- scheduled date -->
            <div class="sm:col-span-2">
              <label
                for="scheduled-for"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Scheduled for <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                name="scheduled-for"
                [value]="
                  detail().created.toDateString() +
                  'from ' +
                  toHrsMins(detail().scheduledFor) +
                  'to ' +
                  toHrsMins(detail().expire)
                "
                disabled
                id="scheduled-for"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
            <!-- address -->
            <div class="sm:col-span-2">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Address <span class="text-red-500">*</span></label
              >
              <textarea
                type="text"
                name="address"
                [value]="detail().address"
                disabled
                id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              ></textarea>
            </div>
            <!-- appointment details -->
            <div class="sm:col-span-2">
              <label
                for="appointment-details"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Appointment details <span class="text-red-500">*</span></label
              >
              <textarea
                type="text"
                name="appointment-details"
                [value]="detail().detail"
                disabled
                id="appointment-details"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutAppointmentComponent {
  detail = input.required<AppointmentDetail>();
  protected readonly toHrsMins = (date: Date) => toHrMins(date);
  protected readonly ConfirmationStatus = ConfirmationStatus;
}
