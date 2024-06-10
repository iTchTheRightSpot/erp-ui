import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ServiceOfferedService } from '@/app/employee-front/employee-service/service-offered.service';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE } from '@/app/employee-front/employee-service/employee-service.util';
import { ServiceOfferedFormComponent } from '@/app/employee-front/employee-service/service-offered-form/service-offered-form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceOfferForm } from '@/app/employee-front/employee-service/service-offered-form/service-offer-form.util';
import { AllServicesOffered } from '@/app/employee-front/employee-service/all-service-offered/all-service-offered.util';
import { map } from 'rxjs';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { Role } from '@/app/app.util';

@Component({
  selector: 'app-all-service-offered',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    RouterLink,
    ServiceOfferedFormComponent,
    NgStyle,
  ],
  template: `
    <div class="w-full p-2">
      <div class="w-full mb-4 flex gap-x-1">
        <h1
          class="underline underline-offset-4 text-lg lg:text-3xl font-medium"
        >
          All Services Offered
        </h1>
        <a
          [routerLink]="NEW_SERVICE_OFFERED"
          [ngStyle]="{
            display:
              staff()?.role === Role.OWNER || staff()?.role === Role.DEVELOPER
                ? 'block'
                : 'none'
          }"
          class="bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>
      </div>

      <div class="w-full">
        <app-table
          [tHead]="tHead"
          [tBody]="(tBody$ | async) || []"
          (rowClickEmitter)="onServiceOfferedNameClick($event)"
        />
      </div>
    </div>
    <div
      [style]="{ display: toggleForm ? 'block' : 'none' }"
      class="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[var(--half-black)]"
    >
      <div class="lg-scr p-2 flex flex-col">
        <div class="ml-auto mt-1 w-fit">
          <button
            (click)="toggleForm = !toggleForm"
            type="button"
            class="p-1 rounded-lg bg-gray-300 hover:bg-gray-600"
            aria-controls="close-calendar-button"
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

        <div class="w-full h-fit flex-1 bg-white mx-auto">
          <app-service-offered-form
            [form]="form"
            [clearField]="false"
            [profile]="true"
            [submitLoading]="(update$ | async) || false"
            [deleteLoading]="(delete$ | async) || false"
            (submitEmitter)="update($event)"
            (deleteEmitter)="delete($event)"
          />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllServiceOfferedComponent {
  private readonly service = inject(ServiceOfferedService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly fb = inject(FormBuilder);

  protected readonly NEW_SERVICE_OFFERED = EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE;
  protected toggleForm = false;
  protected readonly Role = Role;

  protected readonly staff = this.authenticationService.activeUser;

  protected readonly tHead: Array<keyof AllServicesOffered> = [
    'id',
    'visibility',
    'name',
    'price',
    'duration',
    'clean_up_time',
  ];

  protected readonly tBody$ = this.service.servicesOffered$.pipe(
    map((dtos) =>
      dtos.map(
        (dto) =>
          ({
            id: dto.service_id,
            name: dto.service_name,
            price: dto.price,
            visibility: dto.is_visible,
            duration: dto.duration,
            clean_up_time: dto.clean_up_time,
          }) as AllServicesOffered,
      ),
    ),
  );

  protected readonly update$ = this.service.onCreateUpdate$;
  protected readonly delete$ = this.service.onDelete$;

  protected readonly form = this.fb.group({
    serviceId: new FormControl('-1', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    price: new FormControl(0, [Validators.required]),
    visible: new FormControl(true, [Validators.required]),
    duration: new FormControl(0, [Validators.required]),
    cleanUp: new FormControl(0, [Validators.required]),
  });

  protected readonly onServiceOfferedNameClick = (
    event: AllServicesOffered,
  ) => {
    this.toggleForm = true;
    this.form.controls['serviceId'].setValue(event.id);
    this.form.controls['name'].setValue(event.name);
    this.form.controls['price'].setValue(event.price);
    this.form.controls['visible'].setValue(event.visibility);
    this.form.controls['duration'].setValue(event.duration);
    this.form.controls['cleanUp'].setValue(event.clean_up_time);
  };

  protected readonly update = (obj: ServiceOfferForm) =>
    this.service.update({
      service_id: obj.serviceId,
      service_name: obj.name,
      price: obj.price,
      is_visible: obj.visible,
      duration: obj.duration,
      clean_up_time: obj.cleanUp,
    });

  protected readonly delete = (serviceId: string) =>
    this.service.delete(serviceId);
}
