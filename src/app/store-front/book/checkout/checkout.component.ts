import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '@/app/store-front/book/checkout/checkout.service';
import { FormComponent } from '@/app/store-front/book/checkout/form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private readonly router = inject(Router);
  private readonly service = inject(CheckoutService);

  protected readonly details = this.service.bookingInfoSignal();
  protected readonly date = new Date();
  protected readonly img = 'assets/images/staffs/engin-akyurt.jpg';

  protected readonly toHrMins = (time: Date) =>
    new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
}
