import React, { useState } from "react";
import { optimizeImageUrl } from "@/utils/image";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthLimit?: number;
  fallbackSrc?: string;
  containerClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  widthLimit,
  fallbackSrc = "/logo-mono.png",
  className = "",
  containerClassName = "",
  loading = "lazy",
  decoding = "async",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const optimizedSrc = error ? fallbackSrc : optimizeImageUrl(src, widthLimit);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton background placeholder */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-black/5 dark:bg-white/5"
        />
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) {
            setError(true);
          }
        }}
        className={`transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
