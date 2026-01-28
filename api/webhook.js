// Telegram Bot Webhook Handler
// This handles incoming messages from Telegram

const BOT_TOKEN = process.env.VITE_BOT_TOKEN;

const WELCOME_MESSAGE = `👋 Привет!

Я — бот фотографа Найры из Казани.

📸 Здесь ты можешь:
• Посмотреть портфолио
• Записаться на съёмку
• Узнать больше обо мне

Нажми кнопку ниже, чтобы открыть мини-приложение 👇`;

const WELCOME_KEYBOARD = {
  inline_keyboard: [
    [
      {
        text: '📷 Открыть приложение',
        web_app: { url: 'https://nairules-photo.vercel.app' }
      }
    ],
    [
      {
        text: '📞 Написать напрямую',
        url: 'https://t.me/nairulik'
      }
    ]
  ]
};

async function sendMessage(chatId, text, replyMarkup = null) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
  };

  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, method: req.method });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(200).json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text || '';

    // Handle /start command
    if (text === '/start') {
      await sendMessage(chatId, WELCOME_MESSAGE, WELCOME_KEYBOARD);
    }

    // Handle /help command
    else if (text === '/help') {
      await sendMessage(
        chatId,
        `🆘 <b>Помощь</b>\n\n/start — открыть приложение\n/portfolio — посмотреть работы\n/booking — записаться на съёмку\n/contact — контакты`,
        WELCOME_KEYBOARD
      );
    }

    // Handle /portfolio command
    else if (text === '/portfolio') {
      await sendMessage(
        chatId,
        '📸 Посмотри мои работы в приложении:',
        {
          inline_keyboard: [[
            { text: '🖼 Открыть портфолио', web_app: { url: 'https://nairules-photo.vercel.app/portfolio' } }
          ]]
        }
      );
    }

    // Handle /booking command
    else if (text === '/booking') {
      await sendMessage(
        chatId,
        '📅 Записаться на съёмку можно здесь:',
        {
          inline_keyboard: [[
            { text: '✨ Записаться', web_app: { url: 'https://nairules-photo.vercel.app/booking' } }
          ]]
        }
      );
    }

    // Handle /contact command
    else if (text === '/contact') {
      await sendMessage(
        chatId,
        `📞 <b>Контакты</b>\n\n👤 Найра\n📍 Казань\n\n✈️ Telegram: @nairulik\n📷 Instagram: @nairules.ph`,
        {
          inline_keyboard: [
            [{ text: '✈️ Написать в Telegram', url: 'https://t.me/nairulik' }],
            [{ text: '📷 Instagram', url: 'https://instagram.com/nairules.ph' }]
          ]
        }
      );
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({ ok: true, error: error.message });
  }
}
