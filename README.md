# Salary App for Netlify

Файлы проекта:

- `index.html` — сайт.
- `netlify/functions/save-data.js` — сохранение данных в Netlify Blobs.
- `netlify/functions/load-data.js` — загрузка данных из Netlify Blobs.
- `netlify/functions/send-telegram.js` — отправка Telegram через backend.
- `netlify.toml` — настройки Netlify.
- `package.json` — зависимости.

## Переменные окружения Netlify

В Netlify добавьте:

- `DATA_PASSWORD` — пароль для кнопок «Сохранить в облако» и «Загрузить из облака». Можно любой свой пароль.
- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота от BotFather.

## Деплой через GitHub

1. Создайте новый репозиторий на GitHub.
2. Загрузите туда все файлы из этой папки.
3. В Netlify нажмите **Add new site → Import an existing project**.
4. Выберите GitHub и этот репозиторий.
5. Build command: можно оставить пустым или `npm run build`.
6. Publish directory: `.`.
7. Deploy.
8. В Netlify зайдите в **Project configuration → Environment variables** и добавьте переменные.
9. Сделайте новый deploy.

## Локальная проверка

```bash
npm install
npx netlify dev
```
