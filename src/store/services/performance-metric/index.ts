import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PerformanceMetric } from '@/types/performance-metric';

// Define a service using a base URL and expected endpoints
export const performanceMetricApi = createApi({
  reducerPath: 'performanceMetricApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/performance-metric' }),
  endpoints: (builder) => ({
    getPerformanceMetric: builder.query<PerformanceMetric, void>({
      query: () => '',
    }),
  }),
});

export const { useGetPerformanceMetricQuery } = performanceMetricApi;
