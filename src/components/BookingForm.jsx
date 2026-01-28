import { useState } from 'react'

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_CHAT_ID

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    date: '',
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatMessage = () => {
    return `📸 Новая заявка на съёмку!

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}
✈️ Telegram: ${formData.telegram || 'Не указан'}
📅 Дата: ${formData.date || 'Не указана'}
💬 Комментарий: ${formData.comment || 'Нет комментария'}`
  }

  const sendToTelegram = async () => {
    if (!CHAT_ID) {
      console.warn('CHAT_ID not configured')
      return true // Allow form to "succeed" for demo purposes
    }

    const message = formatMessage()
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

    // Support multiple chat IDs separated by comma
    const chatIds = CHAT_ID.split(',').map(id => id.trim())

    try {
      // Send to all chat IDs
      await Promise.all(
        chatIds.map(chatId =>
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML',
            }),
          })
        )
      )

      return true
    } catch (err) {
      console.error('Error sending to Telegram:', err)
      throw err
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await sendToTelegram()
      setIsSubmitted(true)
    } catch (err) {
      setError('Не удалось отправить заявку. Попробуйте позже или напишите напрямую в Telegram.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="page-transition flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">✨</div>
        <h2 className="text-2xl font-semibold mb-4">Спасибо!</h2>
        <p className="text-gray-600 leading-relaxed">
          Свяжусь с вами в ближайшее время 💫
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="form-label">
          Имя <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="Как вас зовут?"
        />
      </div>

      <div>
        <label htmlFor="phone" className="form-label">
          Телефон <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="+7 (999) 123-45-67"
        />
      </div>

      <div>
        <label htmlFor="telegram" className="form-label">
          Telegram
        </label>
        <input
          type="text"
          id="telegram"
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
          className="form-input"
          placeholder="@username"
        />
      </div>

      <div>
        <label htmlFor="date" className="form-label">
          Желаемая дата
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="comment" className="form-label">
          Комментарий
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          value={formData.comment}
          onChange={handleChange}
          className="form-input resize-none"
          placeholder="Расскажите о съёмке мечты"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  )
}
