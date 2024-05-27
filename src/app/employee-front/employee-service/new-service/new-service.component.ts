import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ServiceOfferedFormComponent } from '@/app/employee-front/employee-service/shared/service-offered-form.component';
import { ServiceOfferedService } from '@/app/employee-front/employee-service/service-offered.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceOfferForm } from '@/app/employee-front/employee-service/shared/service-offer-form.util';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [ServiceOfferedFormComponent, AsyncPipe],
  templateUrl: './new-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewServiceComponent {
  private readonly service = inject(ServiceOfferedService);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    price: new FormControl('', [Validators.required]),
    visible: new FormControl(true, [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    cleanUp: new FormControl('', [Validators.required]),
  });

  protected readonly btnLoading$ = this.service.onCreateUpdateBtnLoading$;

  protected readonly submit = (obj: ServiceOfferForm) =>
    this.service.create({
      service_id: -1,
      name: obj.name,
      price: obj.price,
      is_visible: obj.visible,
      duration: obj.duration,
      clean_up_time: obj.cleanUp,
    });
}
