const DUMMY_USER_DATA = {
  userId: 'elice@elice.com',
};
const CART_AMOUNT = 2;

const headerElement = document.createElement('header');
const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';
headerContainer.innerHTML = `<h1>MARKET<br/>NAME</h1>
<ul><li>TEAMS</li><li>PRODUCTS</li></ul>`;

const cartElement = document.createElement('button');
cartElement.className = 'cart';
cartElement.innerHTML = `<i class="fa fa-shopping-cart"></i><span class = "cart-amount">${CART_AMOUNT}</span>`;

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

headerElement.append(headerContainer);
headerContainer.append(rightSideElementsContainer);
document.body.prepend(headerElement);
