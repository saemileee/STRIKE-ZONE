const mainBannerElement = document.querySelector('.main-banner');
const bannerContentElement = document.querySelector('.banner-content');

const DUMMY_DATA = [
  {
    mainText: `NO LIMITS<br/>AMAZING LANDERS`,
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/ssg-landers.png',
    backgroundText: `SSG LANDERS`,
  },
  {
    mainText: `We go up,<br/>Win the championship`,
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/kiwoom.png',
    backgroundText: `KIWOOM HEROES`,
  },
  {
    mainText: `압도하라 Always<br/>KIA TIGERS`,
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/kia.png',
    backgroundText: `KIA TIGERS`,
  },
  {
    mainText: `Win or Wow`,
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/samsung.png',
    backgroundText: `SAMSUNG LIONS`,
  },
];

const arrowButtonsElement = document.createElement('div');
arrowButtonsElement.className = 'arrow-buttons';
const prevArrowButtonElement = document.createElement('button');
prevArrowButtonElement.className = 'prev-button';
prevArrowButtonElement.innerHTML = `<i class="fa fa-chevron-left" style="font-size: 36px"></i>`;
const nextArrowButtonElement = document.createElement('button');
nextArrowButtonElement.innerHTML = `<i class="fa fa-chevron-right" style="font-size: 36px"></i>`;
nextArrowButtonElement.className = 'next-button';

let currentBannerIndex = 0;

function renderBannerContents() {
  const { mainText, teamPageURL, mainImage, backgroundText } =
    DUMMY_DATA[currentBannerIndex];

  const bannerContentLeftElement = document.createElement('div');
  bannerContentLeftElement.className = 'banner-content-left';
  bannerContentLeftElement.innerHTML = `<span class="main-text">${mainText}</span>`;

  const CTAButtonElement = document.createElement('button');
  CTAButtonElement.className = 'CTA-button';
  CTAButtonElement.innerHTML = 'SHOP NOW';
  CTAButtonElement.addEventListener('click', () => {
    window.location.href = teamPageURL;
  });

  bannerContentLeftElement.append(CTAButtonElement);

  const bannerImageElement = document.createElement('div');
  bannerImageElement.className = 'main-image';
  bannerImageElement.innerHTML = `<div class="main-image"><img src=${mainImage} /></div>`;

  const backgroundTextElement = document.createElement('div');
  backgroundTextElement.className = 'background-text';
  const backgroundTextTopElements = backgroundText
    .split(' ')[0]
    .split('')
    .map(
      (character, index) =>
        `<span style="animation-duration:${
          0.5 + index / 10
        }s">${character}</span>`
    )
    .join('');

  const backgroundTextBottomElements = backgroundText
    .split(' ')[1]
    .split('')
    .map(
      (character, index) =>
        `<span style="animation-duration:${
          0.5 + index / 10
        }s">${character}</span>`
    )
    .join('');
  backgroundTextElement.innerHTML = `${backgroundTextTopElements}<br /> ${backgroundTextBottomElements}`;

  bannerContentElement.innerHTML = '';
  bannerContentElement.append(
    bannerContentLeftElement,
    bannerImageElement,
    backgroundTextElement
  );
}

function prevArrowButtonClickHandler() {
  if (currentBannerIndex === 0) {
    currentBannerIndex = DUMMY_DATA.length - 1;
  } else {
    currentBannerIndex -= 1;
  }
  renderBannerContents();
}

function nextArrowButtonClickHandler() {
  if (currentBannerIndex === DUMMY_DATA.length - 1) {
    currentBannerIndex = 0;
  } else {
    currentBannerIndex += 1;
  }
  renderBannerContents();
}

renderBannerContents();

prevArrowButtonElement.addEventListener('click', prevArrowButtonClickHandler);
nextArrowButtonElement.addEventListener('click', nextArrowButtonClickHandler);

arrowButtonsElement.append(prevArrowButtonElement, nextArrowButtonElement);
mainBannerElement.append(arrowButtonsElement);

setInterval(() => nextArrowButtonClickHandler(), 6000);
