export const EMPLOYEE_FRONT_DASHBOARD = 'dashboard';
export const EMPLOYEE_FRONT_SCHEDULE = 'schedule';
export const EMPLOYEE_FRONT_APPOINTMENT = 'appointment';
export const EMPLOYEE_FRONT_SERVICE = 'service-offered';
export const EMPLOYEE_FRONT_PROFILE = 'profile';

export enum ConfirmationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface ServiceName {
  name: string;
}

export interface AppointmentResponse {
  appointment_id: number;
  customer_name: string;
  customer_email: string;
  detail: string;
  address: string;
  phone: string;
  image: string;
  status: ConfirmationStatus;
  created_at: Date;
  scheduled_for: Date;
  expire_at: Date;
  services: ServiceName[];
}

export interface AppointmentDeconstruct {
  id: number;
  status: string;
  service: string;
  client: string;
  timeslot: string;
  action: string;
}

export const AppointmentResponseMapper = (obj: AppointmentResponse) => {
  return {
    appointment_id: obj.appointment_id,
    customer_name: obj.customer_name,
    customer_email: obj.customer_email,
    detail: obj.detail,
    address: obj.address,
    phone: obj.phone,
    image: obj.image,
    status: obj.status,
    created_at: new Date(obj.created_at),
    scheduled_for: new Date(obj.scheduled_for),
    expire_at: new Date(obj.expire_at),
    services: obj.services,
  } as AppointmentResponse;
};

export const dummyAppointments = (num: number) => {
  const array = [] as AppointmentResponse[];
  const today = new Date();
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab deserunt ea esse iste maxime nihil, pariatur provident recusandae! Commodi dignissimos dolorem exercitationem hic minima odio officiis repudiandae! Accusantium amet assumenda at commodi cum cumque deserunt doloribus eligendi in iusto neque, non officia, officiis quaerat quis repudiandae totam? Accusamus, alias aliquid amet blanditiis consectetur deleniti dolore facere labore minus officiis optio perferendis porro possimus quam quis quisquam reprehenderit rerum sequi sint tempora. Ad consectetur distinctio doloribus fugiat inventore non numquam porro voluptates. Beatae cupiditate dolores doloribus, explicabo hic illo laudantium numquam quaerat quos tenetur? Est excepturi id laboriosam quidem saepe totam.';
  const address =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam architecto debitis eligendi eveniet id qui quia quos reprehenderit vero.';

  for (let i = 0; i < num; i++) {
    array.push({
      appointment_id: i + 1,
      customer_name: `customer-name-${i + 1}`,
      customer_email: `customer-email-${i + 1}`,
      detail: lorem,
      address: address,
      phone: '0000000000',
      image: '',
      status:
        i % 2 === 0 ? ConfirmationStatus.CONFIRMED : ConfirmationStatus.PENDING,
      created_at: today,
      scheduled_for: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i,
      ),
      expire_at: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i,
      ),
      services: [
        { name: 'landscape' },
        { name: 'mowing' },
        { name: 'grass cutting' },
      ] as ServiceName[],
    });
  }
  return array;
};
