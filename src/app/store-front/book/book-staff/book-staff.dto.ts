export interface StaffDto {
  name: string;
  email: string;
  picture: string;
  bio: string;
}

export const DUMMY_STAFFS = (map: Map<string, StaffDto[]>) => {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea impedit maxime officiis rem unde. Aperiam asperiores dolor expedita explicabo illo maiores nobis quasi sit suscipit vitae. Nemo nesciunt quos saepe!';
  const lebron = './assets/images/staffs/lebron.jpg';
  const ketut = './assets/images/staffs/ketut-subiyanto.jpg';
  const chicken = './assets/images/staffs/chicken.jpg';
  const tony = './assets/images/staffs/tony-james.jpg';
  const engin = './assets/images/staffs/engin-akyurt.jpg';
  map.set('power grooming', [
    {
      name: 'Ketut Subiyant',
      email: 'boom@email.com',
      picture: ketut,
      bio: lorem,
    },
    {
      name: 'Tony',
      email: 'tony-benjamin@email.com',
      picture: tony,
      bio: lorem,
    },
    {
      name: 'benjamin',
      email: 'benjamin@email.com',
      picture: engin,
      bio: lorem,
    },
    {
      name: 'phil',
      email: 'phil-benjamin@email.com',
      picture: chicken,
      bio: lorem,
    },
  ]);
  map.set('overgrown lawns', [
    {
      name: 'ashley',
      email: 'ashley@email.com',
      picture: tony,
      bio: lorem,
    },
  ]);
  map.set('utility cuts', [
    {
      name: 'fred',
      email: 'fred@email.com',
      picture: engin,
      bio: lorem,
    },
    {
      name: 'letitia',
      email: 'letitia@email.com',
      picture: chicken,
      bio: lorem,
    },
  ]);
  map.set('weekly trim and mow', [
    {
      name: 'Lebron James',
      email: 'franklyn@email.com',
      picture: lebron,
      bio: lorem,
    },
    {
      name: 'cousins',
      email: 'cousins@email.com',
      picture: engin,
      bio: lorem,
    },
  ]);
};
