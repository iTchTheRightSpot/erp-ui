import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ServiceOfferedDto } from '@/app/store-front/book/service-offered/util';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferedService {
  readonly services$ = of<ServiceOfferedDto[]>([
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
  ]);
}
