import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { performanceMetricApi } from '@/store/services/performance-metric';
import { appleAudiobookApi } from './media/apple/audiobook';

export const store = configureStore({
  reducer: {
    [performanceMetricApi.reducerPath]: performanceMetricApi.reducer,
    [appleAudiobookApi.reducerPath]: appleAudiobookApi.reducer,
  },
  middleware: (
    getDefaultMiddleware,
  ) => getDefaultMiddleware()
    .concat(performanceMetricApi.middleware)
    .concat(appleAudiobookApi.middleware),
});

setupListeners(store.dispatch);
