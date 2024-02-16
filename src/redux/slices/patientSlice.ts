import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../components/common/function';
import { IBookAppointment, IGetList } from '../../pages/model/model';
import { Patient } from '../../pages/model/patientModel';
import api from '../services/api';

const initialState: Patient = {
  listAppointment: [],
  listService: [],
  listDoctor: [],
};

export const getListAppointmentAsync = createAsyncThunk(
  'Patient/getListPatient',
  async (body: IGetList) => {
    const response = await api.getListAppointment(body);
    return response.data;
  }
);
export const getListServiceAsync = createAsyncThunk(
  'Patient/getListService',
  async () => {
    const response = await api.getListService();
    return response.data;
  }
);

export const getListDoctorAsync = createAsyncThunk(
  'Patient/getListDoctor',
  async (body: IGetList) => {
    const response = await api.getListDoctorPatient(body);
    return response.data;
  }
);

export const bookeAppointmentAsync = createAsyncThunk(
  'Patient/bookAppointment',
  async (body: IBookAppointment) => {
    const response = await api.bookeAppointment(body);
    return response.data;
  }
);

export const patientSlice = createSlice({
  name: 'PatientSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListAppointmentAsync.fulfilled, (state, action) => {
        const appointments = action?.payload?.data?.map((item) => ({
          id: item.id,
          time: formatDate(item.startTime),
          status: item.status,
          doctor: item?.doctor?.user?.fullname,
          service: item?.service?.name,
        }));
        state.listAppointment = appointments;
      })
      .addCase(getListServiceAsync.fulfilled, (state, action) => {
        state.listService = action?.payload?.data;
      })
      .addCase(getListDoctorAsync.fulfilled, (state, action) => {
        const doctors = action?.payload?.data?.map((item) => ({
          ...item,
          speciality: item.doctor.speciality,
          degree: item.doctor.degree,
          experience: item.doctor.experience,
          birthday: formatDate(item.birthday),
        }));
        state.listDoctor = doctors;
      });
  },
});

const patientReducer = patientSlice.reducer;

export default patientReducer;
