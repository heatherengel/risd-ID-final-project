// main.js

// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle on hamburger for touch/mobile
const header = document.querySelector('.site-header');
const setH = () =>
  document.documentElement.style.setProperty('--headerH', `${header.offsetHeight}px`);
setH(); window.addEventListener('resize', setH);

// your existing toggle
document.querySelector('.menu')?.addEventListener('click', e => {
  e.preventDefault(); header.classList.toggle('open');
});
document.addEventListener('click', e => { if (!header.contains(e.target)) header.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') header.classList.remove('open'); });


function initFilterDelegation() {
  const main = document.querySelector('#main');
  if (!main) return;

  // Delegate clicks from the filter bar
  main.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn || !btn.closest('.filterbar')) return;

    const bar  = btn.closest('.filterbar');
    const grid = main.querySelector('#risd-grid');
    if (!grid) return;

    const filter = btn.dataset.filter;

    // active state
    bar.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));

    // show/hide tiles
    grid.querySelectorAll('.tile').forEach(tile => {
      const show = (filter === 'all') || (tile.dataset.cat === filter);
      tile.classList.toggle('is-hidden', !show);
    });
  });

  // Optional: hover-to-preview filter (desktop)
  main.addEventListener('mouseenter', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn || !btn.closest('.filterbar')) return;
    btn.click(); // reuse the click logic
  }, true);
}

// Run once, and again whenever your router swaps content
document.addEventListener('DOMContentLoaded', initFilterDelegation);
window.addEventListener('hashchange', () => {
  // give your router a tick to inject the HTML
  setTimeout(initFilterDelegation, 0);
});