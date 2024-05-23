import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeFrontService } from '@/app/employee-front/employee-front.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeAppointmentService {
  protected readonly domain = environment.domain;
  protected readonly production = environment.production;
  private readonly http = inject(HttpClient);
  private readonly parentService = inject(EmployeeFrontService);
}
