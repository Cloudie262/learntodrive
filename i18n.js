/* Learn2Drive shared i18n and theme preferences. No network/backend required. */
(() => {
  'use strict';
  const languageKey = 'learn2driveLanguage';
  const themeKey = 'learn2driveTheme';
  const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const write = (key, value) => { try { if (localStorage.getItem(key) !== value) localStorage.setItem(key, value); } catch {} };
  let language = read(languageKey, 'my') === 'en' ? 'en' : 'my';
  let theme = read(themeKey, 'light') === 'dark' ? 'dark' : 'light';
  const adapters = [];
  let ready = false;
  const messages = { en: {}, my: {} };
  const messageNodes = new WeakMap();
  const navigation = {
    'index.html': ['Home', 'ပင်မစာမျက်နှာ'],
    'Knowledge.html': ['Knowledge Sharing', 'ဗဟုသုတ မျှဝေခြင်း'],
    'portal.html': ['Practice Test', 'လေ့ကျင့်ခန်း စာမေးပွဲ'],
    'roadsign.html': ['Road Signs', 'လမ်းအမှတ်အသားများ'],
    'hotline.html': ['Hotline', 'အရေးပေါ် ဖုန်းနံပါတ်များ'],
    'profile.html': ['My Profile', 'ကျွန်ုပ်၏ ပရိုဖိုင်']
  };
  function t(key, values = {}) {
    return String(messages[language][key] ?? messages.en[key] ?? key).replace(/\{(\w+)\}/g, (m, k) => values[k] ?? m);
  }
  function text(el, value) {
    if (value == null || el.textContent.trim() === value.trim()) return;
    const icons = [...el.children].filter(child => child.matches('i, svg'));
    if (!icons.length) el.textContent = value;
    else {
      [...el.childNodes].filter(child => !icons.includes(child)).forEach(child => child.remove());
      el.append(document.createTextNode(' ' + value));
    }
  }
  function translateDOM() {
    const reverse = Object.fromEntries(Object.entries(messages.my).map(([key, value]) => [value, key]));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest('script,style,textarea,input,[data-en],[data-i18n],#profileName,#profileUsername,#displayUsername,[data-legacy-setting]')) continue;
      const clean = node.nodeValue.trim();
      const previous = messageNodes.get(node);
      const key = previous && clean === previous.output ? previous.key : (messages.en[clean] !== undefined ? clean : reverse[clean]);
      if (key) {
        const value = t(key);
        messageNodes.set(node, {key, output: value});
        if (value !== clean) node.nodeValue = node.nodeValue.replace(clean, value);
      }
    }
    document.querySelectorAll('[data-en][data-mm], [data-en][data-my]').forEach(el => {
      text(el, language === 'en' ? el.dataset.en : el.dataset.mm ?? el.dataset.my);
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (messages[language][el.dataset.i18n] !== undefined) text(el, t(el.dataset.i18n));
    });
    document.querySelectorAll('.sidebar .menu a').forEach(el => {
      const name = (el.getAttribute('href') || '').split('/').pop();
      if (navigation[name]) text(el, navigation[name][language === 'my' ? 1 : 0]);
    });
  }
  function applyTheme() {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    if (!document.body) return;
    for (const cls of ['l2d-dark', 'dark-theme', 'article-dark', 'dark']) document.body.classList.toggle(cls, theme === 'dark');
    document.body.dataset.theme = theme;
  }
  function controls() {
    if (!isHome) return;
    const lang = document.getElementById('l2dLangToggle');
    const btn = document.getElementById('l2dThemeBtn');
    if (lang) {
      text(lang, language === 'my' ? '🇬🇧' : '🇲🇲');
      lang.title = language === 'my' ? 'Switch to English' : 'မြန်မာဘာသာသို့ ပြောင်းရန်';
      lang.setAttribute('aria-label', lang.title);
    }
    if (btn) {
      text(document.getElementById('l2dThemeIcon') || btn, theme === 'dark' ? '☀️' : '🌙');
      btn.title = language === 'my' ? (theme === 'dark' ? 'အလင်းပုံစံသို့ ပြောင်းရန်' : 'အမှောင်ပုံစံသို့ ပြောင်းရန်') : (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-label', btn.title);
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }
  function apply() {
    applyTheme();
    if (!ready) return;
    for (const adapter of adapters) adapter({ language, theme });
    applyTheme();
    translateDOM();
    controls();
    window.dispatchEvent(new CustomEvent('l2dLanguageChanged', { detail: { language } }));
    window.dispatchEvent(new CustomEvent('l2dThemeChanged', { detail: { theme } }));
  }
  function change(nextLanguage, nextTheme) {
    language = nextLanguage === 'en' ? 'en' : 'my';
    theme = nextTheme === 'dark' ? 'dark' : 'light';
    write(languageKey, language); write(themeKey, theme);
    apply();
  }
  const isHome = /(?:\/|\/index\.html?)$/i.test(location.pathname);
  window.L2DI18n = {
    t,
    get language() { return language; },
    get theme() { return theme; },
    register(fn) { adapters.push(fn); if (ready) fn({ language, theme }); },
    addMessages(locale, entries) { Object.assign(messages[locale], entries); },
    setLanguage(value) { change(value, theme); },
    setTheme(value) { change(language, value); }
  };
  // Seed defaults before any existing page script reads preferences.
  write(languageKey, language); write(themeKey, theme); applyTheme();
  document.addEventListener('DOMContentLoaded', () => queueMicrotask(() => {
    ready = true;
    if (isHome) {
      document.getElementById('l2dLangToggle')?.addEventListener('click', event => {
        event.stopImmediatePropagation(); change(language === 'my' ? 'en' : 'my', theme);
      }, true);
      document.getElementById('l2dThemeBtn')?.addEventListener('click', event => {
        event.stopImmediatePropagation(); change(language, theme === 'light' ? 'dark' : 'light');
      }, true);
    }
    apply();
    // Covers asynchronously loaded sidebars and newly created profile/demo labels.
    const observer = new MutationObserver(() => { observer.disconnect(); translateDOM(); observer.observe(document.body, { subtree: true, childList: true, characterData: true }); });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
  }));
  window.addEventListener('storage', event => {
    if (event.key === languageKey || event.key === themeKey || event.key === null) {
      language = read(languageKey, 'my') === 'en' ? 'en' : 'my';
      theme = read(themeKey, 'light') === 'dark' ? 'dark' : 'light';
      apply();
    }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) change(read(languageKey, 'my'), read(themeKey, 'light'));
  });
})();
