export const STORE_FRONT_HOME = '';
export const EMPLOYEE_FRONT_HOME = 'employee';
export const UNAUTHORIZED = 'unauthorized';

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
  user_id: string;
  roles: Role[];
}

/**
 * Converts seconds to string format.
 * */
export const formatSeconds = (seconds: number) => {
  const hr = Math.floor(seconds / 3600);

  // calculated from the remainder after extracting hours, divided by 60 (number of seconds in a minute).
  const min = Math.floor((seconds % 3600) / 60);

  // remainder after extracting both hours and minutes.
  const secs = seconds % 60;

  return `${hrImpl(hr)} ${minImpl(min)} ${secImpl(secs)}`;
};

const hrImpl = (utcHours: number) => {
  if (utcHours < 1) {
    return '';
  } else if (utcHours === 1) {
    return '1 hr ';
  }
  return `${utcHours} hrs `;
};

const minImpl = (utcMins: number) => {
  if (utcMins < 1) {
    return '';
  } else if (utcMins === 1) {
    return '1 min ';
  }
  return `${utcMins} mins `;
};

const secImpl = (seconds: number) => {
  if (seconds < 1) {
    return '';
  } else if (seconds === 1) {
    return '1 sec';
  }
  return `${seconds} secs`;
};

export interface Page<T> {
  page: number;
  size: number;
  total_pages: number;
  total_elements: number;
  number_of_elements: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  data: T[];
  is_empty: boolean;
}
