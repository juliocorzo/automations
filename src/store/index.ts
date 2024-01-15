import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { performanceMetricApi } from '@/store/services/performance-metric';

export const store = configureStore({
  reducer: {
    [performanceMetricApi.reducerPath]: performanceMetricApi.reducer,
  },
  middleware: (
    getDefaultMiddleware,
  ) => getDefaultMiddleware().concat(performanceMetricApi.middleware),
});

setupListeners(store.dispatch);
