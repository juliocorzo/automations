import type { AppleAudiobookResponse } from '@/types/media/apple/audiobook';
import type { InternalAudiobookResponse } from '@/types/media/internal/audiobook';
import type { AppleMedia } from '@/types/media/apple';

export function generateSearchUrl(
  term: string,
  media: AppleMedia = 'audiobook',
  country: string = 'us',
): string {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${media}&country=${country}`;
}

/**
 * Parses the response from the Apple API into the internal audiobook response
 * @param response - The response from the Apple API
 * @returns The internal audiobook response
 */
export function parseResponse(response: AppleAudiobookResponse): InternalAudiobookResponse {
  const internalResponse: InternalAudiobookResponse = [];

  response.results.forEach((result) => {
    internalResponse.push({
      artist: result.artistName,
      name: result.collectionName,
      description: result.description,
      coverUrlSmall: result.artworkUrl60,
      coverUrlLarge: result.artworkUrl100.trim().replace('100x100bb', '100000x100000-999'),
    });
  });

  return internalResponse;
}
