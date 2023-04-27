import { addItemCart } from '/js/api/cartAPI.js';
import { fetchData } from '/js/api/api.js';
import { setDiscount } from '/js/utils.js';

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
  const $productImageViewContainer = document.querySelector('.product-image-view');

  const $productImageBigBox = document.querySelector('.product-image-big');
  $productImageBigBox.innerHTML = `<img src = ${productImages[0]}>`;

  const $productImageSlider = document.querySelector('.product-image-slider');
  $productImageViewContainer.append($productImageSlider);
  productImages.forEach((image) => {
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
function readerBasicDescription(team, name, shortDescription, price, rate) {
  const $productTeam = document.querySelector('.product-team');
  $productTeam.innerHTML = team;

  const $productTitle = document.querySelector('.product-title');
  $productTitle.innerHTML = name;

  const $productShortDescription = document.querySelector('.product-short-description');
  $productShortDescription.innerHTML = shortDescription;
  const $productDiscountRate = document.querySelector('.product-discount-rate');
  const $productPrice = document.querySelector('.product-price');

  if (rate !== 0) {
    $productDiscountRate.innerHTML = `${rate}%`;
    $productPrice.innerHTML = `${price.toLocaleString()}원`;
  } else {
    $productDiscountRate.style.display = 'none';
    $productPrice.style.display = 'none';
  }

  const $productSellingPrice = document.querySelector('.product-selling-price');
  $productSellingPrice.innerHTML = `${setDiscount(price, rate).toLocaleString()}원`;
}
function renderPrice(inventory, productSellingPrice) {
  let totalAmountValue = productSellingPrice;
  const $productCountInput = document.querySelector('.product-count');
  $productCountInput.setAttribute('max', `${inventory}`);
  const $totalAmountValue = document.querySelector('.total-amount');
  $totalAmountValue.innerHTML = `${totalAmountValue.toLocaleString()}원`;
  $productCountInput.addEventListener('change', () => {
    totalAmountValue = productSellingPrice * $productCountInput.value;
    $totalAmountValue.innerHTML = `${totalAmountValue.toLocaleString()}원`;
  });
}
function renderBuyButtons(productId, inventory) {
  const $productCountInput = document.querySelector('.product-count');
  const $cartButton = document.querySelector('.cart-button');
  $cartButton.addEventListener('click', () => {
    const quantity = $productCountInput.value;
    if (quantity < inventory && quantity > 0) {
      addItemCart(productId, quantity);
      if (
        confirm('해당 상품이 장바구니에 추가되었습니다. 바로 장바구니를 확인하시겠습니까?') === true
      ) {
        window.location.href = '/cart';
      }
    } else {
      quantity > inventory && quantity > 0
        ? alert('주문 가능한 최대 수량을 초과하였습니다.')
        : alert('최소 1개 이상의 수량을 선택해 주세요.');
    }
  });

  const orderButton = document.querySelector('.order-button');
  orderButton.addEventListener('click', () => {
    const quantity = $productCountInput.value;
    if (quantity < inventory && quantity > 0) {
      window.location.href = `/order?cart=false&id=${productId}&quantity=${quantity}`;
    } else {
      quantity > inventory && quantity > 0
        ? alert('주문 가능한 최대 수량을 초과하였습니다.')
        : alert('최소 1개 이상의 수량을 선택해 주세요.');
    }
  });
}
function renderProductDetailDescription(productDetailDescription) {
  const $detailDescription = document.querySelector('.product-detail-description');
  $detailDescription.innerHTML = `<img src='${productDetailDescription}'/>`;
}

async function getProductData() {
  const selectedProductId = await window.location.pathname.split('/')[2];
  const productData = await fetchData(`/products/${selectedProductId}`);
  if (!productData) {
    alert('존재하지 않는 상품입니다.');
    window.history.back();
  }
  const {
    productId,
    teamName,
    name,
    price,
    rate,
    inventory,
    img,
    shortDescription,
    detailDescription,
  } = productData;
  const productSellingPrice = price * ((100 - rate) * 0.01);
  renderProductImages(img);
  readerBasicDescription(teamName, name, shortDescription, price, rate, productSellingPrice);
  renderPrice(inventory, productSellingPrice);

  if (inventory > 0) {
    renderBuyButtons(productId, inventory);
    renderProductDetailDescription(detailDescription);
  } else if (inventory === 0) {
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer.innerHTML = '';
    const soldoutButton = renderSoldoutButtons();
    buttonsContainer.append(soldoutButton);
  }
}

function renderSoldoutButtons() {
  const soldoutButton = document.createElement('button');
  soldoutButton.innerHTML = '품절 된 상품입니다.';
  soldoutButton.className = 'soldout-button Disabled button';
  soldoutButton.setAttribute('disabled', '');
  return soldoutButton;
}

getProductData();
