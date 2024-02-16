import { IService } from './model';

export interface IChangeInfo {
  phone: string;
  fullname: string;
  email: string;
  address: string;
  birthday: string;
}
export interface IAppointment {
  id: number;
  time: string;
  status: string;
  doctor: string;
  service: string;
}
export interface Patient {
  listAppointment: IAppointment[];
  listService: IService[];
  listDoctor: any[];
}
