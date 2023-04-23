import { fetchData } from '/js/api/api.js';
import { isLogin, getUserInfo } from '/js/api/authAPI.js';

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

function getDiscountPrice(price, rate) {
  return price * ((100 - rate) * 0.01);
}

const renderProducts = (
  target,
  { productId, name, teamName, img, price, rate }
) => {
  const isDiscount = rate > 0;
  let renderedPrice;
  if (isDiscount) renderedPrice = getDiscountPrice(price, rate);
  renderedPrice = price.toLocaleString();

  const $product = document.createElement('a');
  $product.setAttribute('href', `/products/${productId}`);
  $product.className = 'product';

  $product.innerHTML = `
    <div class="product-image">
      <img src="${img[0]}" alt="${name}">
    </div>
    <div class="product-content">
      <button class="product-cart-button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <h1 class="product-header">
        <span class="product-header-team">${teamName}</span>
        <span class="product-header-name">${name}</span>
      </h1>
      <div class="product-price">
        ${isDiscount ? `<em class="product-price-rate">${rate}%</em>` : ''}
        <p class="product-price">${renderedPrice}원</p>
      </div>
    </div>
  `;

  const $cartBtn = $product.querySelector('.product-cart-button');
  $cartBtn.addEventListener('click', e => {
    e.preventDefault();
    addItemCart(productID);
  });

  target.append($product);
};

const products = await fetchData('/products');
const userData = await getUserInfo();
const loginStatus = await isLogin();

function renderRelatedProducts() {
  const { koreanName, cheerTeam } = userData;
  const productsContainer = document.querySelector(
    '.product-contents-container'
  );

  const filteringRelatedProducts = products.filter(
    product => product.teamId === cheerTeam.teamId
  );
  filteringRelatedProducts.length > 3 ? paintDocuments() : null;

  function paintDocuments() {
    const productsContents = document.createElement('section');
    productsContents.className = 'product-list-contianer related';
    productsContents.innerHTML = `<h3 class="title is-3">${koreanName}님이 응원하는 ${cheerTeam.teamName}에서 새로 나왔어요!</h3>
  <div class="products"></div>`;
    productsContainer.prepend(productsContents);

    function renderProductsBySort() {
      const filteringNewProductsSorting = filteringRelatedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      for (let i = 0; i < 4; i++) {
        renderProducts(
          document.querySelector('.related .products'),
          filteringNewProductsSorting[i]
        );
      }
    }
    renderProductsBySort();
  }
}

//로그인 여부 확인하여 관련 상품 띄우기
loginStatus ? renderRelatedProducts() : null;

function renderNewProducts() {
  const newProductsSorting = products.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  for (let i = 0; i < 4; i++) {
    renderProducts(
      document.querySelector('.new .products'),
      newProductsSorting[i]
    );
  }
}
renderNewProducts();

function renderDiscountProducts() {
  const newProductsSorting = products.sort(
    (a, b) => new Date(b.rate) - new Date(a.rate)
  );

  for (let i = 0; i < 4; i++) {
    renderProducts(
      document.querySelector('.popular .products'),
      newProductsSorting[i]
    );
  }
}

renderDiscountProducts();
