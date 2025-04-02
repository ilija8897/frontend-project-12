import { combineSlices } from '@reduxjs/toolkit'

import authSlice from './auth.slice';
import channelsSlice from './channels.slice';

export const rootReducer = combineSlices({
    auth: authSlice.reducer,
    channels: channelsSlice.reducer,
});