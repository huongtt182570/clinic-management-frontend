import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Admin } from '../../pages/model/adminModel';
import { IGetList } from '../../pages/model/model';
import api from '../services/api';

const initialState: Admin = {
  listDoctor: [],
  listPatient: [],
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
    const response = await api.getListDoctor(body);
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
        state.listDoctor = action?.payload?.data;
      })
      .addCase(getListPatientAdmin.fulfilled, (state, action) => {
        state.listPatient = action?.payload?.data;
      });
  },
});
const adminReducer = adminSlice.reducer;
export const { resetListDoctorAdmin, resetListPatientAdmin } =
  adminSlice.actions;
export default adminReducer;
