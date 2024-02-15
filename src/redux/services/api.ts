import {
  IAddDoctor,
  IGetList,
  ILogin,
  IService,
} from '../../pages/model/model';
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

export const changePassword = (body: any) => {
  return fetchHandler.put(`${API_URL}/user/change-password`, body);
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

export const getListService = () => {
  return fetchHandler.get(`${API_URL}/medical-service`);
};

export const addService = (body: IService) => {
  return fetchHandler.post(`${API_URL}/medical-service`, body);
};

export const editService = (body: IService) => {
  return fetchHandler.put(`${API_URL}/medical-service/${body.id}`, body);
};

export const deleteService = (id: number) => {
  return fetchHandler.delete(`${API_URL}/medical-service/${id}`);
};

//api doctor
export const getListPendingAppointment = () => {
  return fetchHandler.get(`${API_URL}/doctor/appointments`);
};

export default {
  //   updateDoctor,
  login,
  register,
  getUserInfo,
  getListDoctor,
  addDoctor,
  getListPatient,
  getListPendingAppointment,
  getListService,
  addService,
  editService,
  deleteService,
  changePassword,
};
