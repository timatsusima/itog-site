# itog-site

Маркетинговый сайт для приложения [Itog](https://itogapp.com) — AI meeting recorder для macOS.

Хостится на **Cloudflare Pages**. Домен: **itogapp.com**.

## Структура

```
.
├── index.html              # лендинг
├── privacy.html            # политика конфиденциальности (RU/EN)
├── terms.html              # пользовательское соглашение (RU/EN)
├── support.html            # FAQ + контакт (RU/EN)
├── 404.html
├── assets/
│   ├── styles.css          # общий CSS для всех страниц
│   ├── i18n.js             # переключатель RU/EN через ?lang=
│   ├── favicon.svg
│   └── images/
│       ├── og.png          # OpenGraph превью
│       └── sources/        # скриншоты приложения
├── _headers                # Cloudflare Pages: cache + security headers
├── _redirects              # /privacy → /privacy.html, www → apex
├── CNAME                   # itogapp.com (для совместимости)
├── robots.txt
└── sitemap.xml
```

Никакого build-step нет — это статика, обслуживается Cloudflare Pages напрямую из репозитория.

## Локальная разработка

```bash
python3 -m http.server 8000
# открыть http://localhost:8000
```

Переключатель языка работает через URL-параметр: `?lang=ru` или `?lang=en`. По умолчанию — `ru`.

## Деплой

Cloudflare Pages автодеплоит при push в `master`:

- **Build command**: пусто
- **Build output directory**: `/`
- **Custom domain**: `itogapp.com` (DNS в Cloudflare)

App Store ссылка: https://apps.apple.com/app/itog/id6767314441 (live с 2026-05-24, апрувнуто). Обе CTA в `index.html` (`id="app-store-cta"` в hero + кнопка в `#pricing`) уже ведут туда.

## Контакт

`support@itogapp.com`
