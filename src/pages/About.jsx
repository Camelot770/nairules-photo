import { Send, Instagram, MapPin, ArrowUpRight } from 'lucide-react'

export default function About() {
  return (
    <div className="page-transition px-6 pt-20 pb-8">
      {/* Photo - круглая форма */}
      <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100">
        <img
          src="/Naira_photo.jpeg"
          alt="Найра"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div>
        {/* Name */}
        <h1 className="text-3xl font-light text-center mb-1">Найра</h1>
        <p className="text-gray-400 text-sm tracking-wide uppercase text-center mb-8">Фотограф</p>

        {/* Bio */}
        <div className="space-y-4 mb-12">
          <p className="text-gray-800 leading-relaxed text-lg font-light">
            iPhone, камера — без разницы.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Главное, что в кадре ты настоящий.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Твой телефон видит тебя лучше, чем ты думаешь. Осталось только нажать на кнопку.
          </p>
        </div>

        {/* Contacts */}
        <div className="space-y-1">
          {/* Location */}
          <div className="flex items-center gap-4 py-4 border-t border-gray-100">
            <MapPin size={18} className="text-gray-300" />
            <span className="text-gray-600">Казань</span>
          </div>

          {/* Telegram */}
          <a
            href="https://t.me/nairulik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 border-t border-gray-100 group"
          >
            <div className="flex items-center gap-4">
              <Send size={18} className="text-gray-300" />
              <span className="text-gray-600">Telegram</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors">
              <span className="text-sm">@nairulik</span>
              <ArrowUpRight size={14} />
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/nairules.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 border-t border-b border-gray-100 group"
          >
            <div className="flex items-center gap-4">
              <Instagram size={18} className="text-gray-300" />
              <span className="text-gray-600">Instagram</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors">
              <span className="text-sm">@nairules.ph</span>
              <ArrowUpRight size={14} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
