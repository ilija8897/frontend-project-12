import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeChannel: '1',
    modals: {
      isOpen: false,
      modalType: undefined,
    },
  },
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    },
    toggleModal: (state, action) => {
      state.modals = action.payload
    },
  },
  selectors: {
    getActiveChannel: state => state.activeChannel,
    modalSelector: state => state.modals,
  },
})

export const { setActiveChannel, toggleModal } = appSlice.actions
export const { getActiveChannel, modalSelector } = appSlice.selectors
