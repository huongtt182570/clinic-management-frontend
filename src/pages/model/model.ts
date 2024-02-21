export interface ILogin {
  phone: string;
  password: string;
}
export interface IRegister {
  phone: string;
  password: string;
  confirmPassword: string;
  fullname: string;
}
export interface IGetList {
  page: number;
  pageSize: number;
}
export interface IAddDoctor {
  phone: string;
  fullname: string;
  email: string;
  birthday: string;
  address: string;
  speciality: string;
  degree: string;
  experience: string;
}

export interface IUpdateDoctor {
  id: number;
  speciality: string;
  degree: string;
  experience: string;
}

export interface IService {
  id?: number;
  name: string;
  description: string;
  price: number;
  doctors?: any[];
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IBookAppointment {
  startTime: string;
  doctorId: number;
  serviceId: number;
}

export interface IAddRelationship {
  serviceId: number;
  doctorId: number;
}

export interface IReasonCancel {
  id: number;
  reason: string;
}

export interface IChangeStatus {
  id: number;
  reason?: string;
  status: string;
}

export interface IUpdateHistory {
  patientId: number;
  symptons: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  admissionDate: string;
  dischargeDate: string;
}
