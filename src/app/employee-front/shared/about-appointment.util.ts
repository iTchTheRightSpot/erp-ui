import { ConfirmationStatus } from '@/app/employee-front/employee-front.util';

export interface AppointmentDetail {
  name: string;
  email: string;
  phone: string;
  image: string;
  status: ConfirmationStatus;
  services: string[];
  detail: string;
  address: string;
  created: Date;
  scheduledFor: Date;
  expire: Date;
}

export const dummyDetailBuilder = () => {
  return {
    name: '',
    email: '',
    phone: '',
    image: '',
    status: ConfirmationStatus.CANCELLED,
    services: [] as string[],
    detail: '',
    address: '',
    created: new Date(),
    scheduledFor: new Date(),
    expire: new Date(),
  } as AppointmentDetail;
};
