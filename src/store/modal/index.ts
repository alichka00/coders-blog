import { createSlice } from "@reduxjs/toolkit";

interface I_Modal {
  modal: boolean;
}

const initialState: I_Modal = {
  modal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
