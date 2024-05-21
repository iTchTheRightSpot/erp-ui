export const EMPLOYEE_FRONT_DASHBOARD = 'dashboard';
export const EMPLOYEE_FRONT_SCHEDULE = 'schedule';
export const EMPLOYEE_FRONT_APPOINTMENT = 'appointment';
export const EMPLOYEE_FRONT_SERVICE = 'service';

export enum ConfirmationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface ServiceName {
  name: string;
}

export interface AppointmentResponse {
  appointment_id: number;
  customer_name: string;
  customer_email: string;
  detail: string;
  address: string;
  phone: string;
  image: string;
  status: ConfirmationStatus;
  created_at: Date;
  scheduled_for: Date;
  expire_at: Date;
  services: ServiceName[];
}

export const AppointmentResponseMapper = (obj: AppointmentResponse) => {
  return {
    appointment_id: obj.appointment_id,
    customer_name: obj.customer_name,
    customer_email: obj.customer_email,
    detail: obj.detail,
    address: obj.address,
    phone: obj.phone,
    image: obj.image,
    status: obj.status,
    created_at: new Date(obj.created_at),
    scheduled_for: new Date(obj.scheduled_for),
    expire_at: new Date(obj.expire_at),
    services: obj.services,
  } as AppointmentResponse;
};
