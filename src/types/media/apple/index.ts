const appleMediaTypes = ['audiobook'] as const;

export type AppleMedia = typeof appleMediaTypes[number];

/**
 * Type guard to validate that the media type is one of the valid media types
 * @param susAppleMedia variable to validate
 * @returns `true` if the media type is valid, `false` otherwise
 */
export function isMedia(susAppleMedia: unknown): AppleMedia | undefined {
  return appleMediaTypes.find((validAppleMedia) => validAppleMedia === susAppleMedia);
}
