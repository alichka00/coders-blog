import { createSlice } from '@reduxjs/toolkit'

interface I_InitialState {
  isCollapsed: boolean
  isOpen: boolean
}

const initialState: I_InitialState = {
  isCollapsed: false,
  isOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebarCollapse(state) {
      state.isCollapsed = !state.isCollapsed
    },
    openSidebar: (state) => {
      state.isOpen = true
    },
    closeSidebar: (state) => {
      state.isOpen = false
    },
  },
})

export const { toggleSidebarCollapse, openSidebar, closeSidebar } = sidebarSlice.actions
