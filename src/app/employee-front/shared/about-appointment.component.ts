import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ConfirmationStatus } from '@/app/employee-front/employee-front.util';
import { toHrMins } from '@/app/app.util';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { AppointmentDetail } from '@/app/employee-front/shared/about-appointment.util';

@Component({
  selector: 'app-about-appointment',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  template: `
    <!-- max-w-sm -->
    @if (detail() | async; as detail) {
      <div
        class="w-full p-2 flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row"
      >
        @if (detail.image && detail.image.length > 0) {
          <img
            class="object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            [src]="detail.image"
            alt="appointment picture"
          />
        }
        <div class="w-full pl-2 flex flex-col justify-between gap-2 ">
          <div class="">
            <h1
              class="mb-2 text-2xl tracking-tight underline underline-offset-4"
            >
              Customer info
            </h1>

            <h3><strong>Name</strong>: {{ detail.name }}</h3>
            <h3><strong>Email</strong>: {{ detail.email }}</h3>
            <h3><strong>Phone</strong>: {{ detail.phone }}</h3>
          </div>

          <div class="w-full">
            <h1
              class="mb-2 text-2xl font-medium tracking-tight underline underline-offset-4"
            >
              Appointment info
            </h1>
            <h3>
              <strong>Status</strong>:
              <span
                [ngClass]="{
                  'text-green-600':
                    detail.status === ConfirmationStatus.CONFIRMED,
                  'text-red-600':
                    detail.status === ConfirmationStatus.CANCELLED,
                  'text-yellow-400':
                    detail.status === ConfirmationStatus.PENDING,
                  'text-neutral-600':
                    detail.status === ConfirmationStatus.EXPIRED
                }"
                >{{ detail.status }}</span
              >
            </h3>
            <label for="services"><strong>Services</strong></label>
            <select
              id="services"
              class="block w-full p-3 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded bg-gray-50"
            >
              <option value="" disabled selected="selected">
                appointment services
              </option>

              @for (det of detail.services; track det) {
                <option [value]="det">
                  {{ det }}
                </option>
              }
            </select>
            <p>
              <strong>Created on</strong>: {{ detail.created.toDateString() }}
            </p>
            <p>
              <strong>Scheduled on</strong>:
              {{ detail.scheduledFor.toDateString() }} from
              {{ toHrsMins(detail.scheduledFor) }} to
              {{ toHrsMins(detail.expire) }}
            </p>
            <p><strong>Address</strong>: {{ detail.address }}</p>
            <p><strong>Details</strong>: {{ detail.detail }}</p>
          </div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutAppointmentComponent {
  detail = input.required<Observable<AppointmentDetail>>();
  protected readonly toHrsMins = (date: Date) => toHrMins(date);
  protected readonly ConfirmationStatus = ConfirmationStatus;
}
