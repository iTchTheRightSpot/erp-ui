import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ServiceOfferedService } from '@/app/employee-front/employee-service/service-offered.service';
import { TableComponent } from '@/app/global-components/table/table.component';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE } from '@/app/employee-front/employee-service/employee-service.util';

export interface ServicesOffered {
  id: number;
  name: string;
  price: number;
  visibility: boolean;
  duration: number;
  clean_up_time: number;
}

@Component({
  selector: 'app-all-service-offered',
  standalone: true,
  imports: [TableComponent, AsyncPipe, RouterLink],
  template: `
    <div class="w-full p-2">
      <div class="w-full mb-4 flex gap-x-1">
        <h1
          class="underline underline-offset-4 text-lg lg:text-3xl font-medium"
        >
          All Services Offered
        </h1>
        <a [routerLink]="NEW_SERVICE_OFFERED" class="bg-transparent">
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
          [tBody]="(tBody | async) || []"
          (rowClickEmitter)="onServiceOfferedNameClick($event)"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllServiceOfferedComponent {
  private readonly service = inject(ServiceOfferedService);

  protected readonly NEW_SERVICE_OFFERED = EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE;

  protected readonly tHead: Array<keyof ServicesOffered> = [
    'id',
    'visibility',
    'name',
    'price',
    'duration',
    'clean_up_time',
  ];

  protected readonly tBody = this.service.servicesOffered$.pipe(
    map((dtos) =>
      dtos.map(
        (dto) =>
          ({
            id: dto.service_id,
            name: dto.name,
            price: dto.price,
            visibility: dto.is_visible,
            duration: dto.duration,
            clean_up_time: dto.clean_up_time,
          }) as ServicesOffered,
      ),
    ),
  );

  protected readonly onServiceOfferedNameClick = (event: ServicesOffered) =>
    console.log('ServiceOffered name clicked ', event);
}
