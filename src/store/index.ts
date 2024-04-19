import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { performanceMetricApi } from '@/store/services/performance-metric';
import { internalAudiobookApi } from '@/store/media/internal/audiobook';
import { appleMusicApi } from '@/store/media/apple/music';
import { todoApi } from '@/store/todos';

export const store = configureStore({
  reducer: {
    [performanceMetricApi.reducerPath]: performanceMetricApi.reducer,
    [internalAudiobookApi.reducerPath]: internalAudiobookApi.reducer,
    [appleMusicApi.reducerPath]: appleMusicApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (
    getDefaultMiddleware,
  ) => getDefaultMiddleware()
    .concat(performanceMetricApi.middleware)
    .concat(internalAudiobookApi.middleware)
    .concat(appleMusicApi.middleware)
    .concat(todoApi.middleware),
});

setupListeners(store.dispatch);
