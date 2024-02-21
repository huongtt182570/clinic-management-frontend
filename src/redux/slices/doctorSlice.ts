import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../components/common/function';
import { Status } from '../../pages/enum';
import { Doctor } from '../../pages/model/doctorModel';
import {
  IChangeStatus,
  IGetList,
  IUpdateHistory,
} from '../../pages/model/model';
import api from '../services/api';

const initialState: Doctor = {
  listApproveAppointments: [],
  listPendingAppointments: [],
  listHistory: [],
};

export const getListAppointmentAsync = createAsyncThunk(
  'doctor/getListPendingAppointment',
  async (body: IGetList) => {
    const response = await api.getListPendingAppointment(body);
    return response.data;
  }
);
export const changeAppointmentAsync = createAsyncThunk(
  'doctor/changeAppointment',
  async (body: IChangeStatus) => {
    const response = await api.changeAppointment(body);
    return response.data;
  }
);

export const updateHistoryAsync = createAsyncThunk(
  'doctor/updateHistory',
  async (body: IUpdateHistory) => {
    const response = await api.updateHistory(body);
    return response.data;
  }
);
export const getHistoryDoctorAsync = createAsyncThunk(
  'doctor/getHistoryDoctor',
  async (body: IGetList) => {
    const response = await api.getHistoryDoctor(body);
    return response.data;
  }
);

export const doctorSlice = createSlice({
  name: 'DoctorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListAppointmentAsync.fulfilled, (state, action) => {
        const pendingAppointments = action?.payload?.data
          ?.filter((item) => item.status === Status.pending)
          ?.map((item) => ({
            ...item,
            patientName: item.patient.fullname,
            phoneNumber: item.patient.phone,
            birthday: formatDate(item.patient.birthday),
            gender: item.patient.gender,
            service: item.service.name,
            admissionDate: formatDate(item.startTime),
          }));
        const approveAppointments = action?.payload?.data
          ?.filter(
            (item) =>
              item.status !== Status.pending &&
              item.status !== Status.cancelByPatient &&
              item.status !== Status.cancelByDoctor
          )
          ?.map((item) => ({
            ...item,
            patientName: item.patient.fullname,
            phoneNumber: item.patient.phone,
            birthday: formatDate(item.patient.birthday),
            gender: item.patient.gender,
            service: item.service.name,
            admissionDate: formatDate(item.startTime),
          }));
        state.listPendingAppointments = pendingAppointments;
        state.listApproveAppointments = approveAppointments;
      })
      .addCase(getHistoryDoctorAsync.fulfilled, (state, action) => {
        const history = action?.payload?.data?.map((item) => ({
          ...item,
          doctor: item.doctor.user.fullname,
          admissionDate: formatDate(item.admissionDate),
        }));
        state.listHistory = history || [];
      });
  },
});

const doctorReducer = doctorSlice.reducer;

export default doctorReducer;
