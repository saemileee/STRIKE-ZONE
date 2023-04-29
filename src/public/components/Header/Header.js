import { getCartList } from '/js/api/cartAPI.js';
import { fetchData } from '/js/api/api.js';
import { isLogin } from '/js/api/authAPI.js';
import { SearchBox } from './Search.js';

// 파비콘
document.head.insertAdjacentHTML(
  'beforeend',
  '<link rel="icon" href="/assets/favicon/favicon.png" />'
);

const DUMMY_PRODUCT_CATEGORY_DATA = [
  { name: '유니폼', url: '/products?team=all&category=uniform&sort=recent' },
  { name: '모자', url: '/products?team=all&category=cap&sort=recent' },
  { name: '의류', url: '/products?team=all&category=clothes&sort=recent' },
  { name: '잡화', url: '/products?team=all&category=acc&sort=recent' },
  { name: '응원용품', url: '/products?team=all&category=cheer&sort=recent' },
  { name: '야구용품', url: '/products?team=all&category=equip&sort=recent' },
];

const CART_AMOUNT = getCartList().length;

const headerElement = document.createElement('header');
const headerWrapper = document.createElement('div');
headerWrapper.className = 'header-wrapper';

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';
headerContainer.innerHTML = '<h1><a href="/">STRIKE ZONE</a></h1>';

const categoryUlElement = document.createElement('ul');

const teamCategoryLiElement = document.createElement('li');
teamCategoryLiElement.innerHTML = 'TEAMS';

const productCategoryLiElement = document.createElement('li');
productCategoryLiElement.innerHTML = 'PRODUCTS';

categoryUlElement.append(teamCategoryLiElement, productCategoryLiElement);

const cartElement = document.createElement('button');
cartElement.className = 'cart';
cartElement.innerHTML = `<i class="fa fa-shopping-cart" style="font-size:18px"></i><span class = "cart-amount">${CART_AMOUNT}</span>`;
cartElement.addEventListener('click', () => {
  window.location.href = '/cart';
});

const loginElement = document.createElement('button');
loginElement.className = 'login';
loginElement.innerHTML = '로그인';
loginElement.addEventListener('click', () => {
  window.location.href = '/login';
});

const signUpElement = document.createElement('button');
signUpElement.className = 'signup';
signUpElement.innerHTML = '회원가입';
signUpElement.addEventListener('click', () => {
  window.location.href = '/signup';
});

const myPageElement = document.createElement('button');
myPageElement.className = 'my-page';
myPageElement.innerHTML = '마이페이지';
myPageElement.addEventListener('click', () => {
  window.location.href = '/user/mypage';
});

const logoutElement = document.createElement('button');
logoutElement.className = 'logout';
logoutElement.innerHTML = '로그아웃';

logoutElement.addEventListener('click', () => {
  deleteUserToken();
  location.reload();
});

const rightSideElementsContainer = document.createElement('div');
rightSideElementsContainer.className = 'right-side-container';
rightSideElementsContainer.prepend(cartElement);

SearchBox(rightSideElementsContainer);

if (!(await isLogin())) {
  rightSideElementsContainer.append(loginElement, signUpElement);
} else if (await isLogin()) {
  rightSideElementsContainer.append(myPageElement, logoutElement);
}

headerElement.append(headerWrapper);
headerWrapper.append(headerContainer);
headerContainer.append(categoryUlElement, rightSideElementsContainer);
document.body.prepend(headerElement);

const createTeamElement = (team) => {
  const teamLiElement = document.createElement('li');
  teamLiElement.innerHTML = `
    <div>
      <img src="${team.emblemPath}">
    </div>
    <p>${team.teamName}</p>
  `;
  teamLiElement.addEventListener('click', () => {
    window.location.href = `/products?team=${team.teamId}&category=all`;
  });
  return teamLiElement;
};

const createProductElement = (category) => {
  const productLiElement = document.createElement('li');
  productLiElement.innerHTML = `
      <p>${category.name}</p>
  `;
  productLiElement.addEventListener('click', () => {
    window.location.href = category.url;
  });
  return productLiElement;
};

const categoryContainerElement = document.createElement('div');
categoryContainerElement.classList.add('category-container');

const teamsContainerElement = document.createElement('div');
teamsContainerElement.classList.add('teams-container');
const teamsUlElement = document.createElement('ul');

async function renderTeamCategory() {
  const data = await fetchData('/teams');
  data.forEach((team) => {
    const teamElement = createTeamElement(team);
    teamsUlElement.append(teamElement);
  });
}
renderTeamCategory();

teamsContainerElement.append(teamsUlElement);

const productsContainerElement = document.createElement('div');
productsContainerElement.classList.add('products-container');
const productsUlElement = document.createElement('ul');
DUMMY_PRODUCT_CATEGORY_DATA.forEach((category) => {
  const productElement = createProductElement(category);
  productsUlElement.append(productElement);
});
productsContainerElement.append(productsUlElement);

categoryContainerElement.append(teamsContainerElement, productsContainerElement);
headerElement.append(categoryContainerElement);

teamsContainerElement.style.display = 'none';
productsContainerElement.style.display = 'none';

teamCategoryLiElement.addEventListener('mouseover', () => {
  categoryContainerElement.style.transform = 'translateY(0)';
  productsContainerElement.style.display = 'none';
  teamsContainerElement.style.display = 'block';
});

productCategoryLiElement.addEventListener('mouseover', () => {
  categoryContainerElement.style.transform = 'translateY(0)';
  teamsContainerElement.style.display = 'none';
  productsContainerElement.style.display = 'block';
});

const hideTeamsContainer = () => {
  categoryContainerElement.style.transform = 'translateY(-150%)';
  setTimeout(() => {
    teamsContainerElement.style.display = 'none';
    teamCategoryLiElement.removeAttribute('style');
  }, 300);
};

teamsContainerElement.addEventListener('mouseover', () => {
  teamCategoryLiElement.style.color = 'rgb(179, 255, 14)';
});
teamsContainerElement.addEventListener('mouseleave', hideTeamsContainer);

const hideProductsContainer = () => {
  categoryContainerElement.style.transform = 'translateY(-150%)';
  setTimeout(() => {
    productsContainerElement.style.display = 'none';
    productCategoryLiElement.removeAttribute('style');
  }, 300);
};
productsContainerElement.addEventListener('mouseover', () => {
  productCategoryLiElement.style.color = 'rgb(179, 255, 14)';
});
productsContainerElement.addEventListener('mouseleave', hideProductsContainer);

// 로그아웃 시 userToken 삭제
function deleteUserToken() {
  document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
