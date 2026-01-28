// Run this script after deploying to Vercel to set up the webhook
// Usage: node scripts/setup-webhook.js

const BOT_TOKEN = '8593408519:AAH3igCsu_-Ni-zT0X3pvvwV7OzFqqxmLiE';
const WEBHOOK_URL = 'https://nairules-photo.vercel.app/api/webhook';

async function setWebhook() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message'],
      }),
    });

    const result = await response.json();
    console.log('Webhook setup result:', result);

    if (result.ok) {
      console.log('✅ Webhook successfully set!');
      console.log(`📌 URL: ${WEBHOOK_URL}`);
    } else {
      console.error('❌ Failed to set webhook:', result.description);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getWebhookInfo() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log('\nCurrent webhook info:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

async function setBotCommands() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`;

  const commands = [
    { command: 'start', description: '🚀 Открыть приложение' },
    { command: 'portfolio', description: '📸 Посмотреть работы' },
    { command: 'booking', description: '📅 Записаться на съёмку' },
    { command: 'contact', description: '📞 Контакты' },
    { command: 'help', description: '🆘 Помощь' },
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands }),
    });

    const result = await response.json();
    console.log('\nBot commands setup:', result.ok ? '✅ Success' : '❌ Failed');
  } catch (error) {
    console.error('Error setting commands:', error);
  }
}

// Run setup
(async () => {
  console.log('Setting up Telegram bot...\n');
  await setWebhook();
  await setBotCommands();
  await getWebhookInfo();
})();
