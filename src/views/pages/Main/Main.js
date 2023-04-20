const mainBannerElement = document.querySelector('.main-banner');
const bannerContentElement = document.querySelector('.banner-content');

const DUMMY_DATA = [
  {
    mainText: `NO LIMITS<br/>AMAZING LANDERS`,
    subText: 'SSG 랜더스',
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/ssg-landers.png',
    backgroundText: `SSG LANDERS`,
  },
  {
    mainText: `We go up,<br/>Win the championship`,
    subText: '키움 히어로즈',
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/kiwoom.png',
    backgroundText: `KIWOOM HEROES`,
  },
  {
    mainText: `압도하라 Always<br/>KIA TIGERS`,
    subText: '기아 타이거즈',
    teamPageURL: '#',
    mainImage: '/assets/img/main/banner/kia.png',
    backgroundText: `KIA TIGERS`,
  },
  {
    mainText: `Win or Wow`,
    subText: '삼성 라이온즈',
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
  const { mainText, subText, teamPageURL, mainImage, backgroundText } =
    DUMMY_DATA[currentBannerIndex];

  const bannerContentLeftElement = document.createElement('div');
  bannerContentLeftElement.className = 'banner-content-left';
  bannerContentLeftElement.innerHTML = `<span class="sub-text">${subText}</span><span class="main-text">${mainText}</span>`;

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

  function backgroundTextElements(textIndex) {
    return backgroundText
      .split(' ')
      [textIndex].split('')
      .map((character, index) => {
        const TEXT_ANIMATION_DURATION = 0.5 + index / 10;
        return `<span style="animation-duration:${TEXT_ANIMATION_DURATION}s">${character}</span>`;
      })
      .join('');
  }

  backgroundTextElement.innerHTML = `${backgroundTextElements(
    0
  )}<br /> ${backgroundTextElements(1)}`;

  bannerContentElement.innerHTML = '';
  bannerContentElement.append(
    bannerContentLeftElement,
    bannerImageElement,
    backgroundTextElement
  );
}
renderBannerContents();

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

const SLIDE_AUTO_PLAY_TIME = 5000;
let slideAutoPlayTimer = setInterval(
  () => nextArrowButtonClickHandler(),
  SLIDE_AUTO_PLAY_TIME
);

mainBannerElement.addEventListener('mouseover', () => {
  clearInterval(slideAutoPlayTimer);
});

mainBannerElement.addEventListener('mouseout', () => {
  slideAutoPlayTimer = setInterval(() => {
    nextArrowButtonClickHandler(); // 다음 슬라이드를 보여주는 함수
  }, SLIDE_AUTO_PLAY_TIME);
});

prevArrowButtonElement.addEventListener('click', prevArrowButtonClickHandler);
nextArrowButtonElement.addEventListener('click', nextArrowButtonClickHandler);

arrowButtonsElement.append(prevArrowButtonElement, nextArrowButtonElement);
mainBannerElement.append(arrowButtonsElement);
