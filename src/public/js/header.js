const DUMMY_USER_DATA = {
  // userId: 'elice@elice.com',d
};
const DUMMY_TEAM_CATEGORY_DATA = [
  { name: 'SSG랜더스', logo: '/assets/img/category/team/SSG.png', url: '#' },
  {
    name: '키움히어로즈',
    logo: '/assets/img/category/team/KIWOOM.png',
    url: '#',
  },
  { name: 'LG트윈스', logo: '/assets/img/category/team/LG.png', url: '#' },
  { name: 'KT위즈', logo: '/assets/img/category/team/KT.png', url: '#' },
  { name: 'KIA타이거즈', logo: '/assets/img/category/team/KIA.png', url: '#' },
  { name: 'NC다이노스', logo: '/assets/img/category/team/NC.png', url: '#' },
  {
    name: '삼성라이온즈',
    logo: '/assets/img/category/team/SAMSUNG.png',
    url: '#',
  },
  {
    name: '롯데자이언츠',
    logo: '/assets/img/category/team/LOTTE.png',
    url: '#',
  },
  {
    name: '두산베어스',
    logo: '/assets/img/category/team/DOOSAN.png',
    url: '#',
  },
  {
    name: '한화이글스',
    logo: '/assets/img/category/team/HANHWA.png',
    url: '#',
  },
];
const DUMMY_PRODUCT_CATEGORY_DATA = [
  { name: '유니폼', url: '#' },
  { name: '모자', url: '#' },
  { name: '의류', url: '#' },
  { name: '잡화', url: '#' },
  { name: '응원용품', url: '#' },
  { name: '야구용품', url: '#' },
];
const CART_AMOUNT = 2;

const headerElement = document.createElement('header');
const headerWrapper = document.createElement('div');
headerWrapper.className = 'header-wrapper';

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';
headerContainer.innerHTML = `<h1>MARKET<br/>NAME</h1>`;

const categoryUlElement = document.createElement('ul');

const teamCategoryLiElement = document.createElement('li');
teamCategoryLiElement.innerHTML = `TEAMS`;

const productCategoryLiElement = document.createElement('li');
productCategoryLiElement.innerHTML = `PRODUCTS`;

categoryUlElement.append(teamCategoryLiElement, productCategoryLiElement);

const cartElement = document.createElement('button');
cartElement.className = 'cart';
cartElement.innerHTML = `<i class="fa fa-shopping-cart" style="font-size:18px"></i><span class = "cart-amount">${CART_AMOUNT}</span>`;

const loginElement = document.createElement('button');
loginElement.className = 'login';
loginElement.innerHTML = '로그인';

const signUpElement = document.createElement('button');
signUpElement.className = 'signup';
signUpElement.innerHTML = '회원가입';

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
      <img src="${team.logo}">
    </div>
    <p>${team.name}</p>
  `;
  teamLiElement.addEventListener('click', () => {
    window.location.href = team.url;
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
DUMMY_TEAM_CATEGORY_DATA.forEach(team => {
  const teamElement = createTeamElement(team);
  teamsUlElement.append(teamElement);
});
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
};

teamsContainerElement.addEventListener('mouseleave', hideTeamsContainer);

const hideProductsContainer = () => {
  productsContainerElement.style.display = 'none';
};
productsContainerElement.addEventListener('mouseleave', hideProductsContainer);
