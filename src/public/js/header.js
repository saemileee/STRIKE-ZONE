import { getAllProduct } from '/js/api/cartAPI.js';

const DUMMY_USER_DATA = {
  // userId: 'elice@elice.com',d
};

const DUMMY_PRODUCT_CATEGORY_DATA = [
  { name: '유니폼', url: '#' },
  { name: '모자', url: '#' },
  { name: '의류', url: '#' },
  { name: '잡화', url: '#' },
  { name: '응원용품', url: '#' },
  { name: '야구용품', url: '#' },
];

const CART_AMOUNT = getAllProduct();

const headerElement = document.createElement('header');
const headerWrapper = document.createElement('div');
headerWrapper.className = 'header-wrapper';

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';
headerContainer.innerHTML = '<h1><a href="/">MARKET<br/>NAME</a></h1>';

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

const logoutElement = document.createElement('button');
logoutElement.className = 'logout';
logoutElement.innerHTML = '로그아웃';

const rightSideElementsContainer = document.createElement('div');
rightSideElementsContainer.className = 'right-side-container';
rightSideElementsContainer.prepend(cartElement);
if (!DUMMY_USER_DATA.userId) {
  rightSideElementsContainer.append(loginElement, signUpElement);
} else if (DUMMY_USER_DATA.userId) {
  rightSideElementsContainer.append(myPageElement, logoutElement);
}

headerElement.append(headerWrapper);
headerWrapper.append(headerContainer);
headerContainer.append(categoryUlElement, rightSideElementsContainer);
document.body.prepend(headerElement);

const createTeamElement = team => {
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

const createProductElement = category => {
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

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function renderTeamCategory() {
  const data = await fetchData('/api/v1/teams');
  data.forEach(team => {
    const teamElement = createTeamElement(team);
    teamsUlElement.append(teamElement);
  });
}
renderTeamCategory();

teamsContainerElement.append(teamsUlElement);

const productsContainerElement = document.createElement('div');
productsContainerElement.classList.add('products-container');
const productsUlElement = document.createElement('ul');
DUMMY_PRODUCT_CATEGORY_DATA.forEach(category => {
  const productElement = createProductElement(category);
  productsUlElement.append(productElement);
});
productsContainerElement.append(productsUlElement);

categoryContainerElement.append(
  teamsContainerElement,
  productsContainerElement
);
headerElement.append(categoryContainerElement);

teamsContainerElement.style.display = 'none';
productsContainerElement.style.display = 'none';

teamCategoryLiElement.addEventListener('mouseover', () => {
  productsContainerElement.style.display = 'none';
  teamsContainerElement.style.display = 'block';
});

productCategoryLiElement.addEventListener('mouseover', () => {
  teamsContainerElement.style.display = 'none';
  productsContainerElement.style.display = 'block';
});

const hideTeamsContainer = () => {
  teamsContainerElement.style.display = 'none';
  teamCategoryLiElement.removeAttribute('style');
};

teamsContainerElement.addEventListener('mouseover', () => {
  teamCategoryLiElement.style.color = 'rgb(179, 255, 14)';
});
teamsContainerElement.addEventListener('mouseleave', hideTeamsContainer);

const hideProductsContainer = () => {
  productsContainerElement.style.display = 'none';
  productCategoryLiElement.removeAttribute('style');
};
productsContainerElement.addEventListener('mouseover', () => {
  productCategoryLiElement.style.color = 'rgb(179, 255, 14)';
});
productsContainerElement.addEventListener('mouseleave', hideProductsContainer);
