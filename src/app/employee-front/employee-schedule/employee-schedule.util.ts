export const EMPLOYEE_SCHEDULE_ALL_ROUTE = '';
export const EMPLOYEE_SCHEDULE_CREATE_ROUTE = 'new';

export interface DesiredTimeDto {
  start: Date;
  duration: number;
}

export interface ShiftDto {
  employee_email: string;
  times: DesiredTimeDto[];
}
