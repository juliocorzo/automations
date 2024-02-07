import { Country } from '@/utilities/strings/country-codes';

const appleMediaTypes = [
  'movie',
  'podcast',
  'music',
  'musicVideo',
  'audiobook',
  'shortFilm',
  'tvShow',
  'software',
  'ebook',
  undefined,
] as const;

export type AppleMedia = typeof appleMediaTypes[number];

/**
 * Type guard to validate that the media type is one of the valid media types
 * @param susAppleMedia variable to validate
 * @returns `true` if the media type is valid, `false` otherwise
 */
export function isMedia(susAppleMedia: unknown): AppleMedia | undefined {
  return appleMediaTypes.find((validAppleMedia) => validAppleMedia === susAppleMedia);
}

export interface AppleMediaOptions {
  /** URL-encoded text string that is searched for */
  term: string;
  /** Two-letter country code for the store you want to search */
  country?: Country;
  /** The media type you want to search for */
  media?: AppleMedia;
  /** The number of search results to return */
  entity?: string;
  /** The attribute you want to search for in the stores */
  attribute?: string | null;
  /** The number of search results to return, from 1 to 200 */
  limit?: number;
  /** The language you want to use when returning results */
  lang?: 'en_us' | 'ja_jp';
  /** The search results key version */
  version?: 1 | 2;
  /** The explicit flag */
  explicit?: 'Yes' | 'No';
}

export interface AppleMediaResponse {
  resultCount: number;
  results: AppleMediaResult[];
}

export const appleMediaResultWrapperTypes = ['track', 'collection', 'artist'] as const;
export type AppleMediaResultWrapperType = typeof appleMediaResultWrapperTypes[number];

export const isAppleMediaResultWrapperType = (
  susAppleMediaResultWrapperType: unknown,
): AppleMediaResultWrapperType | undefined => appleMediaResultWrapperTypes.find((
  validAppleMediaResultWrapperType,
) => validAppleMediaResultWrapperType === susAppleMediaResultWrapperType);

export const appleMediaResultKindTypes = [
  'book',
  'album',
  'coached-audio',
  'feature-movie',
  'interactive-booklet',
  'music-video',
  'pdf',
  'podcast',
  'podcast-episode',
  'software-package',
  'song',
  'tv-episode',
  'artist',
] as const;
export type AppleMediaResultKindType = typeof appleMediaResultKindTypes[number];

export const isAppleMediaResultKindType = (
  susAppleMediaResultKindType: unknown,
): AppleMediaResultKindType | undefined => appleMediaResultKindTypes.find((
  validAppleMediaResultKindType,
) => validAppleMediaResultKindType === susAppleMediaResultKindType);

interface AppleMediaResult {
  wrapperType: AppleMediaResultWrapperType;
  kind: AppleMediaResultKindType
  artistId: number;
  collectionId: number;
  artistName: string;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: 'notExplicit' | 'explicit';
  trackCount: number;
  country: string;
  currency: string;
  releaseDate: string;
  primaryGenreName: string;
  previewUrl: string;
  description: string;
}

/**
 * Entity defaults
 * Movie: movie
 * Podcast: podcast
 * Music: musicTrack
 * Music Video: musicVideo
 * Audiobook: audiobook
 * Short Film: shortFilm
 * TV Show: tvEpisode
 * Software: software
 * Ebook: ebook
 * All: allTrack
 */
