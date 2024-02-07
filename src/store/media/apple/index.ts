import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AppleAudiobookResponse } from '@/types/media/apple/audiobook';
import { Country } from '@/utilities/strings/country-codes';
import type { AppleMediaOptions } from '@/types/media/apple';

export function appleQueryBuilder({
  term,
  media = undefined,
  country = undefined,
  entity = undefined,
  attribute = undefined,
  limit = undefined,
  lang = undefined,
  version = undefined,
  explicit = undefined,
}: AppleMediaOptions) {
  let basicQuery = `/search?term=${encodeURIComponent(term)}`;
  if (media) basicQuery = basicQuery.concat(`&media=${media}`);
  if (country) basicQuery = basicQuery.concat(`&country=${country}`);
  if (entity) basicQuery = basicQuery.concat(`&entity=${entity}`);
  if (attribute) basicQuery = basicQuery.concat(`&attribute=${attribute}`);
  if (limit) basicQuery = basicQuery.concat(`&limit=${limit}`);
  if (lang) basicQuery = basicQuery.concat(`&lang=${lang}`);
  if (version) basicQuery = basicQuery.concat(`&version=${version}`);
  if (explicit) basicQuery = basicQuery.concat(`&explicit=${explicit}`);

  return basicQuery;
}

export const appleMediaAudiobookApi = createApi({
  reducerPath: 'appleMediaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itunes.apple.com/search' }),
  endpoints: (builder) => ({
    searchAppleMedia: builder.query<AppleAudiobookResponse, AppleMediaOptions>({
      query: ({
        term,
        country = Country.UnitedStates,
        media = undefined,
        entity = undefined,
        attribute = undefined,
        limit = 50,
        lang = 'en_us',
        version = 2,
        explicit = 'Yes',
      }) => `
        ?term=${encodeURIComponent(term)}
        ${country && `&country=${country}`}
        ${media && `&media=${media}`}
        ${entity && `&entity=${entity}`}
        ${attribute && `&attribute=${attribute}`}
        ${limit > 0 && limit !== 50 && limit < 200 && `&limit=${limit}`}
        ${lang !== 'en_us' && `&lang=${lang}`}
        ${version !== 2 && `&version=${version}`}
        ${explicit !== 'Yes' && `&explicit=${explicit}`}
        `,
    }),
    getAppleMediaCover: builder.query<File, string>({
      query: (url) => `cover?url=${url}`,
    }),
  }),
});

export const { useSearchAppleMediaQuery, useGetAppleMediaCoverQuery } = appleMediaAudiobookApi;
