export const EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE = '';
export const EMPLOYEE_NEW_SERVICE_OFFERED_ROUTE = 'new';

export interface ServiceOfferedDto {
  service_id: string;
  service_name: string;
  price: number;
  is_visible: boolean;
  duration: number;
  clean_up_time: number;
}

export const dummyServices = (num: number) => {
  const arr: ServiceOfferedDto[] = [];

  for (let i = 0; i < num; i++) {
    arr.push({
      service_id: `${i + 1}`,
      service_name: `service-name-${i + 1}`,
      price: (i + 1) * 100,
      is_visible: i % 2 === 0,
      duration: (i + 1) * 241,
      clean_up_time: (i + 1) * 21,
    });
  }
  return arr;
};
