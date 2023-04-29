import { $, $createElement, autoHyphen } from '/js/utils.js';

const [RECENT, LONGEST, ID_ASC, ID_DES, PRICE_ASC, PRICE_DES] = [
  'recent',
  'longest',
  'id-asc',
  'id-des',
  'price-asc',
  'price-des',
];

const [BEFOREPAYMENT, PREPARING, SHIPPING, COMPLETE] = [
  '결제확인중',
  '상품준비중',
  '배송중',
  '배송완료',
];

const urlParams = new URL(window.location.href).searchParams;
const SORT = urlParams.get('sort');
const SEARCH_TYPE = urlParams.get('search-type');
const SEARCH_VALUE = urlParams.get('search-value');
let SHIPPING_OPTIONS = urlParams.get('shipping-options');
if (SHIPPING_OPTIONS) SHIPPING_OPTIONS = SHIPPING_OPTIONS.split('-');

if (!SORT) window.location.href = `/admin/order-management/?sort=${RECENT}`;

const selectedIds = [];

function getShipStatus(status) {
  if (status === BEFOREPAYMENT) return 'BEFOREPAYMENT';
  if (status === PREPARING) return 'PREPARING';
  if (status === SHIPPING) return 'SHIPPING';
  if (status === COMPLETE) return 'COMPLETE';
  return null;
}

