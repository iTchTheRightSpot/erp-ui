import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
  ConfirmationStatus,
  KEY_OF_CONFIRMATION_STATUS
} from '@/app/employee-front/employee-front.util';
import { ApiStatus, TO_HR_MINS } from '@/app/app.util';
import { AppointmentDetail } from '@/app/employee-front/shared/about-appointment.util';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-appointment',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  template: `
    <div
      class="min-w-full px-2 pt-4 pb-10 bg-white flex flex-col md:flex-row gap-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
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
              <form
                [formGroup]="form()"
                class="w-full flex items-center justify-center gap-1"
              >
                <div class="flex-1">
                  <label
                    for="status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Status <span class="text-red-500">*</span></label
                  >
                  <select
                    id="status"
                    formControlName="status"
                    class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  >
                    <option disabled selected>{{ detail().status }}</option>
                    @for (
                      stat of filteredAppointmentConfirmationStatuses(
                        detail().status
                      );
                      track stat
                    ) {
                      <option [value]="stat">{{ stat }}</option>
                    }
                  </select>
                </div>
                <button
                  type="button"
                  (click)="updateStatus()"
                  [disabled]="appointmentUpdateStatus() === ApiStatus.LOADING"
                  class="mt-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  @if (appointmentUpdateStatus() === ApiStatus.LOADING) {
                    <span role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                    update status
                  }
                </button>
              </form>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAppointmentComponent {
  protected readonly ApiStatus = ApiStatus;

  protected readonly filteredAppointmentConfirmationStatuses = (
    status: ConfirmationStatus
  ) =>
    [
      ConfirmationStatus.CANCELLED,
      ConfirmationStatus.CONFIRMED,
      ConfirmationStatus.PENDING,
      ConfirmationStatus.EXPIRED
    ].filter((s) => status !== s);

  form = input.required<FormGroup>();
  detail = input.required<AppointmentDetail>();
  appointmentUpdateStatus = input.required<ApiStatus>();

  readonly updateAppointmentStatusEmitter = output<{
    appointmentId: number;
    status: ConfirmationStatus;
  }>();

  protected readonly toHrsMins = (date: Date) => TO_HR_MINS(date);

  protected readonly updateStatus = () => {
    const id = this.form().controls['appointmentId'].value;
    const status = this.form().controls['status'].value;

    if (!id || !status) return;

    this.updateAppointmentStatusEmitter.emit({
      appointmentId: Number(id),
      status: KEY_OF_CONFIRMATION_STATUS(status)
    });
  };
  protected readonly ConfirmationStatus = ConfirmationStatus;
}
