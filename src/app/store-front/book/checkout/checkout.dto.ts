export interface CheckoutDto {
  services: { service_name: string }[];
  name: string;
  employee_id: string;
  start: number;
  email: string;
  phone: string;
  description: string;
  address: string;
}
