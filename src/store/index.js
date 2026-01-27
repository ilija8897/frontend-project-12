import { combineReducers } from '@reduxjs/toolkit'

import { appSlice } from './app.slice'
import authSlice from './auth.slice'
import { channelsApi } from './channels'
import { messagesApi } from './messages'

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  channels: channelsApi.reducer,
  messages: messagesApi.reducer,
})
