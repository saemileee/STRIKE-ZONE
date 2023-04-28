import { $, $createElement, getCookie } from '/js/utils.js';
import { getAuthOption } from '/js/api/authAPI.js';

const [RECENT, LONGEST, NAME_ASC, NAME_DES] = [
  'recent',
  'longest',
  'name-asc',
  'name-des',
];

const urlParams = new URL(location.href).searchParams;
const SORT = urlParams.get('sort');
const SEARCH_TYPE = urlParams.get('search-type');
const SEARCH_VALUE = urlParams.get('search-value');

const userTable = async () => {
  let users;
  try {
    users = await fetch('/api/v1/users', getAuthOption());
    users = await users.json();
  } catch (err) {
    throw new Error({ message: JSON.parse(err) });
  }

  if (SEARCH_TYPE && SEARCH_VALUE) {
    users = users.filter((user) => {
      if (
        SEARCH_TYPE === 'phoneNumber' &&
        user[SEARCH_TYPE].split('-').join('').includes(SEARCH_VALUE)
      ) {
        return true;
      }
      if (user[SEARCH_TYPE].includes(SEARCH_VALUE)) return true;
      return false;
    });
  }

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

  function sortUsers(base) {
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
  users = sortUsers(SORT);

  const SearchBox = $createElement('div', 'search-box');
  SearchBox.innerHTML = `
      <div class="dropdown">
        <div class="dropdown-trigger select">
          <button class="button dropdown-box" aria-haspopup="true" aria-controls="dropdown-menu">
            <span class="current-search-type">이름</span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item" id="koreanName" name="이름">
              이름
            </a>
            <a class="dropdown-item" id="email" name="이메일">
              이메일
            </a>
            <a class="dropdown-item" id="phoneNumber" name="휴대폰 번호">
              휴대폰 번호
            </a>
          </div>
        </div>
      </div>
      <input class="search-content input" type="text" autocomplete="off">
      <button class="search-start-button button is-dark">검색</button>
  `;

  let searchType;
  let searchTypeName;

  SearchBox.addEventListener('click', (event) => {
    if (event.target.closest('.dropdown')) {
      const dropbox = event.target.closest('.dropdown');
      dropbox.classList.toggle('is-active');
    }

    if (event.target.closest('.dropdown-item')) {
      searchType = event.target.id;
      searchTypeName = event.target.name;
      SearchBox.querySelector('.current-search-type').innerText =
        searchTypeName;
    }

    if (event.target.closest('.search-start-button')) {
      const inputValue = SearchBox.querySelector('.search-content').value;
      if (!searchType) {
        if (SEARCH_TYPE) {
          searchType = SEARCH_TYPE;
        } else {
          searchType = 'koreanName';
        }
      }
      location.href = `/admin/user-management/?sort=recent&search-type=${searchType}&search-value=${inputValue}`;
    }
  });

  const $managementContainer = $('.management-container');
  const Table = $createElement('div', 'user-table');
  Table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>이름</th>
          <th>이메일</th>
          <th>주소</th>
          <th>휴대폰 번호</th>
          <th>가입 일자</th>
          <th>수정/삭제</th>
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
              <td class="user-number">
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
              <td class="user-price-square">
                <div class="user-price">
                  <span>${phoneNumber}</span>
                </div>
              </td>
              <td class="user-price-square">
                <div class="user-date">
                    <span>${createdAt.split('T')[0]}</span>
                </div>
              </td>
              <td>
                <div class="user-edit">
                  <span class="edit-one button is-dark">수정</span>
                  <span class="delete-one button is-danger">삭제</span>
                </div>
              </td>
            </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `;

  Table.addEventListener('click', async (event) => {
    if (event.target.closest('.edit-one')) {
      const currentUserEmail = event.target.closest('tr').id;
      if (!confirm('사용자 정보를 수정하시겠습니까?')) return;
      window.location.href = `/admin/user-management/${currentUserEmail}`;
    }
    if (event.target.closest('.delete-one')) {
      const currentUserEmail = event.target.closest('tr').id;
      const { token } = JSON.parse(getCookie('userToken'));
      if (!confirm('사용자 정보를 삭제하시겠습니까?')) return;
      try {
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

  $managementContainer.append(SortList, SearchBox, Table);
};

async function render() {
  await userTable();
  const userNumbers = document.querySelectorAll('.user-number');
  if (SORT === 'longest' || SORT === 'name-asc') {
    userNumbers.forEach((node, index) => {
      node.innerHTML = `${index + 1}`;
    });
  } else {
    userNumbers.forEach((node, index) => {
      node.innerHTML = `${userNumbers.length - index}`;
    });
  }

  const searchOption = {
    koreanName: '이름',
    email: '이메일',
    phoneNumber: '휴대폰 번호',
  };
  if (SEARCH_TYPE && SEARCH_VALUE) {
    const searchBox = $('.search-box');
    searchBox.querySelector('.current-search-type').innerText =
      searchOption[SEARCH_TYPE];
    searchBox.querySelector('.search-content').value = SEARCH_VALUE;
  }
}

render();
