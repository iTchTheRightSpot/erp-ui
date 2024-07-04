import { Injectable } from '@angular/core';
import { EmployeeAppointmentService } from '@/app/employee-front/employee-appointment/employee-appointment.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService extends EmployeeAppointmentService {}
