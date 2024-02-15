import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Doctor } from '../../pages/model/doctorModel';
import api from '../services/api';

const initialState: Doctor = {
  listApproveAppointments: [],
  listPendingAppointments: [],
};

export const getListPendingAppointmentAsync = createAsyncThunk(
  'doctor/getListPendingAppointment',
  async () => {
    const response = await api.getListPendingAppointment();
    return response.data;
  }
);
export const doctorSlice = createSlice({
  name: 'DoctorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getListPendingAppointmentAsync.fulfilled,
      (state, action) => {
        state.listPendingAppointments = action?.payload?.data;
      }
    );
  },
});

const doctorReducer = doctorSlice.reducer;

export default doctorReducer;
