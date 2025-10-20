// risd.js

document.addEventListener('click', (e) => {
  const btn = e.target.closest('#pg-wrapper.risd .filter');
  if (!btn) return;

  const wrapper = btn.closest('#pg-wrapper.risd');
  const buttons = wrapper.querySelectorAll('.filter');
  const tiles = wrapper.querySelectorAll('#risd-grid .tile');

  // Set active state
  buttons.forEach(b => b.classList.toggle('active', b === btn));

  // Apply filter
  const cat = btn.dataset.filter; // "all" | "digital" | "analog"
  tiles.forEach(tile => {
    const show = (cat === 'all') || (tile.dataset.cat === cat);
    tile.classList.toggle('is-hidden', !show);
  });
});