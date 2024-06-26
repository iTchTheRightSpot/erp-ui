import { ConfirmationStatus } from '@/app/employee-front/employee-front.util';

export interface UpdateAppointmentStatusDto {
  appointment_id: number;
  status: ConfirmationStatus;
  employee_email: string;
}
