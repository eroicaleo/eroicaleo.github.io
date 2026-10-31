(() => {
  'use strict';

  const storageKey = 'study-notes-theme';
  const colors = { warm: '#f6f3ec', minimal: '#ffffff', dark: '#131918' };
  const labels = { warm: 'Warm', minimal: 'Minimal', dark: 'Dark' };
  const validTheme = value => Object.prototype.hasOwnProperty.call(colors, value);
  let theme = 'warm';

  try {
    const saved = localStorage.getItem(storageKey);
    if (validTheme(saved)) theme = saved;
  } catch {
    // The switcher still works when browser storage is unavailable.
  }

  // Apply before the stylesheet loads to avoid flashing the default theme.
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';

  document.addEventListener('DOMContentLoaded', () => {
    const controls = document.getElementById('theme-controls');
    if (!controls) return;
    const buttons = controls.querySelectorAll('[data-style]');
    const status = document.getElementById('theme-status');

    function applyTheme(value, announce = false) {
      theme = validTheme(value) ? value : 'warm';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[theme]);
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.style === theme)));
      if (announce) status.textContent = `${labels[theme]} appearance selected.`;
    }

    applyTheme(theme);
    controls.hidden = false;

    buttons.forEach(button => button.addEventListener('click', () => {
      applyTheme(button.dataset.style, true);
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // Keep the current selection for this visit without requiring storage.
      }
    }));

    window.addEventListener('storage', event => {
      if (event.key === storageKey || event.key === null) applyTheme(event.newValue);
    });
  });
})();
