import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CheckoutService } from '@/app/store-front/book/checkout/checkout.service';
import { FormComponent } from '@/app/store-front/book/checkout/form.component';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { AsyncPipe } from '@angular/common';
import { ApiStatus, EPOCH_SECONDS_TO_DATE, TO_HR_MINS } from '@/app/app.util';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormComponent, AsyncPipe],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CheckoutService);

  protected readonly ApiStatus = ApiStatus;
  protected readonly bookingInfo = this.service.bookingInfoSignal();
  protected readonly loadingBtn = this.service.submit$.pipe(
    tap((obj) => {
      if (obj && obj === ApiStatus.LOADED)
        this.form.reset({
          name: '',
          email: '',
          phone: null,
          address: '',
          city: '',
          province: '',
          postcode: '',
          description: ''
        });
    })
  );

  protected readonly form = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    email: new FormControl('', [Validators.required, Validators.max(255)]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{4}$')
    ]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.max(255)])
  });

  protected readonly toHrMins = (epochSeconds: number) =>
    TO_HR_MINS(EPOCH_SECONDS_TO_DATE(epochSeconds));

  protected readonly transform = (objs: BookServiceOfferedDto[]) =>
    objs.map((obj) => ({ service_name: obj.service_name }));

  protected readonly onSubmit = ($event: FormData) =>
    this.service.prebook($event);
}
