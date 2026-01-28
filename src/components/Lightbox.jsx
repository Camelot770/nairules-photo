import { useEffect, useState, useRef } from 'react'
import { X, ImageIcon } from 'lucide-react'

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [imageError, setImageError] = useState(false)
  const containerRef = useRef(null)

  const minSwipeDistance = 50

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    setImageError(false)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const goToPrev = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }

  const goToNext = () => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrev()
  }

  if (!isOpen) return null

  return (
    <div
      className="lightbox-overlay"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Закрыть"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-50 text-white/80 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div className="w-full h-full flex items-center justify-center p-4">
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-white/50">
            <ImageIcon size={64} />
            <span className="mt-4 text-sm">Фото скоро появится</span>
          </div>
        ) : (
          <img
            src={images[currentIndex]?.src}
            alt={`Фото ${currentIndex + 1}`}
            className="lightbox-image"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Swipe hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs">
        Свайпните для навигации
      </div>
    </div>
  )
}