function OrderTable(orders) {
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
          <th>주문정보</th>
          <th>고객정보</th>
          <th>주문상품</th>
          <th>결제정보</th>
          <th>배송상태</th>
          <th>수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        ${orders
          .map(
            ({
              orderId,
              createdAt,
              orderer: { email: ordererEmail, name: ordererName },
              productsPayment,
              products,
              deliveryCharge,
              totalPayment,
              status,
            }) => `
            <tr id=${orderId}>
              <td>
                <label>
                  <input value=${orderId} class="checkbox" type="checkbox"></input>
                </label>
              </td>
              <td class="order-info-square">
                <div class="order-id">
                  <a href="./${orderId}">주문번호 ${orderId}</a>
                </div>
                <div class="order-date">
                  <span>${createdAt.split('T')[0]}</span>
                </div>
              </td>
              <td class="order-orderer-square">
                <div class="order-orderer">
                  <span>${ordererName}</span>
                  <span class="orderer-email">${ordererEmail}</span>
                </div>
              </td>
              <td class="order-product-square">
                <div class="order-product">
                  <img src=${products[0].img}></img>
                  <div class="order-product-desc">
                    <span class="name">
                      ${products[0].productName}
                      ${products.length > 1 ? `외 ${products.length - 1}개` : ''}
                    </span>
                  </div>
                </div>
              </td>
              <td class="order-price-square">
                <div class="order-price">
                  <span>상품 가격</span><br>
                  <em>${productsPayment.toLocaleString()}원</em><br>
                  <br>
                  <span>배송비</span><br>
                  <em>${deliveryCharge.toLocaleString()}원</em><br>
                  <br>
                  <em class="total-price">총 ${totalPayment.toLocaleString()}원</em><br>
                </div>
              </td>
              <td>
                <div class="order-status-square">
                  <div class="dropdown">
                  <div class="dropdown-trigger select">
                    <button class="button shipping-status" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span class="current-shipping-type">${status}</span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <a class="dropdown-item" id=${BEFOREPAYMENT}>
                        ${BEFOREPAYMENT}
                      </a>
                      <a class="dropdown-item" id=${PREPARING}>
                        ${PREPARING}
                      </a>
                      <a href="#" class="dropdown-item" id=${SHIPPING}>
                        ${SHIPPING}
                      </a>
                      <a class="dropdown-item" id=${COMPLETE}>
                        ${COMPLETE}
                      </a>
                    </div>
                  </div>
                </div>
                <button class="edit-status-one button is-dark">배송상태 변경</button>
                </div>
              </td>
              <td class="order-edit-square">
                <div class="order-edit">
                  <button class="edit-one button is-dark">수정</button>
                  <button class="delete-one button is-danger">삭제</button>
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
    if (event.target.closest('.checkbox')) {
      const checkboxes = Table.querySelectorAll('.checkbox');
      const isNotAllChecked = Array.prototype.some.call(
        checkboxes,
        ({ checked }) => checked === false
      );
      selectAllCheckbox.checked = !isNotAllChecked;

      const selectedRow = event.target.closest('tr');
      selectedRow.classList.toggle('selected');

      const id = event.target.value;
      if (selectedRow.classList.contains('selected')) {
        selectedIds.push(Number(id));
      } else {
        const idx = selectedIds.indexOf(Number(id));
        selectedIds.splice(idx, 1);
      }
    }

    if (event.target.closest('.orderer-email')) {
      const email = event.target.textContent;
      window.location.href = `/admin/order-management/?sort=recent&search-type=email&search-value=${email}`;
    }

    if (event.target.closest('.delete-one')) {
      const currentOrderId = event.target.closest('tr').id;
      if (!confirm('해당 항목을 삭제하시겠습니까?')) return;
      try {
        await fetch(`/api/v1/orders/${currentOrderId}`, { method: 'DELETE' });
        window.location.reload();
      } catch (err) {
        throw new Error({ message: err });
      }
    }

    if (event.target.closest('.dropdown')) {
      const dropbox = event.target.closest('.dropdown');
      dropbox.classList.toggle('is-active');
    }

    if (event.target.closest('.dropdown-item')) {
      const shippingType = event.target.closest('.dropdown-item').id;
      const dropbox = event.target.closest('.dropdown');
      dropbox.querySelector('.current-shipping-type').textContent = shippingType;
    }

    if (event.target.closest('.edit-status-one')) {
      const { id } = event.target.closest('tr');
      const status = event.target.closest('td').querySelector('.current-shipping-type').textContent;
      try {
        await fetch(`/api/v1/orders/${id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
          }),
        });
        alert('배송상태가 변경되었습니다!');
        window.location.reload();
      } catch (err) {
        throw new Error({ message: err });
      }
    }

    if (event.target.closest('.edit-one')) {
      const modal = document.querySelector('.modal');
      modal.classList.add('active');
      const backdrop = $('.modal-backdrop');
      backdrop.addEventListener('click', () => {
        modal.classList.remove('active');
      });
      const modalLayout = modal.querySelector('.modal-layout');
      modalLayout.innerHTML = `
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">받는 사람</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input receiver"
                    type="text"
                    placeholder="받는 사람을 입력해 주세요."
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">연락처</label>
            </div>
            <div class="field-body">
              <p class="control">
                <span class="select">
                  <select class="receiver-phone-number-pro">
                    <option>010</option>
                    <option>011</option>
                    <option>016</option>
                    <option>017</option>
                    <option>018</option>
                    <option>019</option>
                  </select>
                </span>
              </p>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input receiver-phone-number-back"
                    type="tel"
                    placeholder="나머지 번호를 입력해 주세요."
                    minlength="6"
                    maxlength="9"
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">주소</label>
            </div>
            <div class="field-body">
              <p class="control">
                <span
                  id="receiver-address-button"
                  class="button receiver-address"
                  >주소찾기</span
                >
              </p>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input receiver-address receiver-address-zonecode"
                    type="text"
                    placeholder="우편번호"
                    readonly
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"></label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    id="address-base"
                    class="input receiver-address receiver-address-base"
                    type="text"
                    placeholder="주소"
                    readonly
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"></label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input receiver-address-detail"
                    type="text"
                    placeholder="상세주소를 입력해 주세요."
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <button class="send-change-data button is-dark">배송 정보 변경</button>
      `;
      autoHyphen('.receiver-phone-number-back');

      const { id } = event.target.closest('tr');
      const { recipient } = await fetch(`/api/v1/orders/${id}`).then((res) => res.json());
      const [, firstPhoneNumber, LastPhoneNumber] = recipient.phoneNumber.split('-');

      $('.input.receiver').value = recipient.name;
      $('.input.receiver-phone-number-back').value = firstPhoneNumber + LastPhoneNumber;
      $('.input.receiver').value = recipient.name;
      $('.receiver-address-zonecode').value = recipient.zipCode;
      $('.receiver-address-base').value = recipient.address1;
      $('.receiver-address-detail').value = recipient.address2;

      modal.addEventListener('click', async (event) => {
        if (event.target.closest('#receiver-address-button')) {
          const userData = new daum.Postcode({
            oncomplete(data) {
              $('.receiver-address-zonecode').value = data.zonecode;
              $('.receiver-address-base').value = data.address;
              $('.receiver-address-detail').value = '';
              $('.receiver-address-detail').focus();
            },
          }).open();
        }

        if (event.target.closest('.send-change-data')) {
          event.preventDefault();

          const name = $('.receiver').value;
          if (!name) {
            alert('이름을 입력해주세요!');
            return;
          }
          const address1 = $('.receiver-address-base').value;
          const address2 = $('.receiver-address-detail').value;
          const zipCode = $('.receiver-address-zonecode').value;
          const phoneNumber = `${$('.receiver-phone-number-pro').value}-${
            $('.receiver-phone-number-back').value
          }`;
          if (phoneNumber.length < 12) {
            alert('유효한 전화번호를 입력해주세요!');
            return;
          }

          try {
            await fetch(`/api/v1/orders/${id}/recipient`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                address1,
                address2,
                zipCode,
                phoneNumber,
              }),
            });
            modalLayout.innerHTML = `
              <p class="edit-complete">
                변경이 완료되었습니다!
              </p>
              <button class="edit-complete-button button is-dark">닫기</button>
            `;
          } catch (err) {
            throw new Error(err);
          }
        }
        if (event.target.closest('.edit-complete-button')) {
          modal.classList.remove('active');
        }
      });
    }
  });

  const selectAllCheckbox = Table.querySelector('.select-all-checkbox');

  selectAllCheckbox.addEventListener('click', (event) => {
    const currentCheck = event.target.checked;
    selectedIds.splice(0);
    Table.querySelectorAll('.checkbox').forEach((checkbox) => {
      checkbox.checked = currentCheck;
      const tr = checkbox.closest('tr');
      tr.className = currentCheck ? 'selected' : '';
      const id = checkbox.value;
      if (currentCheck) selectedIds.push(Number(id));
    });
  });

  return Table;
}

