import React, { useState, useRef, useEffect } from "react";
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
  containerClassName = "w-full h-full",
  loading = "eager",
  decoding = "async",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const optimizedSrc = error ? fallbackSrc : optimizeImageUrl(src, widthLimit);

  // Check if image is already cached/complete on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [optimizedSrc]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton background placeholder */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-white/10"
        />
      )}

      <img
        ref={imgRef}
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
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-90"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
