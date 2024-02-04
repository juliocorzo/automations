export const mediaTypes = ['audiobook'] as const;
export type Media = typeof mediaTypes[number];

export const appleAudioBookResultKeys = [
  'wrapperType',
  'artistId',
  'collectionId',
  'artistName',
  'collectionName',
  'collectionCensoredName',
  'artistViewUrl',
  'collectionViewUrl',
  'artworkUrl60',
  'artworkUrl100',
  'collectionPrice',
  'collectionExplicitness',
  'trackCount',
  'country',
  'currency',
  'releaseDate',
  'primaryGenreName',
  'previewUrl',
  'description',
] as const;

/** Format of the individual results from the iTunes API Audiobook entity search query */
type AppleAudioBookResult = {
  wrapperType: 'audiobook';
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
};

/** Current return format for iTunes API's Audiobook entity search query */
export type AppleAudioBookResponse = {
  resultCount: number;
  results: AppleAudioBookResult[];
};

/** Format of the individual results for the /api/media-search/apple/audiobook/search endpoint */
type InternalAudioBookResult = {
  artist: string;
  name: string;
  description: string;
  artworkUrl: string;
};

/** Return format for the /api/media-search/apple/audiobook/search endpoint */
export type InternalAudioBookResponse = InternalAudioBookResult[];
