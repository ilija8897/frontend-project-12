import { combineSlices } from '@reduxjs/toolkit'

import authSlice from './auth.slice';

export const rootReducer = combineSlices({
    auth: authSlice.reducer,
});