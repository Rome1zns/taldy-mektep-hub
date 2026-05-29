# TaldiHub

TaldiHub — цифровой хаб школ Талдыкоргана. Платформа показывает каталог школ, новости, рейтинг, ценности и AI-помощника для навигации по школьной информации.

## Для кого

Проект рассчитан на городское образовательное сообщество: учеников, родителей, школы и управленцев, которым нужен единый публичный интерфейс для просмотра активности школ и их развития.

## Ключевые функции

- главная страница с позиционированием хаба;
- каталог школ;
- профиль школы с показателями и публикациями;
- новости;
- рейтинг школ;
- 10 ценностей развития;
- AI-chat через Supabase Edge Function;
- отдельный publications Supabase client;
- responsive UI и Matrix-style theme.

## Стек

- Vite;
- React 18;
- TypeScript;
- React Router;
- Supabase;
- Supabase Edge Functions;
- Tailwind CSS;
- shadcn/ui;
- framer-motion;
- Vitest и Playwright config.

## Архитектура

Routes описаны в `src/App.tsx`: главная, школы, профиль школы, новости и рейтинг. Данные для демо лежат в `src/data`, Supabase-клиенты — в `src/integrations/supabase`.

Скрипт `scripts/sync-publications.mjs` синхронизирует публикации в отдельный Supabase-проект при наличии service-role ключа в локальном окружении.

## Локальный запуск

```bash
cp .env.example .env
npm install
npm run dev
```

## Переменные окружения

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_PUBLICATIONS_SUPABASE_URL=
VITE_PUBLICATIONS_SUPABASE_ANON_KEY=
PUBLICATIONS_SUPABASE_URL=
PUBLICATIONS_SUPABASE_SERVICE_ROLE_KEY=
```

Реальные ключи задаются локально или в настройках Netlify/Vercel. `service_role` нельзя коммитить.

## Deploy

`netlify.toml` содержит только build/redirect настройки. Production env variables нужно задавать в Netlify dashboard.

## Проверки

```bash
npm run lint
npm run build
npm run test
```

## Статус

Публичный MVP/демо городского school hub. Перед production запуском нужно заменить mock data на проверенный источник данных и утвердить правила публикаций.

## Что демонстрирует в портфолио

- публичный civic/education интерфейс;
- работу с каталогами, рейтингами и профилями;
- Supabase Edge Function integration;
- упаковку данных в визуальный продукт.
