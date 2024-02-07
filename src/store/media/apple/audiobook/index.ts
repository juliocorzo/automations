import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AppleAudiobookResponse } from '@/types/media/apple/audiobook';
import { Country } from '@/utilities/strings/country-codes';

type SearchArgs = {
  /** Search term */
  term: string;
  /** ISO 3116-2 Country Codes */
  country?: Country;
  /** Results amount */

};

export const appleAudiobookApi = createApi({
  reducerPath: 'appleAudiobookMediaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itunes.apple.com/search' }),
  endpoints: (builder) => ({
    searchAppleAudiobook: builder.query<AppleAudiobookResponse, SearchArgs>({
      query: ({ term, country = Country.UnitedStates }) => `?term=${encodeURIComponent(term)}&media=audiobook&country=${country}`,
    }),
    getAppleAudiobookCover: builder.query<File, string>({
      query: (url) => `cover?url=${url}`,
    }),
  }),
});

export const { useSearchAppleAudiobookQuery, useGetAppleAudiobookCoverQuery } = appleAudiobookApi;
