import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { Page, Role } from '@/app/app.util';
import { of } from 'rxjs';

export const EMPLOYEE_ALL_USERS_ROUTE = '';

export const dummyUsers$ = () => {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea impedit maxime officiis rem unde. Aperiam asperiores dolor expedita explicabo illo maiores nobis quasi sit suscipit vitae. Nemo nesciunt quos saepe!';

  const users: UserDto[] = [
    {
      user_id: '0',
      name: 'Bonnie Green',
      email: 'boom@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
      bio: lorem,
      display_name: 'Bonnie',
      roles: [Role.OWNER, Role.DEVELOPER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '1',
      name: 'Helene Engels',
      email: 'tony-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png',
      bio: lorem,
      display_name: 'Helene',
      roles: [Role.EMPLOYEE],
    },
    {
      user_id: '2',
      name: 'Jese Leos',
      email: 'benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
      bio: lorem,
      display_name: 'Jese',
      roles: [Role.OWNER, Role.EMPLOYEE],
    },
    {
      user_id: '3',
      name: 'Joseph Mcfall',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png',
      bio: lorem,
      display_name: 'Joseph',
      roles: [Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '4',
      name: 'Lana Byrd',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png',
      bio: lorem,
      display_name: 'Lana',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '5',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '50',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '200',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '6',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '7',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '8',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '9',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '10',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '11',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '12',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '13',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '14',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '15',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '16',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '17',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '170',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '18',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '19',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '20',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '21',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '22',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '23',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '24',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '25',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '26',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '27',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
  ];

  return of<Page<UserDto>>({
    page: 0,
    size: 10,
    total_pages: users.length,
    total_elements: users.length,
    number_of_elements: users.length,
    has_previous_page: false,
    has_next_page: false,
    data: users,
    is_empty: false,
  });
};
