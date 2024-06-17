export interface BookServiceOfferedDto {
  service_name: string;
  price: number;
  duration: number;
}

export const development: BookServiceOfferedDto[] = [
  {
    service_name: 'power grooming',
    price: 35,
    duration: 100,
  },
  {
    service_name: 'overgrown lawns',
    price: 30,
    duration: 50,
  },
  {
    service_name: 'utility cuts',
    price: 840,
    duration: 50,
  },
  {
    service_name: 'weekly trim and mow',
    price: 100,
    duration: 90,
  },
  {
    service_name: 'pre-call service',
    price: 30,
    duration: 10,
  },
];
