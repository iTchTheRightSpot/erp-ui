import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CheckoutService } from '@/app/store-front/book/checkout/checkout.service';
import { FormComponent } from '@/app/store-front/book/checkout/form.component';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormComponent, AsyncPipe],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private readonly service = inject(CheckoutService);

  protected readonly bookingInfo = this.service.bookingInfoSignal();
  protected readonly loadingBtn = this.service.submit$;

  protected readonly toHrMins = (time: Date) =>
    new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  protected readonly transform = (objs: BookServiceOfferedDto[]) =>
    objs.map((obj) => ({ service_name: obj.name }));

  protected readonly onSubmit = ($event: FormData) =>
    this.service.prebook($event);
}
