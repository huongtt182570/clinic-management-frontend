import { IAddDoctor, IGetList, ILogin } from '../../pages/model/model';
import fetchHandler, { API_URL } from './axios';

export const addDoctor = (body?: IAddDoctor) => {
  return fetchHandler.post(`${API_URL}/admin/doctor`, body);
};
export const login = (body: ILogin) => {
  return fetchHandler.post(`${API_URL}/auth/signin`, body);
};
export const register = (body: ILogin) => {
  return fetchHandler.post(`${API_URL}/auth/signup`, body);
};

export const getUserInfo = () => {
  return fetchHandler.get(`${API_URL}/auth/me`);
};
//api admin
export const getListDoctor = (body: IGetList) => {
  return fetchHandler.get(
    `${API_URL}/admin/doctors?page=${body.page}&pageSize=${body.pageSize}`
  );
};
export const getListPatient = (body: IGetList) => {
  return fetchHandler.get(
    `${API_URL}/admin/patients?page=${body.page}&pageSize=${body.pageSize}`
  );
};

export default {
  //   updateDoctor,
  login,
  register,
  getUserInfo,
  getListDoctor,
  addDoctor,
};
