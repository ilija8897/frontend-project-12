import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/index';
import { messagesApi } from './store/messages';
import { channelsApi } from './store/channels';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defMiddlewares) => defMiddlewares().concat(
    messagesApi.middleware,
    channelsApi.middleware
  )
});
