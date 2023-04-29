import { $, $createElement, deleteCookie } from '/js/utils.js';
import { getUserInfo } from '/js/api/authAPI.js';

document.title = '스트라이크 존 관리자 페이지';

async function isAdminAccount() {
  const { isAdmin } = await getUserInfo();
  if (!isAdmin) {
    alert('관리자 전용 페이지입니다!');
    location.href = '/admin/login';
  }
}

window.onload = function () {
  isAdminAccount();
};

const AdminData = $createElement('section', 'admin-data');

const AdminNav = $createElement('aside', 'admin-aside');

const CATEGORIES = {
  'user-management': '사용자 관리',
  'product-management': '상품 관리',
  'order-management': '주문 관리',
};

AdminNav.innerHTML = `
  <header>STRIKE ZONE<br>
  관리자 페이지
  </header>
    <nav>
      <ul class="admin-nav-list">
        <li class="nav-list-item" id="user-management">
          <a href="/admin/user-management">${CATEGORIES['user-management']}</a>
        </li>
        <li class="nav-list-item" id="product-management">
          <a href="/admin/product-management">${CATEGORIES['product-management']}</a>
        </li>
        <li class="nav-list-item" id="order-management">
          <a href="/admin/order-management">${CATEGORIES['order-management']}</a>
        </li>
      </ul>
    </nav>
  <span class="logout">로그아웃</span>
  <span class="homepage">홈페이지로</span>
`;

const [, , currentAdminCategory] = location.pathname.split('/');
AdminData.innerHTML = `
  <h3 class="title is-3">${CATEGORIES[currentAdminCategory]}</h3>
    <div class="management-container">
    </div>
  <hr>
`;

const $logoutButton = AdminNav.querySelector('.logout');
$logoutButton.addEventListener('click', (event) => {
  deleteCookie('userToken');
  location.href = '/admin/login';
});

const $homepageButton = AdminNav.querySelector('.homepage');
$homepageButton.addEventListener('click', (event) => {
  location.href = '/';
});

const $contentContainer = $('.content-container');
$contentContainer.append(AdminNav, AdminData);
document.getElementById(currentAdminCategory).classList.add('selected');

const ScrollBox = $createElement('div', 'scroll-box');

ScrollBox.innerHTML = `
  <button class="scroll-top-button">
  ▲
  </button>
  <button class="scroll-bottom-button">
  ▼
  </button>
`;

const BOTTOM_COORDINATE = Number.MAX_SAFE_INTEGER;

ScrollBox.addEventListener('click', (event) => {
  if (event.target.closest('.scroll-top-button')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (event.target.closest('.scroll-bottom-button')) {
    window.scrollTo({ top: BOTTOM_COORDINATE, behavior: 'smooth' });
  }
});

document.body.insertAdjacentElement('beforeend', ScrollBox);