function SortList() {
  const List = $createElement('ul', 'sort-list');
  List.innerHTML = `
    <li class="sort-list-item" id=${RECENT}>최신순</li>  
    <li class="sort-list-item" id=${LONGEST}>오래된순</li>
    <li class="sort-list-item" id=${ID_ASC}>주문번호 오름차순</li>
    <li class="sort-list-item" id=${ID_DES}>주문번호 내림차순</li>
    <li class="sort-list-item" id=${PRICE_ASC}>낮은 가격순</li>
    <li class="sort-list-item" id=${PRICE_DES}>높은 가격순</li>
  `;

  List.querySelectorAll('li').forEach((li) => {
    if (li.id === SORT) li.classList.add('selected-sort');
  });

  List.addEventListener('click', (event) => {
    if (event.target.closest('li')) {
      if (event.target.id === SORT) return;
      urlParams.set('sort', event.target.id);
      const url = urlParams.toString();
      window.location.href = `?${url}`;
    }
  });
  return List;
}

function EditButtons() {
  const TableEditButtons = $createElement('div', 'edit-buttons');
  TableEditButtons.innerHTML = `
    <button class="delete-selected button is-dark">선택 항목 삭제</button>
    <button class="edit-selected button is-dark">선택 항목 배송 상태 수정</button>
    <div class="dropdown">
    <div class="dropdown-trigger select">
      <button class="button shipping-status" aria-haspopup="true" aria-controls="dropdown-menu">
        <span class="current-shipping-type">${BEFOREPAYMENT}</span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a class="dropdown-item" id=${BEFOREPAYMENT}>
          ${BEFOREPAYMENT}
        </a>
        <a class="dropdown-item" id=${PREPARING}>
          ${PREPARING}
        </a>
        <a href="#" class="dropdown-item" id=${SHIPPING}>
          ${SHIPPING}
        </a>
        <a class="dropdown-item" id=${COMPLETE}>
          ${COMPLETE}
        </a>
      </div>
    </div>
  </div>
  `;
  TableEditButtons.addEventListener('click', async (event) => {
    if (event.target.closest('.delete-selected')) {
      try {
        if (!confirm('정말로 해당 주문 내역들을 삭제하시겠습니까?')) return;
        const result = await fetch('/api/v1/orders', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderIds: selectedIds,
          }),
        });
        window.location.reload();
      } catch (err) {
        throw new Error({ message: err });
      }
    }
    if (event.target.closest('.dropdown')) {
      const dropbox = event.target.closest('.dropdown');
      dropbox.classList.toggle('is-active');
    }

    if (event.target.closest('.dropdown-item')) {
      const shippingType = event.target.closest('.dropdown-item').id;
      const dropbox = event.target.closest('.dropdown');
      dropbox.querySelector('.current-shipping-type').textContent = shippingType;
    }

    if (event.target.closest('.edit-selected')) {
      const status = TableEditButtons.querySelector('.current-shipping-type').textContent;
      try {
        if (!confirm(`정말로 해당 주문 내역들의 배송상태를 ${status}로 변경 하시겠습니까?`)) {
          return;
        }
        const result = await fetch('/api/v1/orders/status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderIds: selectedIds,
            status,
          }),
        });
        window.location.reload();
      } catch (err) {
        throw new Error({ message: err });
      }
    }
  });
  return TableEditButtons;
}

