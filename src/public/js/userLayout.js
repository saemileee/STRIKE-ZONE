// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const $UserData = $createElement('section', 'user-data');

const $UserNav = $createElement('nav', 'user-nav');

$UserNav.innerHTML = `
  <ul class="user-nav-list">
    <li class="nav-list-item" id="mypage">
      <a href="/user/mypage">마이 페이지</a>
    </li>
    <li class="nav-list-item" id="update">
      <a href="/user/update">회원 정보 수정</a>
    </li>
    <li class="nav-list-item" id="orders">
      <a href="/user/orders">주문 목록</a>
    </li>
    <li class="nav-list-item" id="delete">
      <a href="/user/delete">회원 탈퇴</a>
    </li>
  </ul>
`;

const $contentContainer = $('.content-container');
$contentContainer.append($UserNav, $UserData);

const currentUserCategory = location.pathname.split('/')[2];
console.log(currentUserCategory);
document.getElementById(currentUserCategory).classList.add('selected');
