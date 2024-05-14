export interface BookServiceOfferedDto {
  name: string;
  price: number;
  duration: number;
}

export const development: BookServiceOfferedDto[] = [
  {
    name: 'power grooming',
    price: 35,
    duration: 100,
  },
  {
    name: 'overgrown lawns',
    price: 30,
    duration: 50,
  },
  {
    name: 'utility cuts',
    price: 840,
    duration: 50,
  },
  {
    name: 'weekly trim and mow',
    price: 100,
    duration: 90,
  },
  {
    name: 'pre-call service',
    price: 30,
    duration: 10,
  },
];
