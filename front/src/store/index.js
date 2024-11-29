import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import clientReducer from './clientSlice';
import statusReducer from './statusSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    client: clientReducer,
    status: statusReducer,
  },
});
