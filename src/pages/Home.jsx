import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import OptimizedImage from '../components/OptimizedImage'

// Preview photos
const previewPhotos = [
  { id: 1, src: '/portfolio/2.jpg' },
  { id: 2, src: '/portfolio/3.jpg' },
  { id: 3, src: '/portfolio/4.jpg' },
  { id: 4, src: '/portfolio/5.jpg' },
  { id: 5, src: '/portfolio/6.jpg' },
  { id: 6, src: '/portfolio/7.jpg' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page-transition">
      {/* Hero Section - Full height */}
      <section className="relative h-[85vh] flex items-end overflow-hidden">
        {/* Background image with WebP support */}
        <picture>
          <source srcSet="/portfolio/1.webp" type="image/webp" />
          <img
            src="/portfolio/1.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
        </picture>

        {/* Gradient overlay - subtle at top, stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content - positioned at bottom */}
        <div className="relative z-10 w-full px-6 pb-16">
          <p className="text-white/70 text-sm tracking-[0.2em] uppercase mb-3">
            Фотограф · Казань
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-light leading-tight mb-8 max-w-sm">
            Твой телефон видит тебя лучше, чем ты думаешь
          </h1>
          <button
            onClick={() => navigate('/booking')}
            className="group flex items-center gap-3 bg-white text-black px-6 py-3.5 font-medium transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
          >
            Записаться на съёмку
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium">Работы</h2>
          <button
            onClick={() => navigate('/portfolio')}
            className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
          >
            Все <ArrowRight size={14} />
          </button>
        </div>

        {/* Two-column masonry layout */}
        <div className="flex gap-3">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-3">
            {previewPhotos.filter((_, i) => i % 2 === 0).map((photo, idx) => (
              <OptimizedImage
                key={photo.id}
                src={photo.src}
                alt={`Фото ${photo.id}`}
                className="cursor-pointer group"
                onClick={() => navigate('/portfolio')}
                priority={idx === 0}
              />
            ))}
          </div>

          {/* Right column - offset for visual interest */}
          <div className="flex-1 flex flex-col gap-3 mt-8">
            {previewPhotos.filter((_, i) => i % 2 === 1).map((photo) => (
              <OptimizedImage
                key={photo.id}
                src={photo.src}
                alt={`Фото ${photo.id}`}
                className="cursor-pointer group"
                onClick={() => navigate('/portfolio')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-16">
        <div className="bg-black text-white p-8 text-center">
          <p className="text-white/60 text-sm mb-3">Готовы к съёмке?</p>
          <h3 className="text-xl font-light mb-6">Давайте создадим что-то красивое</h3>
          <button
            onClick={() => navigate('/booking')}
            className="border border-white px-8 py-3 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.98]"
          >
            Связаться
          </button>
        </div>
      </section>
    </div>
  )
}
