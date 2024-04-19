import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PerformanceMetric } from '@/types/performance-metric';

// Define a service using a base URL and expected endpoints
export const performanceMetricApi = createApi({
  reducerPath: 'performanceMetricApi',
  // Internal API, example of using the Next.js server to make an external request
  // without leaking a key to the client
  baseQuery: fetchBaseQuery({ baseUrl: '/api/performance-metric' }),
  endpoints: (builder) => ({
    getPerformanceMetric: builder.query<PerformanceMetric, undefined>({
      query: () => '',
    }),
  }),
});

export const { useGetPerformanceMetricQuery } = performanceMetricApi;
