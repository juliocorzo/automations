import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { pcMetricsApi } from '@/store/services/pc-metrics';

export const store = configureStore({
  reducer: {
    [pcMetricsApi.reducerPath]: pcMetricsApi.reducer,
  },
  middleware: (
    getDefaultMiddleware,
  ) => getDefaultMiddleware()
    .concat(pcMetricsApi.middleware),
});

setupListeners(store.dispatch);
