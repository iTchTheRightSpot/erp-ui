import {Page, Role} from '@/app/app.util';
import {Observable, of} from 'rxjs';

export interface StaffDto {
  employee_id: string;
  name: string;
  display_name: string;
  email: string;
  picture: string;
  bio: string;
  role: Role;
}

export const staffs = () => {
  const map = new Map<string, StaffDto[]>();

  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea impedit maxime officiis rem unde. Aperiam asperiores dolor expedita explicabo illo maiores nobis quasi sit suscipit vitae. Nemo nesciunt quos saepe!';
  const engin = './assets/images/staffs/engin-akyurt.jpg';
  map.set('power grooming', [
    {
      employee_id: '1',
      name: 'Ketut Subiyant',
      email: 'boom@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      employee_id: '0',
      name: 'Tony',
      email: 'tony-benjamin@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      employee_id: '2',

      name: 'benjamin',
      email: 'benjamin@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      employee_id: '3',

      name: 'phil',
      email: 'phil-benjamin@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
  ]);
  map.set('overgrown lawns', [
    {
      employee_id: '4',

      name: 'ashley',
      email: 'ashley@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
  ]);
  map.set('utility cuts', [
    {
      employee_id: '5',

      name: 'fred',
      email: 'fred@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      employee_id: '6',

      name: 'letitia',
      email: 'letitia@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
  ]);
  map.set('weekly trim and mow', [
    {
      employee_id: '7',

      name: 'Lebron James',
      email: 'franklyn@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      employee_id: '8',

      name: 'cousins',
      email: 'cousins@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
  ]);

  return map;
};

export const staffs$: Observable<Page<StaffDto>> = of({
  page: 0,
  size: 10,
  total_pages: 1,
  total_elements: 10,
  number_of_elements: 10,
  has_previous_page: false,
  has_next_page: false,
  is_empty: false,
  data: [
    {
      name: 'Jese Leos',
      email: 'Jese Leos',
      picture: '/assets/images/staffs/engin-akyurt.jpg',
      bio: '',
      display_name: '',
      role: Role.OWNER,
    },
    {
      name: 'Frank Leos',
      picture: 'assets/images/staffs/engin-akyurt.jpg',
      email: 'Frank Leos',
      display_name: '',
      bio: '',
      role: Role.OWNER,
    },
    {
      name: 'Sam Leos',
      picture: '/assets/images/staffs/engin-akyurt.jpg',
      email: 'Sam Leos',
      display_name: '',
      bio: '',
      role: Role.OWNER,
    },
    {
      name: 'Ben Leos',
      picture: '/assets/images/staffs/engin-akyurt.jpg',
      email: 'Ben Leos',
      display_name: '',
      bio: '',
      role: Role.OWNER,
    },
    {
      name: 'Cheese Leos',
      picture: '/assets/images/staffs/engin-akyurt.jpg',
      email: 'Cheese Leos',
      display_name: '',
      bio: '',
      role: Role.OWNER,
    },
  ]
} as Page<StaffDto>);
