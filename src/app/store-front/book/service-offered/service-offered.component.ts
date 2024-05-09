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

  /**
   * Returns all the services offered by the company from the server or
   * cache.
   * */
  protected readonly services$ = this.service.servicesOffered$;

  /**
   * Retrieves all employees from the server of cache that offered the
   * service selected.
   * */
  protected readonly selected = (service: string) =>
    this.service.employeesByService(service);
}
