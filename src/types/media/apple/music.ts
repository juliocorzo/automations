import type { AppleMediaOptions } from '@/types/media/apple';

const appleMusicEntities = [undefined, 'musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song'] as const;

export type AppleMusicEntities = typeof appleMusicEntities[number];

export function isAppleMusicEntity(susAppleMusicEntities: unknown): AppleMusicEntities | undefined {
  return appleMusicEntities.find(
    (validAppleMusicEntities) => validAppleMusicEntities === susAppleMusicEntities,
  );
}

const appleMusicAttributes = [undefined, 'mixTerm', 'genreIndex', 'artistTerm', 'albumTerm', 'ratingIndex', 'songTerm'] as const;

export function isAppleMusicAttribute(
  susAppleMusicAttributes: unknown,
): AppleMusicAttributes | undefined {
  return appleMusicAttributes.find(
    (validAppleMusicAttributes) => validAppleMusicAttributes === susAppleMusicAttributes,
  );
}

export type AppleMusicAttributes = typeof appleMusicAttributes[number];

export interface AppleMusicOptions extends Omit<AppleMediaOptions, 'media'> {
  entity?: AppleMusicEntities;
  attribute?: AppleMusicAttributes;
}
