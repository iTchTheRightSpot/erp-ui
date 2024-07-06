export const STORE_FRONT_HOME = '';
export const EMPLOYEE_FRONT_HOME = 'employee';
export const UNAUTHORIZED = 'unauthorized';

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

export const EPOCH_SECONDS_TO_DATE = (secs: number) => new Date(secs * 1000);

export const DATES_TO_DISABLE = (dates: Date[]) =>
  dates && dates.length > 0
    ? [
        ...Array(
          new Date(dates[0].getFullYear(), dates[0].getMonth(), 0).getDate()
        ).keys()
      ]
        .map((i) => new Date(dates[0].getFullYear(), dates[0].getMonth(), i))
        .filter(
          (d) =>
            !dates.some(
              (date) =>
                d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear()
            )
        )
    : [];

/**
 * Converts date time to hrs and mins
 * */
export const toHrMins = (time: Date) =>
  new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  OWNER = 'OWNER',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER'
}

export const keyOfRole = (role: string | null): Role | null => {
  const roleMap: { [key: string]: Role } = {
    [Role.EMPLOYEE]: Role.EMPLOYEE,
    [Role.OWNER]: Role.OWNER,
    [Role.DEVELOPER]: Role.DEVELOPER,
    [Role.USER]: Role.USER
  };

  return role ? roleMap[role] || null : null;
};

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
