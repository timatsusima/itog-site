// Itog landing i18n — URL-param-driven, no localStorage.
// Dictionary lives in window.I18N (set by index.html before this script runs).
// Legal/support pages use [data-lang-only="ru|en"] blocks instead of data-i18n keys.

(function () {
  const DEFAULT_LANG = 'ru';
  const SUPPORTED = ['ru', 'en'];

  function readLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;
    return DEFAULT_LANG;
  }

  function writeLangToUrl(lang) {
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());
  }

  function applyKeys(lang) {
    const dict = window.I18N && window.I18N[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val == null) return;
      if (key.endsWith('.html')) el.innerHTML = val;
      else el.textContent = val;
    });
  }

  function applyToggleUi(lang) {
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach((b) => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  function applyInternalLinks(lang) {
    // For internal links (same-origin, absolute path), propagate ?lang=
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      // Skip external
      try {
        const u = new URL(href, location.href);
        if (u.origin !== location.origin) return;
        // Skip anchors handled separately
        if (u.pathname === location.pathname && !u.searchParams.has('lang') && u.hash) return;
        u.searchParams.set('lang', lang);
        a.setAttribute('href', u.pathname + u.search + u.hash);
      } catch (_) {
        /* relative parsing failure — ignore */
      }
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    document.documentElement.lang = lang;
    applyKeys(lang);
    applyToggleUi(lang);
    applyInternalLinks(lang);
    writeLangToUrl(lang);
  }

  function init() {
    setLang(readLang());

    document.querySelectorAll('.lang-toggle button[data-lang]').forEach((b) => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });

    // Smooth-scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href.length <= 1) return;
        const t = document.querySelector(href);
        if (!t) return;
        e.preventDefault();
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - 70,
          behavior: 'smooth',
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
