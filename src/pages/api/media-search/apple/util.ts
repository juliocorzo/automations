import type { AppleAudioBookResponse, InternalAudioBookResponse, Media } from './audiobook.types';
import { appleAudioBookResultKeys, mediaTypes } from './audiobook.types';

/**
 * Type guard to validate that the media type is one of the valid media types
 * @param maybeMediaType variable to validate
 * @returns `true` if the media type is valid, `false` otherwise
 */
export function isMedia(maybeMedia: unknown): Media | undefined {
  return mediaTypes.find((validMedia) => validMedia === maybeMedia);
}

export function generateSearchUrl(
  term: string,
  media: Media = 'audiobook',
  country: string = 'us',
): string {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${media}&country=${country}`;
}

/**
 * Parses the response from the Apple API into the internal audiobook response
 * @param response - The response from the Apple API
 * @returns The internal audiobook response
 */
export function parseResponse(response: AppleAudioBookResponse): InternalAudioBookResponse {
  const internalResponse: InternalAudioBookResponse = [];

  response.results.forEach((result) => {
    internalResponse.push({
      artist: result.artistName,
      name: result.collectionName,
      description: result.description,
      artworkUrl: result.artworkUrl100.trim().replace('100x100bb', '100000x100000-999'),
    });
  });

  return internalResponse;
}

/**
 * Type guard for the response from the Apple APIe
 * @returns `true` if the response is the expected Apple audiobook response, `false` otherwise
 */
export function isAppleResponse(response: unknown): boolean {
  if ((response as AppleAudioBookResponse)?.resultCount === undefined) {
    return false;
  }

  for (let i = 0; i < (response as AppleAudioBookResponse).resultCount; i += 1) {
    const result = (response as AppleAudioBookResponse).results[i];

    for (let f = 0; f < appleAudioBookResultKeys.length; f += 1) {
      if (result?.[appleAudioBookResultKeys[f]] === undefined) {
        return false;
      }
    }
  }

  return true;
}
