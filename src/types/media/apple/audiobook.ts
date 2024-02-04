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
export type AppleAudiobookResponse = {
  resultCount: number;
  results: AppleAudioBookResult[];
};

/**
 * Type guard for the response from the Apple APIe
 * @returns `true` if the response is the expected Apple audiobook response, `false` otherwise
 */
export function isAppleAudiobookResponse(response: unknown): boolean {
  if ((response as AppleAudiobookResponse)?.resultCount === undefined) {
    return false;
  }

  for (let i = 0; i < (response as AppleAudiobookResponse).resultCount; i += 1) {
    const result = (response as AppleAudiobookResponse).results[i];

    for (let f = 0; f < appleAudioBookResultKeys.length; f += 1) {
      if (result?.[appleAudioBookResultKeys[f]] === undefined) {
        return false;
      }
    }
  }

  return true;
}
