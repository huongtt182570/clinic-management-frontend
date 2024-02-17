import {
  IAddDoctor,
  IAddRelationship,
  IBookAppointment,
  IChangePassword,
  IGetList,
  ILogin,
  IService,
  IUpdateDoctor,
} from '../../pages/model/model';
import { IChangeInfo } from '../../pages/model/patientModel';
import fetchHandler, { API_URL } from './axios';

export const addDoctor = (body?: IAddDoctor) => {
  return fetchHandler.post(`${API_URL}/admin/doctor`, body);
};

export const updateDoctor = (body?: IUpdateDoctor) => {
  return fetchHandler.put(`${API_URL}/admin/doctor/${body?.id}`, body);
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
export const changeUserInfo = (body: IChangeInfo) => {
  return fetchHandler.put(`${API_URL}/user`, body);
};

export const changePassword = (body: IChangePassword) => {
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

export const deleteDoctor = (id: number) => {
  return fetchHandler.delete(`${API_URL}/admin/doctor/${id}`);
};

export const deleteService = (id: number) => {
  return fetchHandler.delete(`${API_URL}/medical-service/${id}`);
};

export const addRelationship = (body: IAddRelationship) => {
  return fetchHandler.post(`${API_URL}/medical-service/doctor-service`, body);
};

//api doctor
export const getListPendingAppointment = () => {
  return fetchHandler.get(`${API_URL}/doctor/appointments`);
};

//api patient
export const getListAppointment = (body: IGetList) => {
  return fetchHandler.get(
    `${API_URL}/patient/appointments?page=${body.page}&pageSize=${body.pageSize}`
  );
};

export const getListDoctorPatient = (body: IGetList) => {
  return fetchHandler.get(
    `${API_URL}/patient/doctors?page=${body.page}&pageSize=${body.pageSize}`
  );
};

export const bookeAppointment = (body: IBookAppointment) => {
  return fetchHandler.post(`${API_URL}/patient/appointment`, body);
};

export const getMedicalHistory = (body: IGetList) => {
  return fetchHandler.get(
    `${API_URL}/patient/medical-histories?page=${body.page}&pageSize=${body.pageSize}`
  );
};

export const cancelAppointmentPatient = (id: number) => {
  return fetchHandler.get(`${API_URL}/patient/appointment/${id}`);
};

export default {
  updateDoctor,
  getMedicalHistory,
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
  changeUserInfo,
  getListAppointment,
  bookeAppointment,
  deleteDoctor,
  getListDoctorPatient,
  cancelAppointmentPatient,
  addRelationship,
};
