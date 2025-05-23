import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/index';

export const getChannels = createAsyncThunk(
    'channels/getChannels',
    async () => {
        const response = await axiosInstance.get('/api/v1/channels');

        return response.data;
    }
);

const channelsAdapter = createEntityAdapter();

const initialState = { isSubmitting: false, channels: [], active: 0 };

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(initialState),
  reducers: {
    setActiveChannel(state, {payload}) {
      state.active = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.loadingStatus = 'fulfilled';
        state.error = null;
        state.channels = action.payload
      })
    }
})

export default channelsSlice;