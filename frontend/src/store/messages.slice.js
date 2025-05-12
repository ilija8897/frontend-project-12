import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/index';

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async () => {
        const response = await axiosInstance.get('/api/v1/messages');

        return response.data;
    }
);
export const postMessages = createAsyncThunk(
    'messages/postMessages',
    async () => {
        const response = await axiosInstance.post('/api/v1/messages', { body: 'new message', channelId: '1', username: 'admin' });

        return response.data;
    }
);

const MessagesAdapter = createEntityAdapter();

const initialState = { isSubmitting: false, messages: [{}] };

const messagesSlice = createSlice({
  name: 'messages',
  initialState: MessagesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loadingMessagesStatus = 'loading';
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loadingMessagesStatus = 'fulfilled';
        state.error = null;
        state.messages = action.payload
      })
      .addCase(postMessages.pending, (state) => {
        state.sendMessageStatus = 'loading';
        state.error = null;
      })
      .addCase(postMessages.fulfilled, (state, action) => {
        const channelId = action.payload.channelId;
        state.sendMessageStatus = 'fulfilled';
        state.error = null;
        console.log(channelId);
        
        if (!state.messages[channelId]) state.messages[channelId] = [];
        
        // state.messages[channelId].push(action.payload.body);
      })
      .addCase(postMessages.rejected, (state, action) => {
        state.sendMessageStatus = 'rejected';
        state.error = action.payload;
      })
    },
    selectors: {
      messagesSelector: (state) => state.messages,
    }
})

export const {
  messagesSelector,
} = messagesSlice.selectors;

export default messagesSlice;