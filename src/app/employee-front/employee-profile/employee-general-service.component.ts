import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeGeneralService } from '@/app/employee-front/employee-profile/employee-general.service';
import { ServiceOfferedService } from '@/app/employee-front/employee-service/service-offered.service';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { combineLatest, map, Subject, tap } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DeleteObject } from '@/app/employee-front/shared/table.component.util';
import { ServiceOfferedDto } from '@/app/employee-front/employee-service/employee-service.util';

interface AllServicesByEmployee {
  id: string;
  name: string;
  delete: string;
}

@Component({
  selector: 'app-employee-general-service',
  standalone: true,
  imports: [AsyncPipe, TableComponent, ReactiveFormsModule],
  templateUrl: './employee-general-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeGeneralServiceComponent {
  // css reference https://flowbite.com/blocks/application/crud/
  private readonly generalService = inject(EmployeeGeneralService);
  private readonly serviceOfferedService = inject(ServiceOfferedService);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    serviceName: new FormControl('All services offered', [Validators.required])
  });

  protected readonly tHead: Array<keyof AllServicesByEmployee> = [
    'id',
    'name',
    'delete'
  ];

  /**
   * Subject to hold the list of services offered by an employee.
   * This subject is used to facilitate the filtering of all available services
   * by comparing them against the services already assigned to the employee.
   */
  private readonly allServicesByEmployeeSubject = new Subject<
    ServiceOfferedDto[]
  >();

  /**
   * Observable that emits a transformed list of {@link AllServicesByEmployee} by an employee.
   */
  protected readonly allServicesOfferedByEmployeeId$ =
    this.generalService.allServicesOfferedByEmployeeId$.pipe(
      tap((arr) => this.allServicesByEmployeeSubject.next(arr)),
      map((arr) =>
        arr.map(
          (obj) =>
            ({
              id: obj.service_id,
              name: obj.service_name,
              delete: 'delete'
            }) as AllServicesByEmployee
        )
      )
    );

  /**
   * Observable that emits a filtered list of {@link ServiceOfferedDto}, excluding those that are
   * already offered by an {@link UserDto}.
   */
  protected readonly filteredServices$ = combineLatest([
    this.allServicesByEmployeeSubject.asObservable(),
    this.serviceOfferedService.servicesOffered$
  ]).pipe(
    map(
      ([allServicesByEmployeeId, allServices]: [
        ServiceOfferedDto[],
        ServiceOfferedDto[]
      ]) =>
        allServices.filter(
          (allService) =>
            !allServicesByEmployeeId.some(
              (service) => service.service_id === allService.service_id
            )
        )
    )
  );

  /**
   * Status tells helps display error message when a user clicks on add service button
   * but haven't selected any {@link ServiceOfferedDto}.
   */
  protected displayErrorOnClick = false;

  protected readonly addToServiceToUserStatus$ =
    this.generalService.addToServiceToUserStatus$;

  protected readonly onClickServiceOfferedToAddToEmployee = () => {
    const name = this.form.controls['serviceName'].value;
    if (name !== null && name !== 'All services offered') {
      this.displayErrorOnClick = false;
      this.generalService.addServiceToEmployee(name);
    } else this.displayErrorOnClick = true;
  };

  protected readonly onDeleteServiceOfferedAttachedToEmployeeStatus$ =
    this.generalService.deleteServiceAttachedToEmployeeStatus$.pipe(
      map((bool) => ({ id: this.toDeleteId, status: bool }) as DeleteObject)
    );

  protected toDeleteId = '';

  protected readonly onClickDeleteServiceOfferedAttachedToEmployee = (
    obj: AllServicesByEmployee
  ) =>
    this.generalService.deleteServiceAttachedToEmployee(
      (this.toDeleteId = obj.id)
    );
}
