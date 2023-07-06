import { createSlice } from '@reduxjs/toolkit'

interface I_InitialState {
  isCollapsed: boolean
}

const initialState: I_InitialState = {
  isCollapsed: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebarCollapse(state) {
      state.isCollapsed = !state.isCollapsed
    },
  },
})

export const { toggleSidebarCollapse } = sidebarSlice.actions
