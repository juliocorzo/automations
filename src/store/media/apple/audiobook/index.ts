import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { InternalAudiobookResponse } from '@/types/media/internal/audiobook';

export const appleAudiobookApi = createApi({
  reducerPath: 'appleAudiobookMediaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/media/apple/audiobook/' }),
  endpoints: (builder) => ({
    searchAppleAudiobook: builder.query<InternalAudiobookResponse, string>({
      query: (term) => `search?term=${term}`,
    }),
    getAppleAudiobookCover: builder.query<File, string>({
      query: (url) => `cover?url=${url}`,
    }),
  }),
});

export const { useSearchAppleAudiobookQuery, useGetAppleAudiobookCoverQuery } = appleAudiobookApi;
