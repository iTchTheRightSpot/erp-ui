import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceOfferedFormComponent } from '@/app/employee-front/employee-service/service-offered-form/service-offered-form.component';
import { ServiceOfferedService } from '@/app/employee-front/employee-service/service-offered.service';
import { ServiceOfferForm } from '@/app/employee-front/employee-service/service-offered-form/service-offer-form.util';

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [ServiceOfferedFormComponent, AsyncPipe],
  template: `
    <div class="w-full p-2 text-gray-700 dark:text-gray-400">
      <div class="w-full mb-4">
        <h1
          class="underline underline-offset-4 text-lg lg:text-3xl font-medium"
        >
          Create Services Offered
        </h1>
      </div>
      <div class="w-full lg:max-w-lg">
        <app-service-offered-form
          [form]="form"
          [clearField]="(clearForm$ | async) || false"
          [submitLoading]="(btnLoading$ | async) || false"
          [deleteLoading]="false"
          (submitEmitter)="submit($event)"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewServiceComponent {
  private readonly service = inject(ServiceOfferedService);
  private readonly fb = inject(FormBuilder);

  protected readonly clearForm$ = this.service.clearForm$;

  protected readonly form = this.fb.group({
    serviceId: new FormControl('0'),
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    price: new FormControl('', [Validators.required]),
    visible: new FormControl(true, [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    cleanUp: new FormControl('', [Validators.required])
  });

  protected readonly btnLoading$ = this.service.onCreateUpdate$;

  protected readonly submit = (obj: ServiceOfferForm) =>
    this.service.create({
      service_id: '-1',
      service_name: obj.name,
      price: obj.price,
      is_visible: obj.visible,
      duration: obj.duration,
      clean_up_time: obj.cleanUp
    });
}
