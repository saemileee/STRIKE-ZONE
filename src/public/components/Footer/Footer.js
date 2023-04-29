import { $createElement } from '/js/utils.js';

const footerElement = document.createElement('footer');
footerElement.innerHTML = `<div class="footer-wrapper"><div><h2>STRIKE ZONE</h2></div><ul><div>저자 /</div><li><a href="https://github.com/Cobocho" target="_blank">김민규</a></li><li><a href="https://github.com/LL-SS
" target="_blank">이선우</a></li><li><a href="https://github.com/saemileee" target="_blank">이새미</a></li><li><a href="https://github.com/LEEJW1953" target="_blank">이지원</a></li><li><a href="https://github.com/hdpyo" target="_blank">표후동</a></li></ul>
<p>본 사이트는 엘리스 SW트랙 4기에서 진행한 웹사이트 구축 프로젝트 용 사이트입니다.</p>
<p>© 2023. Elice SW4 Track. homerunball Team. all rights reserved.</p></div>`;

document.body.append(footerElement);

const ScrollBox = $createElement('div', 'scroll-box');

ScrollBox.innerHTML = `
  <button class="scroll-top-button">
  ▲
  </button>
  <button class="scroll-bottom-button">
  ▼
  </button>
`;

const BOTTOM_COORDINATE = Number.MAX_SAFE_INTEGER;

ScrollBox.addEventListener('click', (event) => {
  if (event.target.closest('.scroll-top-button')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (event.target.closest('.scroll-bottom-button')) {
    window.scrollTo({ top: BOTTOM_COORDINATE, behavior: 'smooth' });
  }
});

document.body.insertAdjacentElement('beforeend', ScrollBox);
