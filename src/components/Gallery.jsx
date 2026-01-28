import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import Lightbox from './Lightbox'

// Portfolio images
const portfolioImages = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  src: `/portfolio/${i + 1}.jpg`,
}))

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState({})

  const handleImageClick = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }

  const handleImageError = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: 'error' }))
  }

  // Split into two columns for masonry effect
  const leftColumn = portfolioImages.filter((_, i) => i % 2 === 0)
  const rightColumn = portfolioImages.filter((_, i) => i % 2 === 1)

  const renderImage = (image, originalIndex) => (
    <div
      key={image.id}
      className="relative cursor-pointer overflow-hidden rounded-sm transition-transform duration-300 active:scale-[0.98]"
      onClick={() => handleImageClick(originalIndex)}
    >
      {loadedImages[image.id] === 'error' ? (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
          <ImageIcon className="text-gray-300" size={32} />
        </div>
      ) : (
        <>
          <img
            src={image.src}
            alt={`Фото ${image.id}`}
            className={`w-full h-auto transition-opacity duration-300 ${
              loadedImages[image.id] ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => handleImageLoad(image.id)}
            onError={() => handleImageError(image.id)}
          />
          {!loadedImages[image.id] && (
            <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <ImageIcon className="text-gray-300 animate-pulse" size={32} />
            </div>
          )}
        </>
      )}
    </div>
  )

  return (
    <>
      <div className="flex gap-2 px-4">
        <div className="flex-1 flex flex-col gap-2">
          {leftColumn.map((image) => {
            const originalIndex = portfolioImages.findIndex(img => img.id === image.id)
            return renderImage(image, originalIndex)
          })}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {rightColumn.map((image) => {
            const originalIndex = portfolioImages.findIndex(img => img.id === image.id)
            return renderImage(image, originalIndex)
          })}
        </div>
      </div>

      <Lightbox
        images={portfolioImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </>
  )
}
