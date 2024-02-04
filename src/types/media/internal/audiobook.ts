/** Format of the individual results for the /api/media-search/apple/audiobook/search endpoint */
type InternalAudiobookResult = {
  artist: string;
  name: string;
  description: string;
  coverUrlSmall: string;
  coverUrlLarge: string;
};

/** Return format for the /api/media-search/apple/audiobook/search endpoint */
export type InternalAudiobookResponse = InternalAudiobookResult[];
