import type { ImgHTMLAttributes } from 'react';
import { StyledImage } from '@/components/atoms/progressive-image/ProgressiveImage.styles';

export interface ProgressiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Image displayed while the larger image hasn't loaded */
  lowQualitySrc: string;
  /** Larger image that will be loaded */
  highQualitySrc: string;
  /** If true, displays blurred, low-resolution image. If false, displays high-resolution image. */
  imageLoading: boolean;
}

/**
 * Component that displays a low-quality image while the high-quality image is loading
 * @returns standard `img` element with styling
 */
export function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  imageLoading,
  ...rest
}: ProgressiveImageProps) {
  return (
    <StyledImage
      src={imageLoading ? lowQualitySrc : highQualitySrc}
      $blur={imageLoading}
      {...rest}
    />
  );
}
