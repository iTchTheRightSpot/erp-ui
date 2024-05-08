import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ServiceOfferedService } from '@/app/store-front/book/service-offered/service-offered.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-service-offered',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './service-offered.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceOfferedComponent {
  private readonly service = inject(ServiceOfferedService);
  protected readonly services$ = this.service.services$;

  protected readonly selected = (service: string) => {};
}
