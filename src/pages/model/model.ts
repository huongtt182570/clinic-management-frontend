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
