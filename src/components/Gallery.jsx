import { useState } from 'react'
import Lightbox from './Lightbox'
import OptimizedImage from './OptimizedImage'

// Portfolio images
const portfolioImages = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  src: `/portfolio/${i + 1}.jpg`,
}))

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleImageClick = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  // Split into two columns for masonry effect
  const leftColumn = portfolioImages.filter((_, i) => i % 2 === 0)
  const rightColumn = portfolioImages.filter((_, i) => i % 2 === 1)

  return (
    <>
      <div className="flex gap-2 px-4">
        <div className="flex-1 flex flex-col gap-2">
          {leftColumn.map((image) => {
            const originalIndex = portfolioImages.findIndex(img => img.id === image.id)
            return (
              <OptimizedImage
                key={image.id}
                src={image.src}
                alt={`Фото ${image.id}`}
                className="cursor-pointer rounded-sm transition-transform duration-300 active:scale-[0.98]"
                onClick={() => handleImageClick(originalIndex)}
                priority={image.id <= 4}
              />
            )
          })}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {rightColumn.map((image) => {
            const originalIndex = portfolioImages.findIndex(img => img.id === image.id)
            return (
              <OptimizedImage
                key={image.id}
                src={image.src}
                alt={`Фото ${image.id}`}
                className="cursor-pointer rounded-sm transition-transform duration-300 active:scale-[0.98]"
                onClick={() => handleImageClick(originalIndex)}
                priority={image.id <= 4}
              />
            )
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
