import { Role } from '@/app/app.util';

export interface UserDto {
  user_id: string;
  name: string;
  display_name: string;
  email: string;
  image_key: string;
  bio: string;
  roles: Role[];
}

export const staffs = () => {
  const map = new Map<string, UserDto[]>();

  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea impedit maxime officiis rem unde. Aperiam asperiores dolor expedita explicabo illo maiores nobis quasi sit suscipit vitae. Nemo nesciunt quos saepe!';
  const engin = './assets/images/staffs/engin-akyurt.jpg';
  map.set('power grooming', [
    {
      user_id: '1',
      name: 'Ketut Subiyant',
      email: 'boom@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    },
    {
      user_id: '0',
      name: 'Tony',
      email: 'tony-benjamin@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    },
    {
      user_id: '2',

      name: 'benjamin',
      email: 'benjamin@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    },
    {
      user_id: '3',

      name: 'phil',
      email: 'phil-benjamin@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    }
  ]);
  map.set('overgrown lawns', [
    {
      user_id: '4',

      name: 'ashley',
      email: 'ashley@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    }
  ]);
  map.set('utility cuts', [
    {
      user_id: '5',

      name: 'fred',
      email: 'fred@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    },
    {
      user_id: '6',

      name: 'gang',
      email: 'gang@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    }
  ]);
  map.set('weekly trim and mow', [
    {
      user_id: '7',
      name: 'Lebron James',
      email: 'franklyn@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    },
    {
      user_id: '8',

      name: 'cousins',
      email: 'cousins@email.com',
      image_key: engin,
      bio: lorem,
      display_name: '',
      roles: [Role.OWNER]
    }
  ]);

  return map;
};
