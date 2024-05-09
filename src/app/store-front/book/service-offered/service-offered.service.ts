import { inject, Injectable } from '@angular/core';
import {
  EmployeeByServiceOfferedDto,
  ServiceOfferedDto,
} from '@/app/store-front/book/service-offered/service-offered.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferedService {
  private readonly domain: string | undefined = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly servicesOffered: ServiceOfferedDto[] = [
    {
      service_id: 1,
      name: 'power grooming',
      price: 35,
      duration: 100,
      clean_up_time: 60,
    },
    {
      service_id: 2,
      name: 'overgrown lawns',
      price: 30,
      duration: 50,
      clean_up_time: 60,
    },
    {
      service_id: 3,
      name: 'utility cuts',
      price: 840,
      duration: 50,
      clean_up_time: 60,
    },
    {
      service_id: 4,
      name: 'weekly trim and mow',
      price: 100,
      duration: 90,
      clean_up_time: 60,
    },
    {
      service_id: 5,
      name: 'pre-call service',
      price: 30,
      duration: 10,
      clean_up_time: 60,
    },
  ];
  private readonly map = new Map<string, EmployeeByServiceOfferedDto[]>();

  /**
   * Retrieves an Observable that emits an array of {@link ServiceOfferedDto}
   * objects obtained from the backend. This function implements a form of caching
   * by saving the response from the server, thus preventing unnecessary server calls.
   *
   * @returns An Observable that emits an array of {@link ServiceOfferedDto} objects.
   */
  readonly servicesOffered$ =
    this.servicesOffered.length > 0
      ? of(this.servicesOffered)
      : this.http
          .get<
            ServiceOfferedDto[]
          >(`${this.domain}service-offered`, { withCredentials: true })
          .pipe(
            tap((arr) => {
              if (arr.length === 0)
                this.servicesOffered.push({
                  service_id: -1,
                  name: 'no service yes',
                  price: 0,
                  duration: 0,
                  clean_up_time: 0,
                });
              else this.servicesOffered.push(...arr);
            }),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError(e),
            ),
          );

  readonly employeesByService = (service: string) =>
    this.map.has(service)
      ? this.map.get(service)
      : this.http
          .get<
            EmployeeByServiceOfferedDto[]
          >(`${this.domain}service-offered/employees`, { withCredentials: true })
          .pipe(
            tap((arr) => this.map.set(service, arr)),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError(e),
            ),
          );

  constructor() {
    const lorem =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem eaque mollitia officiis repellendus totam, voluptas. Animi beatae culpa dignissimos ducimus, eum nihil obcaecati odit sapiente tenetur veritatis? Asperiores doloribus ea expedita labore praesentium repudiandae soluta tenetur! Adipisci, aspernatur debitis ducimus earum enim ex excepturi facilis fuga itaque maiores odit perspiciatis provident quaerat quia saepe, sed soluta sunt ut, voluptate?';
    const lebron = './assets/images/lebron.jpg';
    const ketut = './assets/images/lebron.jpg';
    const chicken = './assets/images/chicken.jpg';
    const tony = './assets/images/tony-james.jpg';
    this.map.set('power grooming', [
      {
        name: 'Ketut Subiyant',
        email: 'boom@email.com',
        picture: ketut,
        bio: lorem,
      },
      {
        name: 'benjamin',
        email: 'benjamin@email.com',
        picture: lebron,
        bio: lorem,
      },
    ]);
    this.map.set('overgrown lawns', [
      {
        name: 'ashley',
        email: 'ashley@email.com',
        picture: tony,
        bio: lorem,
      },
    ]);
    this.map.set('utility cuts', [
      {
        name: 'fred',
        email: 'fred@email.com',
        picture: lebron,
        bio: lorem,
      },
      {
        name: 'letitia',
        email: 'letitia@email.com',
        picture: chicken,
        bio: lorem,
      },
    ]);
    this.map.set('weekly trim and mow', [
      {
        name: 'Lebron James',
        email: 'franklyn@email.com',
        picture: lebron,
        bio: lorem,
      },
      {
        name: 'cousins',
        email: 'cousins@email.com',
        picture: lebron,
        bio: lorem,
      },
    ]);
  }
}
