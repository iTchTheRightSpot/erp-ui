export interface ServiceOfferedDto {
  service_id: number;
  name: string;
  price: number;
  duration: number;
  clean_up_time: number;
}

export interface EmployeeByServiceOfferedDto {
  name: string;
  email: string;
  picture: string;
  bio: string;
}
