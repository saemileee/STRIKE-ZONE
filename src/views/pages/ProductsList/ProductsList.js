import DUMMY_DATA from './dummy.js';

const addHeader = (target) => {
  const urlParams = new URL(location.href).searchParams;
  const currentCategory = urlParams.get('category');
  if (!currentCategory) return;
  target.insertAdjacentHTML(
    'afterbegin',
    `
      <header class="products-list-header">
        <h1 class="products-category">${currentCategory}</h1>
      </header>
    `
  );
};

const addProduct = (target, { productID, name, team, img, price, rate, newest }) => {
  const isDiscount = rate > 0;
  let renderedPrice;
  if (isDiscount) renderedPrice = getDiscountPrice(price, rate);
  renderedPrice = price.toLocaleString();

  const $product = document.createElement('a');
  $product.setAttribute('href', `/product/${productID}`);
  $product.className = 'product';

  $product.innerHTML = `
    <div class="product-image">
      <img src="${img}" alt="${name}">
    </div>
    <div class="product-content">
      <button class="product-cart-button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <h1 class="product-header">
        <span class="product-header-team">${team}</span>
        <span class="product-header-name">${name}</span>
      </h1>
      <div class="product-price">
        ${isDiscount ? `<em class="product-price-rate">${rate}%</em>` : ''}
        <p class="product-price">${renderedPrice}원</p>
      </div>
      ${newest ? '<span class="tag">신상품</span>' : ''}
    </div>
  `;

  const $cartBtn = $product.querySelector('.product-cart-button');
  $cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('장바구니 추가');
  });

  target.append($product);
};

function getDiscountPrice(price, rate) {
  return price * ((100 - rate) * 0.01);
}

const render = () => {
  const $productsWrapper = document.querySelector('.products-wrapper');
  const $products = document.querySelector('.products');
  addHeader($productsWrapper);
  DUMMY_DATA.forEach((item) => addProduct($products, item));
};

render();
