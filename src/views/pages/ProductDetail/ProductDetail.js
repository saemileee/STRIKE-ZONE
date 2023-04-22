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

function renderProductImages(productImages) {
  const $productBasicInformationContainer = $createElement(
    'div',
    'product-basic-information-container'
  );
  const $productImageViewContainer = document.querySelector(
    '.product-image-view'
  );

  const $productImageBigBox = document.querySelector('.product-image-big');
  $productImageBigBox.innerHTML = `<img src = ${productImages[0]}>`;

  const $productImageSlider = document.querySelector('.product-image-slider');
  $productImageViewContainer.append($productImageSlider);
  productImages.forEach(image => {
    const $productImageSmallBox = $createElement('div', 'product-image-small');
    const $productImageSmall = $createImage(image);
    $productImageSmallBox.append($productImageSmall);
    $productImageSlider.append($productImageSmallBox);
    $productImageSmallBox.addEventListener('mouseover', () => {
      $productImageBigBox.innerHTML = `<img src = ${image}>`;
    });
  });

  $productImageViewContainer.append($productImageBigBox);
}
function readerBasicDescription(
  team,
  name,
  shortDescription,
  price,
  rate,
  productSellingPrice
) {
  const $productTeam = document.querySelector('.product-team');
  $productTeam.innerHTML = team;

  const $productTitle = document.querySelector('.product-title');
  $productTitle.innerHTML = name;

  const $productShortDescription = document.querySelector(
    '.product-short-description'
  );
  $productShortDescription.innerHTML = shortDescription;

  const $productDiscountRate = document.querySelector('.product-discount-rate');
  $productDiscountRate.innerHTML = `${rate}%`;

  const $productPrice = document.querySelector('.product-price');
  $productPrice.innerHTML = `${price.toLocaleString()}원`;

  const $productSellingPrice = document.querySelector('.product-selling-price');
  $productSellingPrice.innerHTML = `${productSellingPrice.toLocaleString()}원`;
}
function renderPrice(price, quantity, productSellingPrice) {
  let totalAmountValue = price;
  const $productCountInput = document.querySelector('.product-count');
  $productCountInput.setAttribute('max', `${quantity}`);
  const $totalAmountValue = document.querySelector('.total-amount');
  $totalAmountValue.innerHTML = `${totalAmountValue.toLocaleString()}원`;
  $productCountInput.addEventListener('change', () => {
    totalAmountValue = productSellingPrice * $productCountInput.value;
    $totalAmountValue.innerHTML = `${totalAmountValue.toLocaleString()}원`;
  });
}
function renderBuyButtons(productId) {
  const $cartButton = document.querySelector('.cart-button');
  $cartButton.addEventListener('click', () => {
    const $productCountInput = document.querySelector('.product-count');
    addItemCart(productId, $productCountInput.value);
    if (
      confirm(
        '해당 상품이 장바구니에 추가되었습니다. 바로 장바구니를 확인하시겠습니까?'
      ) === true
    ) {
      window.location.href = '/cart';
    }
  });
}

function renderProductDetailDescription(productDetailDescription) {
  const $detailDescription = document.querySelector(
    '.product-detail-description'
  );
  $detailDescription.innerHTML = `${productDetailDescription}`;
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getProductData() {
  const productData = await fetchData('/api/v1/products/1');
  const {
    productId,
    teamName,
    name,
    price,
    rate,
    quantity,
    img,
    shortDescription,
    detailDescription,
  } = productData;
  const productSellingPrice = price * ((100 - rate) * 0.01);
  renderProductImages(img);
  readerBasicDescription(
    teamName,
    name,
    shortDescription,
    price,
    rate,
    productSellingPrice
  );
  renderPrice(price, quantity, productSellingPrice);
  renderBuyButtons(productId);
  renderProductDetailDescription(detailDescription);
}

getProductData();
