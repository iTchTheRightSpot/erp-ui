import { Role } from '@/app/app.util';

export const EMPLOYEE_ALL_USERS_ROUTE = '';

export interface User {
  name: string;
  display_name: string;
  image: string;
  email: string;
  bio: string;
  role: Role;
}
