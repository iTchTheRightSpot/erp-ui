export const STORE_FRONT_HOME = '';
export const EMPLOYEE_FRONT_HOME = 'employee';

/**
 * Converts date time to hrs and mins
 * */
export const toHrMins = (time: Date) =>
  new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  OWNER = 'OWNER',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}

export interface ActiveUser {
  principal: string;
  role: Role;
}
