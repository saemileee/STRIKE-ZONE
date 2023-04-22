// eslint-disable-next-line
import DUMMY_DATA from '/js/constants/dummy.js';
// eslint-disable-next-line
import { addItemCart } from '/js/api/cartAPI.js';
// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const urlParams = new URL(location.href).searchParams;
const TEAM = urlParams.get('team');
const CATEGORY = urlParams.get('category');

if (!TEAM || !CATEGORY) {
  location.href = '/NotFound';
}

const ProductHeader = (target) => {
  target.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="products-list-header">
        <h1 class="products-team">${TEAM.toUpperCase()}</h1>
        <div class="products-category">${CATEGORY.toUpperCase()}
          <nav class="products-category-nav">
            <ul class="products-category-list">
            </ul>
          </nav>
        </div>
      </div>
    `
  );

  const DUMMY_CATEGORY = ['all', 'uniform', 'accessories', 'cap'];

  const $CategoryList = $('.products-category-list');

  DUMMY_CATEGORY.filter((item) => item !== CATEGORY).forEach((category) => {
    const CategoryItem = $createElement('li', 'products-category-item');
    CategoryItem.innerHTML = `
      <a href="/products?team=${TEAM}&category=${category}">
        ${category.toUpperCase()}
      </a>
    `;
    $CategoryList.append(CategoryItem);
  });
};

const Product = (target, { productID, name, team, img, price, rate, newest }) => {
  const isDiscount = rate > 0;
  let renderedPrice;
  if (isDiscount) renderedPrice = getDiscountPrice(price, rate);
  renderedPrice = price.toLocaleString();

  const $product = document.createElement('a');
  $product.setAttribute('href', `/products/${productID}`);
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
      ${newest ? '<span class="product-tag">신상품</span>' : ''}
    </div>
  `;

  const $cartBtn = $product.querySelector('.product-cart-button');
  $cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addItemCart(productID);
  });

  target.append($product);
};

function getDiscountPrice(price, rate) {
  return price * ((100 - rate) * 0.01);
}

const render = () => {
  const $productsWrapper = document.querySelector('.products-wrapper');
  const $products = document.querySelector('.products');
  ProductHeader($productsWrapper);
  DUMMY_DATA.forEach((item) => Product($products, item));
};

render();
