import Product from '/components/Product/Product.js';
import { $, $createElement } from '/js/utils.js';
import DUMMY_DATA from '/js/constants/dummy.js';

const urlParams = new URL(location.href).searchParams;
const TEAM = urlParams.get('team');
const CURRENT_CATEGORY = urlParams.get('category');

if (!TEAM || !CURRENT_CATEGORY) {
  location.href = '/NotFound';
}

const ProductHeader = async (target) => {
  target.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="products-list-header">
        <h1 class="products-team">${TEAM.toUpperCase()}</h1>
        <div class="products-category">${CURRENT_CATEGORY.toUpperCase()}
          <nav class="products-category-nav">
            <ul class="products-category-list">
            </ul>
          </nav>
        </div>
      </div>
    `
  );

  const CATEGORIES = await fetch(`/api/v1/teams/${TEAM}/categories`).then((res) => res.json());

  const $CategoryList = $('.products-category-list');

  CATEGORIES.filter(({ categoryName }) => categoryName !== CURRENT_CATEGORY).forEach(
    ({ categoryName }) => {
      const CategoryItem = $createElement('li', 'products-category-item');
      CategoryItem.innerHTML = `
      <a href="/products?team=${TEAM}&category=${categoryName}">
        ${categoryName.toUpperCase()}
      </a>
    `;
      $CategoryList.append(CategoryItem);
    }
  );
};

const render = async () => {
  const $productsWrapper = document.querySelector('.products-wrapper');
  const $products = document.querySelector('.products');
  ProductHeader($productsWrapper);
  const products = await fetch('/api/v1/products').then((res) => res.json());
  products.forEach((item) => Product($products, item));
};

render();
