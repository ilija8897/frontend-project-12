import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        activeChannel: '1',
    },
    reducers: {
        setActiveChannel: (state, action) => {
            state.activeChannel = action.payload;
        } 
    },
    selectors: {
        getActiveChannel: (state) => state.activeChannel,
    }
});

export const { setActiveChannel } = appSlice.actions;
export const { getActiveChannel } = appSlice.selectors;