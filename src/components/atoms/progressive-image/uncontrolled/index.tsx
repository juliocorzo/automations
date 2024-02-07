import { ProgressiveImage as ControlledProgressiveImage } from '@/components/atoms/progressive-image/controlled';
import { useState, useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

export interface ProgressiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Image displayed while the larger image hasn't loaded */
  lowQualitySrc: string;
  /** Larger image that will be loaded */
  highQualitySrc: string;
}

/**
 * Component that displays a low-quality image while the high-quality image is loading
 * Returns a `img` element
 */
export function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  ...rest
}: ProgressiveImageProps) {
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setInternalLoading(false);
    };
  });

  return (
    <ControlledProgressiveImage
      lowQualitySrc={lowQualitySrc}
      highQualitySrc={highQualitySrc}
      imageLoading={internalLoading}
      {...rest}
    />
  );
}
