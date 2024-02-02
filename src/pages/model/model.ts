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
