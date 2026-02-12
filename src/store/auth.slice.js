import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/index'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/login', credentials)

      return response.data
    }
    catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/signup', credentials)
      return response.data
    }
    catch (error) {
      return rejectWithValue(error)
    }
  },
)

const authAdapter = createEntityAdapter()

const initialState = {
  isSubmitting: false,
  username: localStorage.getItem('username') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loadingStatus = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('login', action)

        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token)
        }
        if (action.payload.username) {
          localStorage.setItem('username', action.payload.username)
        }
        state.loadingStatus = 'fulfilled'
        state.username = action.payload.username
        state.error = null

        window.location.href = '/'
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingStatus = 'rejected'
        state.error = action
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token)
        }
        if (action.payload.username) {
          localStorage.setItem('username', action.payload.username)
        }
        state.loadingStatus = 'fulfilled'
        state.username = action.payload.username
        state.error = null
        window.location.href = '/'
      })
      .addCase(signup.rejected, (state, action) => {
        state.loadingStatus = 'rejected'
        console.log(action)

        state.error = { status: action.payload.status, message: action.error.message }
      })
  },
  selectors: {
    getUserSelector: state => state.username,
  },
})
export const { getUserSelector } = authSlice.selectors
export default authSlice
