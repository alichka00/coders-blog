import { createSlice } from "@reduxjs/toolkit";
import { login, checkAuth } from "../thunks";
import { PayloadAction } from "@reduxjs/toolkit";
import { I_AuthResponse } from "models/AuthResponse";

interface I_AuthState {
  isAuth: boolean;
  isLoading: boolean;
  email: string;
}

export const initialState: I_AuthState = {
  isAuth: false,
  isLoading: false,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isAuth = false;
      state.email = "";
    },
    getAdmin(state, action: PayloadAction<I_AuthResponse>) {
      state.email = action.payload.admin.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isAuth = false;
      state.isLoading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<I_AuthResponse>) => {
        state.isAuth = true;
        state.isLoading = false;
        state.email = action.payload.admin.email;
      }
    );
    builder.addCase(login.rejected, (state) => {
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isAuth = false;
      state.isLoading = true;
    });
    builder.addCase(
      checkAuth.fulfilled,
      (state, action: PayloadAction<I_AuthResponse>) => {
        state.isAuth = true;
        state.isLoading = false;
        state.email = action.payload.admin.email;
      }
    );
    builder.addCase(checkAuth.rejected, (state) => {
      state.isAuth = false;
      state.isLoading = false;
    });
  },
});
export default authSlice.reducer;
export const { logout, getAdmin } = authSlice.actions;
