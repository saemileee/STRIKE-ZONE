import { $, $createElement } from '/js/utils.js';

const AdminData = $createElement('section', 'admin-data');

const AdminNav = $createElement('nav', 'admin-nav');

const CATEGORIES = {
  'user-management': '사용자 관리',
  'product-management': '상품 관리',
  'order-management': '주문 관리',
  'team-management': '팀 관리',
  'category-management': '카테고리 관리',
};

AdminNav.innerHTML = `
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
    <li class="nav-list-item" id="team-management">
      <a href="/admin/team-management">${CATEGORIES['team-management']}</a>
    </li>
    <li class="nav-list-item" id="category-management">
      <a href="/admin/category-management">${CATEGORIES['category-management']}</a>
    </li>
  </ul>
  <span class="logout">로그아웃</span>
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
  console.log('Logout');
});

const $contentContainer = $('.content-container');
$contentContainer.append(AdminNav, AdminData);
document.getElementById(currentAdminCategory).classList.add('selected');
