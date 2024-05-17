export interface CheckoutDto {
  services: { service_name: string }[];
  name: string;
  employee_email: string;
  start: Date;
  email: string;
  phone: string;
  description: string;
  address: string;
}
