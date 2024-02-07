import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { InternalAudiobookResponse } from '@/types/media/internal/audiobook';

export const internalAudiobookApi = createApi({
  reducerPath: 'internalAudiobookMediaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/media/apple/audiobook/' }),
  endpoints: (builder) => ({
    searchInternalAudiobook: builder.query<InternalAudiobookResponse, string>({
      query: (term) => `search?term=${term}`,
    }),
    getInternalAudiobookCover: builder.query<File, string>({
      query: (url) => `cover?url=${url}`,
    }),
  }),
});

export const {
  useSearchInternalAudiobookQuery,
  useLazyGetInternalAudiobookCoverQuery,
} = internalAudiobookApi;
