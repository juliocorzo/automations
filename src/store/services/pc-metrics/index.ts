import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CpuMetric } from '@prisma/client';

// Define a service using a base URL and expected endpoints
export const pcMetricsApi = createApi({
  reducerPath: 'pcMetricsApi',
  // Internal API, example of using the Next.js server to make an external request
  // without leaking a key to the client
  baseQuery: fetchBaseQuery({ baseUrl: '/api/pc-metrics/cpu/list' }),
  endpoints: (builder) => ({
    getCpuMetrics: builder.query<{ data: CpuMetric[] }, undefined>({
      query: () => '',
    }),
  }),
});

export const { useGetCpuMetricsQuery } = pcMetricsApi;
