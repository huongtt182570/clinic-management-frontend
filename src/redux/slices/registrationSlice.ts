import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRegister } from '../../pages/model/model';
import api from '../services/api';

export const handleRegisterAsync = createAsyncThunk(
  'auth/Login',
  async (body: IRegister) => {
    const response = await api.register(body);
    return response.data;
  }
);
