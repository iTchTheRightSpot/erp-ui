import { Role } from '@/app/app.util';
import { Observable, of } from 'rxjs';

export interface StaffDto {
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
      name: 'Ketut Subiyant',
      email: 'boom@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      name: 'Tony',
      email: 'tony-benjamin@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
      name: 'benjamin',
      email: 'benjamin@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
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
      name: 'fred',
      email: 'fred@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
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
      name: 'Lebron James',
      email: 'franklyn@email.com',
      picture: engin,
      bio: lorem,
      display_name: '',
      role: Role.OWNER,
    },
    {
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

export const staffs$: Observable<StaffDto[]> = of([
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
]);