function SerchBox() {
  const TableSerchBox = $createElement('div', 'search-box');
  TableSerchBox.innerHTML = `
      <div class="shipping-options">
        <label class="checkbox">
        <input value="BEFOREPAYMENT" type="checkbox">
          ${BEFOREPAYMENT}
        </label>
        <label class="checkbox">
        <input value="PREPARING" type="checkbox">
          ${PREPARING}
        </label>
        <label class="checkbox">
        <input value="SHIPPING" type="checkbox">
          ${SHIPPING}
        </label>
        <label class="checkbox">
        <input value="COMPLETE" type="checkbox">
          ${COMPLETE}
        </label>
      </div>
      <div class="search-form">
        <div class="dropdown">
          <div class="dropdown-trigger select">
            <button class="button dropdown-box" aria-haspopup="true" aria-controls="dropdown-menu">
              <span class="current-search-type">전체</span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item" id="all" name="전체">
                전체
              </a>
              <a class="dropdown-item" id="email" name="이메일">
                이메일
              </a>
              <a href="#" class="dropdown-item" id="order-id" name="주문 번호">
                주문 번호
              </a>
            </div>
          </div>
        </div>
        <input class="serch-content input" type="text">
        <button class="serch-start-button button is-dark">검색</button>
      </div>
  `;
  let searchType;
  let searchTypeName;
  let shippingTypes = [];

  TableSerchBox.addEventListener('click', (event) => {
    if (event.target.closest('.dropdown')) {
      const dropbox = event.target.closest('.dropdown');
      dropbox.classList.toggle('is-active');
    }

    if (event.target.closest('.dropdown-item')) {
      searchType = event.target.closest('.dropdown-item').id;
      searchTypeName = event.target.name;
      TableSerchBox.querySelector('.current-search-type').textContent = searchTypeName || '전체';
    }

    if (event.target.closest('.checkbox')) {
      const selectedOptions = [];
      const shippingOptions = TableSerchBox.querySelectorAll('.shipping-options input');
      shippingOptions.forEach((checkbox) => {
        if (checkbox.checked) selectedOptions.push(checkbox.value);
      });
      shippingTypes = [...selectedOptions];
    }

    if (event.target.closest('.serch-start-button')) {
      const inputValue = TableSerchBox.querySelector('.serch-content').value;
      window.location.href = `/admin/order-management/?sort=recent&search-type=${searchType}&search-value=${inputValue}&shipping-options=${shippingTypes.join(
        '-'
      )}`;
    }
  });
  return TableSerchBox;
}

const render = async () => {
  let orders;
  try {
    if (SEARCH_TYPE === 'order-id') {
      orders = await fetch(`/api/v1/orders/${SEARCH_VALUE}`);
      orders = await orders.json();
      orders = [orders];
    } else if (SEARCH_TYPE === 'email') {
      orders = await fetch(`/api/v1/users/${SEARCH_VALUE}/orders`);
      orders = await orders.json();
    } else {
      orders = await fetch('/api/v1/orders');
      orders = await orders.json();
    }
    if (SHIPPING_OPTIONS) {
      orders = await orders.filter((order) => {
        const status = getShipStatus(order.status);
        if (SHIPPING_OPTIONS.indexOf(status) >= 0) return true;
        return false;
      });
    }
  } catch (err) {
    throw new Error({ message: err });
  }

  const TableSortList = SortList();

  function sortOrders(base) {
    let result;
    switch (base) {
      case RECENT:
        result = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case LONGEST:
        result = orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case ID_ASC:
        result = orders.sort((a, b) => new Date(a.orderId) - new Date(b.orderId));
        break;
      case ID_DES:
        result = orders.sort((a, b) => new Date(b.orderId) - new Date(a.orderId));
        break;
      case PRICE_ASC:
        result = orders.sort((a, b) => new Date(a.totalPayment) - new Date(b.totalPayment));
        break;
      case PRICE_DES:
        result = orders.sort((a, b) => new Date(b.totalPayment) - new Date(a.totalPayment));
        break;
      default:
        result = false;
    }
    return result;
  }
  orders = sortOrders(SORT);

  const TableEditButtons = EditButtons();

  const TableSerchBox = SerchBox();

  const Table = OrderTable(orders, SHIPPING_OPTIONS);

  const $managementContainer = $('.management-container');

  $managementContainer.append(TableSortList, TableSerchBox, TableEditButtons, Table);

  const searchOption = {
    all: '전체',
    email: '이메일',
    'order-id': '주문 번호',
  };
  if (SEARCH_TYPE && SEARCH_VALUE) {
    const searchBox = $('.search-box');
    searchBox.querySelector('.current-search-type').innerText = searchOption[SEARCH_TYPE] || '전체';
    searchBox.querySelector('.serch-content').value = SEARCH_VALUE;
  }
};
render();
