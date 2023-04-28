import { fetchData } from '/js/api/api.js';
import { isLogin, getUserInfo } from '/js/api/authAPI.js';
import Product from '/components/Product/Product.js';

const mainBannerElement = document.querySelector('.main-banner');
const bannerContentElement = document.querySelector('.banner-content');
const productsContainer = document.querySelector('.product-contents-container');

const BANNER_DATA = [
  {
    mainText: 'NO LIMITS<br/>AMAZING LANDERS',
    subText: 'SSG 랜더스',
    teamPageURL: '/products/?team=ssg-landers&category=all',
    mainImage: '/assets/img/main/banner/ssg-landers.png',
    backgroundText: 'SSG LANDERS',
  },
  {
    mainText: 'We go up,<br/>Win the championship',
    subText: '키움 히어로즈',
    teamPageURL: '/products/?team=kiwoom-heroes&category=all',
    mainImage: '/assets/img/main/banner/kiwoom.png',
    backgroundText: 'KIWOOM HEROES',
  },
  {
    mainText: '압도하라 Always<br/>KIA TIGERS',
    subText: '기아 타이거즈',
    teamPageURL: '/products/?team=kia-tigers&category=all',
    mainImage: '/assets/img/main/banner/kia.png',
    backgroundText: 'KIA TIGERS',
  },
  {
    mainText: 'Win or Wow',
    subText: '삼성 라이온즈',
    teamPageURL: '/products/?team=samsung-lions&category=all',
    mainImage: '/assets/img/main/banner/samsung.png',
    backgroundText: 'SAMSUNG LIONS',
  },
];

const arrowButtonsElement = document.createElement('div');
arrowButtonsElement.className = 'arrow-buttons';
const prevArrowButtonElement = document.createElement('button');
prevArrowButtonElement.className = 'prev-button';
prevArrowButtonElement.innerHTML =
  '<i class="fa fa-chevron-left" style="font-size: 36px"></i>';
const nextArrowButtonElement = document.createElement('button');
nextArrowButtonElement.innerHTML =
  '<i class="fa fa-chevron-right" style="font-size: 36px"></i>';
nextArrowButtonElement.className = 'next-button';

function renderSlideBanner() {
  const SLIDE_AUTO_PLAY_TIME = 5000;
  let currentBannerIndex = 0;
  let slideAutoPlayTimer;

  function renderBannerContents() {
    clearInterval(slideAutoPlayTimer);
    slideAutoPlayTimer = setInterval(
      () => nextArrowButtonClickHandler(),
      SLIDE_AUTO_PLAY_TIME
    );
    const { mainText, subText, teamPageURL, mainImage, backgroundText } =
      BANNER_DATA[currentBannerIndex];

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
    bannerImageElement.innerHTML = `<div class="main-image"><img src=${mainImage} alt="${backgroundText}" /></div>`;

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
      currentBannerIndex = BANNER_DATA.length - 1;
    } else {
      currentBannerIndex -= 1;
    }
    renderBannerContents();
  }

  function nextArrowButtonClickHandler() {
    if (currentBannerIndex === BANNER_DATA.length - 1) {
      currentBannerIndex = 0;
    } else {
      currentBannerIndex += 1;
    }
    renderBannerContents();
  }

  mainBannerElement.addEventListener('mouseenter', () => {
    clearInterval(slideAutoPlayTimer);
  });

  mainBannerElement.addEventListener('mouseleave', () => {
    clearInterval(slideAutoPlayTimer);
    slideAutoPlayTimer = setInterval(() => {
      nextArrowButtonClickHandler();
    }, SLIDE_AUTO_PLAY_TIME);
  });

  prevArrowButtonElement.addEventListener('click', () => {
    prevArrowButtonClickHandler();
  });

  nextArrowButtonElement.addEventListener('click', () => {
    nextArrowButtonClickHandler();
  });

  arrowButtonsElement.append(prevArrowButtonElement, nextArrowButtonElement);
  mainBannerElement.append(arrowButtonsElement);
}
renderSlideBanner();

// 상품 콘텐츠
const products = await fetchData('/products');
const userData = await getUserInfo();
const loginStatus = await isLogin();

// 관련 상품 렌더링
function renderRelatedProducts() {
  const { koreanName, cheerTeam } = userData;

  const filteringRelatedProducts = products.filter(
    product => product.teamId === cheerTeam.teamId
  );
  filteringRelatedProducts.length > 3 ? paintDocuments() : null;

  function paintDocuments() {
    const productsContents = document.createElement('section');
    productsContents.className = 'product-list-container related';
    productsContents.innerHTML = `<h3 class="title">${koreanName}님이 응원하는 ${cheerTeam.teamName}에서 새로 나왔어요!</h3>
  <div class="products"></div>`;
    productsContainer.prepend(productsContents);

    function ProductBySort() {
      const filteringNewProductsSorting = filteringRelatedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      for (let i = 0; i < 4; i++) {
        Product(
          document.querySelector('.related .products'),
          filteringNewProductsSorting[i]
        );
      }
    }
    ProductBySort();
  }
}

// 로그인 여부 확인하여 관련 상품 띄우기
loginStatus ? renderRelatedProducts() : null;

productsContainer.insertAdjacentHTML(
  'beforeend',
  `
  <section class="product-list-container new">
    <h3 class="title">따끈따끈한 신상 굿즈</h3>
    <div class="products"></div>
  </section>
  <section class="product-list-container discounted">
    <h3 class="title">놓치기 아쉬운 할인 굿즈</h3>
    <div class="products"></div>
  </section>

`
);

// 신상품 렌더링
function renderNewProducts() {
  const newProductsSorting = products.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  for (let i = 0; i < 4; i++) {
    Product(document.querySelector('.new .products'), newProductsSorting[i]);
  }
}
renderNewProducts();

// 할인률 순 렌더링
function renderDiscountProducts() {
  const newProductsSorting = products.sort((a, b) => b.rate - a.rate);

  for (let i = 0; i < 4; i++) {
    Product(
      document.querySelector('.discounted .products'),
      newProductsSorting[i]
    );
  }
}
renderDiscountProducts();
