import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '@/app/global-components/toast/toast.service';
import {
  DUMMY_STAFFS,
  StaffDto,
} from '@/app/store-front/book/book-staff/book-staff.dto';

@Injectable({
  providedIn: 'root',
})
export class BookStaffService {
  private readonly domain: string | undefined = environment.domain;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly map = new Map<string, StaffDto[]>();
  private readonly sig = signal<string>('power grooming');

  constructor() {
    DUMMY_STAFFS(this.map);
  }

  readonly employeesByService = (service: string) => this.sig.set(service);

  readonly staffs$ = () =>
    this.map.has(this.sig()) && this.map.get(this.sig())
      ? of(this.map.get(this.sig()))
      : this.http
          .get<
            StaffDto[]
          >(`${this.domain}service-offered/employees`, { withCredentials: true })
          .pipe(
            tap((arr) => this.map.set(this.sig(), arr)),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageHandleIterateError<StaffDto>(e),
            ),
          );
}
