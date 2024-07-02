export const EMPLOYEE_UPDATE_PROFILE_ROUTE = 'general-information';
export const EMPLOYEE_GENERAL_SERVICE_ROUTE = 'work-related';

export interface UpdateProfileDto {
  user_id: string;
  name: string;
  display_name: string;
  bio: string;
}
