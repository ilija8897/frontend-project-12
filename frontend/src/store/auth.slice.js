import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/index';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const response = await axiosInstance.post('/api/v1/login', credentials);

        return response.data;
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (credentials) => {
        const response = await axiosInstance.post('/api/v1/signup', credentials)
        return response.data;
    }
);

const authAdapter = createEntityAdapter();

const initialState = { isSubmitting: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState(initialState),
  reducers: {
    // login(state, { payload }) {
    //   state.isSubmitting = true;
    //   axiosInstance.post('/api/v1/login', payload.values)
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
        }
        state.loadingStatus = 'fulfilled';
        state.error = null;

        window.location.href = '/';
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingStatus = 'rejected';
        state.error = action.error.message;
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
        }
        state.loadingStatus = 'fulfilled';
        state.error = null;
        window.location.href = '/';
      })
      .addCase(signup.rejected, (state, action) => {
        state.loadingStatus = 'rejected';
        state.error = action.error.message;
      })
    }
})

export default authSlice;