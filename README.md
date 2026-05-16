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

После апрува App Store нужно:

1. Открыть `index.html`, найти `id="app-store-cta"`.
2. Заменить `href="#"` на реальную App Store ссылку.
3. Удалить `aria-disabled="true"` (с обеих кнопок «Скачать» и «Начать триал»).
4. Опционально: убрать `.hero-cta-note` с подписью «Скоро в Mac App Store».

## Контакт

`support@itogapp.com`
