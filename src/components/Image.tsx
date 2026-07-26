import React, { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  baseSrc: string;
  containerClassName?: string;
}

export const Image: React.FC<ImageProps> = ({
  baseSrc,
  className,
  containerClassName = "",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const resolvedSrc = baseSrc && baseSrc.startsWith("/") ? baseUrl + baseSrc.slice(1) : baseSrc;

  return (
    <div className={`relative w-full h-full ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-stone-200 z-0"></div>
      )}
      <img
        src={resolvedSrc}
        className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} ${className || ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
};
