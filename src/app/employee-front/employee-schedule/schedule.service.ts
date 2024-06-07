import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import {
  DesiredTimeDto,
  ShiftDto,
} from '@/app/employee-front/employee-schedule/employee-schedule.util';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, delay, map, of, startWith } from 'rxjs';
import { ToastService } from '@/app/shared-components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly domain = environment.domain;
  private readonly production = environment.production;

  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  private readonly selectedDateSignal = signal<Date>(new Date());

  readonly selected = this.selectedDateSignal;
  readonly updateSelectedDate = (selected: Date) =>
    this.selectedDateSignal.set(selected);

  readonly createSchedule = (objs: DesiredTimeDto[]) =>
    this.createRequest({ employee_email: '', times: objs }).pipe(
      startWith(true),
    );

  private readonly createRequest = (obj: ShiftDto) =>
    this.production
      ? this.http
          .post<
            HttpResponse<boolean>
          >(`${this.domain}owner/shift`, obj, { withCredentials: true })
          .pipe(
            map(() => false),
            catchError((e: HttpErrorResponse) =>
              this.toastService.messageErrorBool(e),
            ),
          )
      : of(false).pipe(delay(5000));
}
