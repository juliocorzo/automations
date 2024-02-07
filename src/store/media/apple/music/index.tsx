import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AppleMusicOptions } from '@/types/media/apple/music';
import { appleQueryBuilder } from '@/store/media/apple';
import type { AppleMediaResponse } from '@/types/media/apple';

export const appleMusicApi = createApi({
  reducerPath: 'appleMusicApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itunes.apple.com' }),
  endpoints: (builder) => ({
    searchAppleMusic: builder.query<AppleMediaResponse, AppleMusicOptions>({
      query: ({
        term, entity, attribute, ...rest
      }) => appleQueryBuilder({
        term, media: 'music', entity: entity || 'album', attribute: attribute || 'albumTerm', ...rest,
      }),
    }),
  }),
});

export const {
  useSearchAppleMusicQuery,
} = appleMusicApi;
