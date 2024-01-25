import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { LoginState } from '../../pages/Login/Login';
import { COMMON } from '../../constants/common';
import { API } from '../services/axios';
import { User } from '../slices/auth.slide';

export interface UpdateUserInfo {
  email?: string;
  phone?: string;
  bio?: string;
  gen?: number;
  birthday?: string;
  hometown?: string;
  address?: string;
  school?: string;
  student_id?: string;
  class?: string;
  cccd?: string;
}

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data: res },
      } = await API.get('auth/me');
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk<User, LoginState>(
  '',
  async (data: LoginState, { rejectWithValue }) => {
    try {
      const {
        data: { data: res },
      } = await API.post('https://clinic-management-api.up.railway.app/api/v1/auth/signin', data);
      localStorage.setItem(COMMON.ACCESS_TOKEN, res.accessToken);
      localStorage.setItem(COMMON.REFRESH_TOKEN, res.refreshToken);
      return res.user;
    } catch (error: any) {
      message.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk<User, UpdateUserInfo>(
  'auth/updateUser',
  async (formData: UpdateUserInfo, { rejectWithValue }) => {
    try {
      const {
        data: { data: res },
      } = await API.put('user/profile', formData);
      message.success('Cập nhật thông tin thành công');
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk<User, FormData>(
  'auth/updateAvatar',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const {
        data: { data: res },
      } = await API.put('user/avatar', formData);
      message.success('Cập nhật ảnh đại diện thành công');
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
