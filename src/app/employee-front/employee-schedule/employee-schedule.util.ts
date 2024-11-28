export const EMPLOYEE_SCHEDULE_ALL_ROUTE = '';
export const EMPLOYEE_SCHEDULE_CREATE_ROUTE = 'new';

export interface DesiredTimeDto {
  is_visible: boolean;
  start: string;
  duration: number;
}

export interface ShiftDto {
  employee_id: string;
  times: DesiredTimeDto[];
}
