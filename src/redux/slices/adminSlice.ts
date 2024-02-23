import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../components/common/function';
import { Admin } from '../../pages/model/adminModel';
import {
  IAddDoctor,
  IAddRelationship,
  IGetList,
  IService,
  IUpdateDoctor,
} from '../../pages/model/model';
import api from '../services/api';

const initialState: Admin = {
  listDoctor: [],
  listPatient: [],
  listService: [],
  listAppointment: [],
  listHistory: [],
};
export const getListDoctorAdmin = createAsyncThunk(
  'admin/getListDoctor',
  async (body: IGetList) => {
    const response = await api.getListDoctor(body);
    return response.data;
  }
);
export const getListPatientAdmin = createAsyncThunk(
  'admin/getListPatient',
  async (body: IGetList) => {
    const response = await api.getListPatient(body);
    return response.data;
  }
);
export const getListServiceAsync = createAsyncThunk(
  'admin/getListService',
  async () => {
    const response = await api.getListService();
    return response.data;
  }
);
export const addServiceAsync = createAsyncThunk(
  'admin/addService',
  async (body: IService) => {
    const response = await api.addService(body);
    return response.data;
  }
);
export const editServiceAsync = createAsyncThunk(
  'admin/editService',
  async (body: IService) => {
    const response = await api.editService(body);
    return response.data;
  }
);
export const deleteServiceAsync = createAsyncThunk(
  'admin/deleteService',
  async (id: number) => {
    const response = await api.deleteService(id);
    return response.data;
  }
);

export const addDoctorAsync = createAsyncThunk(
  'admin/addDoctor',
  async (body: IAddDoctor) => {
    const response = await api.addDoctor(body);
    return response.data;
  }
);
export const updateDoctorAsync = createAsyncThunk(
  'admin/updateDoctor',
  async (body: IUpdateDoctor) => {
    const response = await api.updateDoctor(body);
    return response.data;
  }
);

export const deleteDoctorAsync = createAsyncThunk(
  'admin/deleteDoctor',
  async (id: number) => {
    const response = await api.deleteDoctor(id);
    return response.data;
  }
);

export const addRelationshipAsync = createAsyncThunk(
  'admin/deleteDoctor',
  async (body: IAddRelationship) => {
    const response = await api.addRelationship(body);
    return response.data;
  }
);

export const getAllAppointmentAsync = createAsyncThunk(
  'admin/getAllAppoint',
  async (body: IGetList) => {
    const response = await api.getAllAppointment(body);
    return response.data;
  }
);
export const getAllHistoryAsync = createAsyncThunk(
  'admin/getAllHistory',
  async (body: IGetList) => {
    const response = await api.getAllHistory(body);
    return response.data;
  }
);

export const adminSlice = createSlice({
  name: 'AdminSlice',
  initialState,
  reducers: {
    resetListDoctorAdmin: (state) => {
      state.listDoctor = [];
    },
    resetListPatientAdmin: (state) => {
      state.listPatient = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getListDoctorAdmin.fulfilled, (state, action) => {
        const doctors = action?.payload?.data?.map((item) => ({
          ...item,
          id: item?.doctor.id,
          speciality: item.doctor.speciality,
          degree: item.doctor.degree,
          experience: item.doctor.experience,
          birthday: formatDate(item.birthday),
        }));
        state.listDoctor = doctors;
      })
      .addCase(getListPatientAdmin.fulfilled, (state, action) => {
        const patients = action?.payload?.data?.map((item) => ({
          ...item,
          birthday: formatDate(item.birthday),
        }));
        state.listPatient = patients;
      })
      .addCase(getListServiceAsync.fulfilled, (state, action) => {
        state.listService = action?.payload?.data;
      })
      .addCase(getAllAppointmentAsync.fulfilled, (state, action) => {
        const appointments = action?.payload?.data?.map((item) => ({
          id: item.id,
          patientName: item.patient.fullname,
          doctorName: item.doctor.user.fullname,
          doctorId: item.doctorId,
          patientPhone: item.patient.phone,
          status: item.status,
          service: item.service.name,
          reasonCanceled: item.reasonCanceled || '',
          startTime: formatDate(item.startTime),
        }));
        state.listAppointment = appointments || [];
      })
      .addCase(getAllHistoryAsync.fulfilled, (state, action) => {
        const history = action?.payload?.data?.map((item) => ({
          ...item,
          doctor: item.doctor.user.fullname,
          admissionDate: formatDate(item.admissionDate),
        }));
        state.listHistory = history || [];
      });
  },
});
const adminReducer = adminSlice.reducer;
export const { resetListDoctorAdmin, resetListPatientAdmin } =
  adminSlice.actions;
export default adminReducer;
