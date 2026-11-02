(() => {
  'use strict';

  // A missing remote cover reveals the local placeholder underneath it.
  document.querySelectorAll('[data-book-cover]').forEach(image => {
    image.addEventListener('error', () => { image.hidden = true; });
    if (image.complete && image.naturalWidth === 0) image.hidden = true;
  });

  const boxes = [...document.querySelectorAll('input[data-book]')];
  const key = 'math-roadmap-books-v1';
  const tracker = document.getElementById('roadmap-tracker');
  if (!tracker) return;
  const track = document.getElementById('progress-track');
  const label = document.getElementById('progress-label');
  const storageNote = document.getElementById('tracker-storage-note');
  let checked = {};

  try {
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) checked = saved;
  } catch {
    storageNote.textContent = 'Reading selections are available for this visit; browser storage is unavailable.';
  }

  function render() {
    const completed = boxes.filter(box => box.checked).length;
    const percent = boxes.length ? Math.round(100 * completed / boxes.length) : 0;
    track.value = percent;
    track.textContent = `${percent}%`;
    tracker.style.setProperty('--progress-hue', 10 + percent * 1.25);
    tracker.style.setProperty('--progress-lightness', `${70 - percent * 0.15}%`);
    label.textContent = `${completed} of ${boxes.length} reading goals marked completed`;
  }

  boxes.forEach(box => {
    box.checked = Boolean(checked[box.dataset.book]);
    box.addEventListener('change', () => {
      checked[box.dataset.book] = box.checked;
      try {
        localStorage.setItem(key, JSON.stringify(checked));
      } catch {
        storageNote.textContent = 'Reading selections are available for this visit; browser storage is unavailable.';
      }
      render();
    });
  });
  render();
})();
