import { useState } from 'react'

export default function OptimizedImage({
  src,
  alt,
  className = '',
  onClick,
  priority = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Generate paths for different formats
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '')
  const webpSrc = `${basePath}.webp`
  const jpgSrc = `${basePath}.jpg`
  const thumbSrc = `${basePath}-thumb.jpg`

  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-xs">Фото</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <img
          src={thumbSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Main image with WebP support */}
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={jpgSrc} type="image/jpeg" />
        <img
          src={jpgSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
    </div>
  )
}
