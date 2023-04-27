import { $createElement } from '/js/utils.js';

const ScrollBox = $createElement('div', 'scroll-box');

ScrollBox.innerHTML = `
  <button class="scroll-top-button">
    <i class="fa-solid fa-chevron-up"></i>
  </button>
  <button class="scroll-bottom-button">
    <i class="fa-solid fa-chevron-down"></i>
  </button>
`;

const BOTTOM_COORDINATE = document.body.scrollHeight + 600;

ScrollBox.addEventListener('click', (event) => {
  if (event.target.closest('.scroll-top-button')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (event.target.closest('.scroll-bottom-button')) {
    window.scrollTo({ top: BOTTOM_COORDINATE, behavior: 'smooth' });
  }
});

document.body.insertAdjacentElement('beforeend', ScrollBox);
