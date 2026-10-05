import React, { useState } from "react";
import { optimizeImageUrl } from "@/utils/image";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthLimit?: number;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  widthLimit,
  fallbackSrc = "/logo-mono.png",
  className = "",
  loading = "eager",
  decoding = "async",
  onError,
  ...props
}) => {
  const [error, setError] = useState(false);

  const optimizedSrc = error ? fallbackSrc : optimizeImageUrl(src, widthLimit);

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onError={(e) => {
        if (!error) setError(true);
        onError?.(e);
      }}
      className={className}
      {...props}
    />
  );
};

export default OptimizedImage;
