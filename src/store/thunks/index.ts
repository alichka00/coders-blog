import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { I_LoginData } from "models/loginData";
import { api } from "services/AuthService";
import { URL } from "services/AuthService";

export const login = createAsyncThunk(
  "/auth/signin",
  async (data: I_LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/signin`, data, {
        withCredentials: true,
      });
      if (response.data.data.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.data.accessToken)
        );
      }
      if (response.data.data.refreshToken) {
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.data.refreshToken)
        );
      }
      console.log(response.data.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/check`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
