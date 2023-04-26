import { $, $createElement, getCookie } from '/js/utils.js';
import { getAuthOption } from '/js/api/authAPI.js';

const [RECENT, LONGEST, NAME_ASC, NAME_DES] = [
  'recent',
  'longest',
  'name-asc',
  'name-des',
];

const render = async () => {
  let users;
  try {
    users = await fetch('/api/v1/users', getAuthOption());
    users = await users.json();
  } catch (err) {
    throw new Error({ message: err });
  }

  const urlParams = new URL(location.href).searchParams;
  const SORT = urlParams.get('sort');

  if (!SORT) location.href = `/admin/user-management/?sort=${RECENT}`;

  const SortList = $createElement('ul', 'sort-list');
  SortList.innerHTML = `
    <li class="sort-list-item" id=${RECENT}>최신순</li>  
    <li class="sort-list-item" id=${LONGEST}>오래된순</li>
    <li class="sort-list-item" id=${NAME_ASC}>사용자명 오름차순</li>
    <li class="sort-list-item" id=${NAME_DES}>사용자명 내림차순</li>
  `;

  SortList.querySelectorAll('li').forEach((li) => {
    if (li.id === SORT) li.classList.add('selected-sort');
  });

  SortList.addEventListener('click', (event) => {
    if (event.target.closest('li')) {
      if (event.target.id === SORT) return;
      location.href = `/admin/user-management/?sort=${event.target.id}`;
    }
  });

  function sortOrders(base) {
    let result;
    switch (base) {
      case RECENT:
        result = users.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case LONGEST:
        result = users.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case NAME_ASC:
        result = users.sort((a, b) => a.koreanName.localeCompare(b.koreanName));
        break;
      case NAME_DES:
        result = users.sort((a, b) => b.koreanName.localeCompare(a.koreanName));
        break;
      default:
        result = false;
    }
    return result;
  }
  users = sortOrders(SORT);

  const EditButtons = $createElement('div', 'edit-buttons');
  EditButtons.innerHTML = `
    <button class="delete-selected button is-dark">선택 사용자 삭제</button>
    <button class="delete-selected button is-dark">선택 사용자 정보 수정</button>
  `;

  const SerchBox = $createElement('div', 'search-box');
  SerchBox.innerHTML = `
      <div class="dropdown">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>검색 타입</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a class="dropdown-item">
              이름
            </a>
            <a href="#" class="dropdown-item is-active">
              이메일
            </a>
            <a class="dropdown-item">
              휴대폰 번호
            </a>
          </div>
        </div>
      </div>
      <input class="serch-content input" type="text">
      <button class="button is-dark">검색</button>
  `;
  SerchBox.addEventListener('click', (event) => {
    if (event.target.closest('.dropdown')) {
      const dropbox = event.target.closest('.dropdown');
      dropbox.classList.toggle('is-active');
    }
  });

  const $managementContainer = $('.management-container');
  const Table = $createElement('div', 'order-table');
  Table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>
            <label>
              <input class="select-all-checkbox" type="checkbox"></input>
            </label>
          </th>
          <th>이름</th>
          <th>이메일</th>
          <th>주소</th>
          <th>휴대폰 번호</th>
          <th>가입 일자</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            ({
              koreanName,
              createdAt,
              address: { postCode, roughAddress, detailAddress },
              email,
              phoneNumber,
            }) => `
            <tr id=${email}>
              <td>
                <label>
                  <input class="checkbox" type="checkbox"></input>
                </label>
              </td>
              <td class="user-name-square">
                <div class="user-name">
                  <a href="./${email}">${koreanName}</a>
                </div>
              </td>
              <td class="user-email-square">${email}</td>
              <td class="user-adress-square">
                <span>
                [${postCode}] ${roughAddress} ${detailAddress}
                </span>
              </td>
              <td class="order-price-square">
                <div class="order-price">
                  <span>${phoneNumber}</span>
                </div>
              </td>
              <td class="order-price-square">
                <div class="order-date">
                    <span>${createdAt.split('T')[0]}</span>
                </div>
              </td>
              <td>
                <div class="order-edit">
                  <span class="edit-one">수정</span>
                  <span class="delete-one">삭제</span>
                </div>
              </td>
            </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `;

  const selectedIds = [];

  const selectAllCheckbox = Table.querySelector('.select-all-checkbox');

  selectAllCheckbox.addEventListener('click', (event) => {
    const currentCheck = event.target.checked;
    Table.querySelectorAll('.checkbox').forEach((checkbox) => {
      checkbox.checked = currentCheck;
      const tr = checkbox.closest('tr');
      tr.className = currentCheck ? 'selected' : '';
    });
  });

  Table.addEventListener('click', async (event) => {
    if (event.target.closest('.checkbox')) {
      const checkboxes = Table.querySelectorAll('.checkbox');
      const isNotAllChecked = Array.prototype.some.call(
        checkboxes,
        ({ checked }) => checked === false
      );
      selectAllCheckbox.checked = !isNotAllChecked;

      const selectedRow = event.target.closest('tr');
      selectedRow.classList.toggle('selected');

      const { id } = selectedRow;
      if (selectedRow.classList.contains('selected'))
        selectedIds.push(Number(id));
      else selectedIds.console.log(selectedIds);
    }
    if (event.target.closest('.delete-one')) {
      const currentUserEmail = event.target.closest('tr').id;
      const { token } = JSON.parse(getCookie('userToken'));
      if (!confirm('사용자 정보를 삭제하시겠습니까?')) return;
      try {
        console.log(currentUserEmail);
        await fetch(`/api/v1/users/${currentUserEmail}`, {
          method: 'DELETE',
          headers: { token },
        });
        location.reload();
      } catch (err) {
        throw new Error({ message: err });
      }
    }
  });

  $managementContainer.append(SortList, SerchBox, EditButtons, Table);
};

render();
