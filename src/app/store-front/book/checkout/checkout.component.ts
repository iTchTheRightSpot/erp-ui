import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CheckoutService } from '@/app/store-front/book/checkout/checkout.service';
import { FormComponent } from '@/app/store-front/book/checkout/form.component';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { AsyncPipe } from '@angular/common';
import { EPOCH_SECONDS_TO_DATE, toHrMins } from '@/app/app.util';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormComponent, AsyncPipe],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {
  private readonly service = inject(CheckoutService);

  protected readonly bookingInfo = this.service.bookingInfoSignal();
  protected readonly loadingBtn = this.service.submit$;

  protected readonly toHrMins = (epochSeconds: number) =>
    toHrMins(EPOCH_SECONDS_TO_DATE(epochSeconds));

  protected readonly transform = (objs: BookServiceOfferedDto[]) =>
    objs.map((obj) => ({ service_name: obj.service_name }));

  protected readonly onSubmit = ($event: FormData) =>
    this.service.prebook($event);
}
