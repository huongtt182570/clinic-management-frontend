import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authState } from '../../pages/model/authModel';
import { IChangePassword, ILogin } from '../../pages/model/model';
import { IChangeInfo } from '../../pages/model/patientModel';
import api from '../services/api';

export const handleLoginAsync = createAsyncThunk(
  'auth/Login',
  async (body: ILogin) => {
    const response = await api.login(body);
    return response.data;
  }
);
const initialState: authState = {
  user: {
    id: 0,
    phone: '',
    fullname: '',
    email: '',
    address: '',
    birthday: '',
    gender: '',
    role: '',
  },
};
export const getUserInfoAsync = createAsyncThunk(
  'auth/getUserInfo',
  async () => {
    const response = await api.getUserInfo();
    return response.data;
  }
);
export const editUserInfoAsync = createAsyncThunk(
  'auth/getUserInfo',
  async (body: IChangeInfo) => {
    const response = await api.changeUserInfo(body);
    return response.data;
  }
);
export const changePasswordAsync = createAsyncThunk(
  'auth/getUserInfo',
  async (body: IChangePassword) => {
    const response = await api.changePassword(body);
    return response.data;
  }
);
export const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(handleLoginAsync.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      });
  },
});

const authReducer = loginSlice.reducer;

export default authReducer;
