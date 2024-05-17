import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';
import {
  StaffDto,
  staffs,
} from '@/app/store-front/book/book-staff/book-staff.dto';
import { BookService } from '@/app/store-front/book/book.service';
import { BookServiceOfferedDto } from '@/app/store-front/book/book-service-offered/book-service-offered.dto';

interface Filtering {
  serviceName: '';
  cache: StaffDto[] | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class BookStaffService {
  private readonly domain: string | undefined = environment.domain;
  private readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly bookService = inject(BookService);

  private readonly cache = this.production
    ? new Map<string, StaffDto[]>()
    : staffs();

  readonly employeesByServicesSelected = (services: BookServiceOfferedDto[]) =>
    this.bookService.setServicesOfferedSelected(services);

  readonly staffs$ = () => {
    const servicesOffered = this.bookService.bookingInfo().servicesOffered;
    const services = servicesOffered ? servicesOffered : [];

    const set = new Set<string>();
    const res: StaffDto[] = [];
    let i = 0;

    while (i < services.length) {
      if (this.cache.has(services[i].name)) {
        const value = this.cache.get(services[i].name);
        if (!set.has(services[i].name) && value) res.push(...value);

        const index = services.indexOf(services[i]);
        services.slice(index);
      }
      i++;
    }

    if (services.length === 0)
      return of<StaffDto[]>(res.filter((staff) => set.has(staff.name)));

    let params = new HttpParams();
    services.forEach(
      (service) =>
        (params = params.append('service_name', service.name.trim())),
    );
    return this.request$(params, services, res, set);
  };

  private readonly request$ = (
    params: HttpParams,
    services: BookServiceOfferedDto[],
    res: StaffDto[],
    set: Set<string>,
  ) =>
    this.http
      .get<
        StaffDto[]
      >(`${this.domain}service-offered/staffs`, { withCredentials: true, params: params })
      .pipe(
        tap((staffs) => {
          const img = './assets/images/staffs/engin-akyurt.jpg';
          staffs.forEach(
            (obj) =>
              (obj.picture = obj.picture.length === 0 ? img : obj.picture),
          );
          services.forEach((service) => this.cache.set(service.name, staffs));
        }),
        map((staffs: StaffDto[]) => {
          if (res.length < 1) return staffs;

          staffs.forEach((staff) => {
            if (!set.has(staff.name)) res.push(staff);
          });

          return res;
        }),
        catchError((e: HttpErrorResponse) =>
          this.toastService.messageHandleIterateError<StaffDto>(e),
        ),
      );
}
