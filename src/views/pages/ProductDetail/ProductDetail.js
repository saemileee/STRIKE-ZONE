import DUMMY_DATA from './dummy.js';
import { addItemCart } from '/js/api/cartAPI.js';

function $createElement(elementType, className) {
  const $element = document.createElement(elementType);
  $element.className = className;
  return $element;
}

function $createImage(src) {
  const $image = document.createElement('img');
  $image.src = src;
  return $image;
}

const {
  name,
  team,
  price,
  rate,
  detailImages,
  descriptionImage,
  descriptionShortText,
} = DUMMY_DATA;

const productID = '734541';

const $productBasicInformationContainer = $createElement(
  'div',
  'product-basic-information-container'
);
const $productImageViewContainer = $createElement('div', 'product-image-view');

const $productImageBigBox = $createElement('div', 'product-image-big');
$productImageBigBox.innerHTML = `<img src = ${detailImages[0]}>`;

const $productImageSlider = $createElement('div', 'product-image-slider');
$productImageViewContainer.append($productImageSlider);
detailImages.forEach(image => {
  const $productImageSmallBox = $createElement('div', 'product-image-small');
  const $productImageSmall = $createImage(image);
  $productImageSmallBox.append($productImageSmall);
  $productImageSlider.append($productImageSmallBox);
  $productImageSmallBox.addEventListener('mouseover', () => {
    $productImageBigBox.innerHTML = `<img src = ${image}>`;
  });
});

$productImageViewContainer.append($productImageBigBox);

const $productBasicDescriptionContainer = $createElement(
  'div',
  'product-basic-description-container'
);
const $productTeam = $createElement('span', 'product-team');
$productTeam.innerHTML = team;

const $productTitle = $createElement('span', 'product-title');
$productTitle.innerHTML = name;

const $hr1 = document.createElement('hr');

const $productShortDescription = $createElement(
  'span',
  'product-short-description'
);
$productShortDescription.innerHTML = descriptionShortText;

const $hr2 = document.createElement('hr');

const $productDiscountRate = $createElement('span', 'product-discount-rate');
$productDiscountRate.innerHTML = `${rate}%`;

const $productPrice = $createElement('span', 'product-price');
$productPrice.innerHTML = `${price.toLocaleString()}원`;

const $productSellingPrice = $createElement('span', 'product-selling-price');
const productSellingPrice = price * ((100 - rate) * 0.01);
$productSellingPrice.innerHTML = `${productSellingPrice.toLocaleString()}원`;

const $productPriceInformationContainer = $createElement(
  'div',
  'product-price-information-container'
);
$productPriceInformationContainer.append(
  $productDiscountRate,
  $productPrice,
  $productSellingPrice
);

const $productCountLabel = document.createElement('label');
$productCountLabel.setAttribute('for', 'product-count');
$productCountLabel.innerHTML = '수량';

const $productCountInput = $createElement(
  'input',
  'product-count input is-info'
);
$productCountInput.setAttribute('id', 'product-count');
$productCountInput.setAttribute('type', 'number');
$productCountInput.setAttribute('value', '1');
$productCountInput.setAttribute('min', '1');

const $productCountContainer = $createElement('div', 'product-count-container');
$productCountContainer.append($productCountLabel, $productCountInput);

const $hr3 = document.createElement('hr');

const $totalAmountLabel = document.createElement('label');
$productCountLabel.setAttribute('for', 'product-count');
$totalAmountLabel.innerHTML = '주문 금액';

let totalAmountValue = productSellingPrice;
const $totalAmountValue = $createElement('span', 'total-amount');
$totalAmountValue.innerHTML = `${totalAmountValue.toLocaleString()}원`;

$productCountInput.addEventListener('change', () => {
  totalAmountValue = productSellingPrice * $productCountInput.value;
  $totalAmountValue.innerHTML = `${totalAmountValue.toLocaleString()}원`;
});

const $totalAmountContainer = $createElement('div', 'total-amount-container');
$totalAmountContainer.append($totalAmountLabel, $totalAmountValue);

const $cartButton = $createElement('button', 'cart-button button');
$cartButton.innerHTML = '장바구니';
$cartButton.addEventListener('click', () => {
  addItemCart(productID, $productCountInput.value);
  if (
    confirm(
      '해당 상품이 장바구니에 추가되었습니다. 바로 장바구니를 확인하시겠습니까?'
    ) === true
  ) {
    window.location.href = '/cart';
  }
});

const $orderButton = $createElement('button', 'order-button button is-info');
$orderButton.innerHTML = '바로구매';

const $buttonsContainer = $createElement('div', 'buttons-container');
$buttonsContainer.append($cartButton, $orderButton);

$productBasicDescriptionContainer.append(
  $productTeam,
  $productTitle,
  $hr1,
  $productShortDescription,
  $hr2,
  $productPriceInformationContainer,
  $hr3,
  $productCountContainer,
  $totalAmountContainer,
  $buttonsContainer
);

const $descriptionHeader = $createElement('li', 'is-active');
$descriptionHeader.innerHTML = '<a>상품정보</a>';

const $tabsUl = $createElement('ul', '_');
$tabsUl.append($descriptionHeader);
const $tabs = $createElement('div', 'tabs is-large');
$tabs.append($tabsUl);

const $descriptionImage = $createImage(descriptionImage);

const $detailDescriptionContainer = $createElement(
  'div',
  'detail-description-container'
);
$detailDescriptionContainer.append($tabs, $descriptionImage);

const $productDetailWrapper = document.querySelector('.product-detail-wrapper');
$productDetailWrapper.append(
  $productBasicInformationContainer,
  $detailDescriptionContainer
);
$productBasicInformationContainer.append(
  $productImageViewContainer,
  $productBasicDescriptionContainer
);
