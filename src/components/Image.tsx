import React, { useState } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  baseSrc: string;
  containerClassName?: string;
}

export const Image: React.FC<ImageProps> = ({ baseSrc, className, containerClassName = '', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  const baseUrl = import.meta.env.BASE_URL || '/';
  const resolvedSrc = baseSrc && baseSrc.startsWith('/') ? baseUrl + baseSrc.slice(1) : baseSrc;

  let srcSet = undefined;
  const isArchiveImage = baseSrc && baseSrc.includes('/archives/') && baseSrc.endsWith('.webp');

  if (isArchiveImage) {
    const withoutExt = resolvedSrc.slice(0, -5);
    srcSet = `${withoutExt}-400w.webp 400w, ${withoutExt}-800w.webp 800w, ${withoutExt}-1200w.webp 1200w, ${resolvedSrc} 2000w`;
  }

  return (
    <div className={`relative w-full h-full ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-200 z-0"></div>
      )}
      <img
        src={resolvedSrc}
        srcSet={srcSet}
        sizes={srcSet ? "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px" : undefined}
        className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  )
}
