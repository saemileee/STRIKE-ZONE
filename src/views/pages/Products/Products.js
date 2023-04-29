import Product from '/components/Product/Product.js';
import { $createElement } from '/js/utils.js';

const urlParams = new URL(location.href).searchParams;
const TEAM = urlParams.get('team');
const CURRENT_CATEGORY = urlParams.get('category');
const SORT = urlParams.get('sort');
const SEARCH_VALUE = urlParams.get('search');

const [RECENT, PRICE_ASC, PRICE_DES, RATE_DES] = [
  'recent',
  'price-asc',
  'price-des',
  'rate-des',
];

if (!SORT)
  location.href = `/products/?team=${TEAM}&category=${CURRENT_CATEGORY}&sort=${RECENT}`;

if (!TEAM || !CURRENT_CATEGORY) {
  location.href = '/NotFound';
}

const ProductHeader = async target => {
  const Header = $createElement('div', 'products-list-header');
  if (TEAM === 'all' && CURRENT_CATEGORY === 'all') {
    Header.innerHTML = `
    <h1 class="title is-4 search-result">'${SEARCH_VALUE}'의 검색 결과입니다.</h1>
  `;
  } else {
    Header.innerHTML = `
    <h1 class="products-team">${TEAM.toUpperCase()}</h1>
    <div class="products-category">${CURRENT_CATEGORY.toUpperCase()}
      <nav class="products-category-nav">
        <ul class="products-category-list">
        </ul>
      </nav>
    </div>
  `;
  }

  const CATEGORIES = await fetch(`/api/v1/teams/${TEAM}/categories`).then(res =>
    res.json()
  );
  CATEGORIES.push('all');

  const $CategoryList = Header.querySelector('.products-category-list');

  if (TEAM !== 'all') {
    CATEGORIES.filter(category => category !== CURRENT_CATEGORY).forEach(
      category => {
        const CategoryItem = $createElement('li', 'products-category-item');
        CategoryItem.innerHTML = `
      <a href="/products?team=${TEAM}&category=${category}">
        ${category.toUpperCase()}
      </a>
    `;
        $CategoryList.append(CategoryItem);
      }
    );
  }
  target.insertAdjacentElement('afterbegin', Header);
};

function SortList(target) {
  const List = $createElement('ul', 'sort-list');
  List.innerHTML = `
    <li class="sort-list-item" id=${RECENT}>신상품순</li>
    <li class="sort-list-item" id=${PRICE_ASC}>낮은 가격순</li>
    <li class="sort-list-item" id=${PRICE_DES}>높은 가격순</li>
    <li class="sort-list-item" id=${RATE_DES}>할인율 높은순</li>
  `;

  List.querySelectorAll('li').forEach(li => {
    if (li.id === SORT) li.classList.add('selected-sort');
  });

  List.addEventListener('click', event => {
    if (event.target.closest('li')) {
      if (event.target.id === SORT) return;
      urlParams.set('sort', event.target.id);
      const url = urlParams.toString();
      location.href = `?${url}`;
    }
  });
  target.insertAdjacentElement('afterbegin', List);
}

const sortProducts = (base, products) => {
  let result;
  switch (base) {
    case RECENT:
      result = products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case PRICE_ASC:
      result = products.sort(
        (a, b) => new Date(a.discountedPrice) - new Date(b.discountedPrice)
      );
      break;
    case PRICE_DES:
      result = products.sort(
        (a, b) => new Date(b.discountedPrice) - new Date(a.discountedPrice)
      );
      break;
    case RATE_DES:
      result = products.sort((a, b) => new Date(b.rate) - new Date(a.rate));
      break;
    default:
  }
  return result;
};

function SearchBox(target) {
  const SearchForm = $createElement('div', 'search-box');
  SearchForm.innerHTML = `
      <div class="search-form">
        <input class="search-content input" type="text">
        <button class="search-button button is-dark">검색</button>
      </div>
  `;

  SearchForm.addEventListener('click', event => {
    if (event.target.closest('.search-button')) {
      const inputValue = SearchForm.querySelector('.search-content').value;
      location.href = `/products/?team=${TEAM}&category=${CURRENT_CATEGORY}&sort=${SORT}&search=${inputValue}`;
    }
  });
  target.insertAdjacentElement('afterbegin', SearchForm);
}

const render = async () => {
  const $productsWrapper = document.querySelector('.products-wrapper');
  const $products = document.querySelector('.products');
  ProductHeader($productsWrapper);
  SortList($productsWrapper);
  SearchBox($productsWrapper);
  try {
    let products;
    if (TEAM !== 'all' && CURRENT_CATEGORY !== 'all') {
      products = await fetch(
        `/api/v1/categories/${TEAM}-${CURRENT_CATEGORY}/products`
      );
    } else if (TEAM === 'all' && CURRENT_CATEGORY === 'all') {
      products = await fetch('/api/v1/products');
    } else if (TEAM === 'all') {
      products = await fetch(`/api/v1/categories/${CURRENT_CATEGORY}`);
    } else if (CURRENT_CATEGORY === 'all') {
      products = await fetch(`/api/v1/teams/${TEAM}/products`);
    }
    const productsList = await products.json();
    if (productsList.length === 0) {
      $products.innerHTML = '<p class="no-item">상품이 존재하지 않습니다!</p>';
      return;
    }
    const sortedList = sortProducts(SORT, productsList);
    if (SEARCH_VALUE) {
      const filterdList = sortedList.filter(product =>
        product.name.includes(SEARCH_VALUE)
      );
      filterdList.forEach(item => Product($products, item));
    } else sortedList.forEach(item => Product($products, item));
  } catch (err) {
    throw new Error({ message: err });
  }
};

render();

const input = document.querySelector('.search-content');
input.value = SEARCH_VALUE;
