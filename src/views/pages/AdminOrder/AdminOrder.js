import { $, $createElement } from '/js/utils.js';
import { isLogin, getAuthOption } from '/js/api/authAPI.js';

const [RECENT, LONGEST, ID_ASC, ID_DES, PRICE_ASC, PRICE_DES] = [
  'recent',
  'longest',
  'id-asc',
  'id-des',
  'price-asc',
  'price-des',
];

const render = async () => {
  let orders;
  try {
    orders = await fetch('/api/v1/orders');
    orders = await orders.json();
  } catch (err) {
    throw new Error({ message: err });
  }
  console.log(orders);

  const urlParams = new URL(location.href).searchParams;
  const SORT = urlParams.get('sort');

  if (!SORT) location.href = `/admin/order-management/?sort=${RECENT}`;

  const SortList = $createElement('ul', 'sort-list');
  SortList.innerHTML = `
    <li class="sort-list-item" id=${RECENT}>최신순</li>  
    <li class="sort-list-item" id=${LONGEST}>오래된순</li>
    <li class="sort-list-item" id=${ID_ASC}>주문번호 오름차순</li>
    <li class="sort-list-item" id=${ID_DES}>주문번호 내림차순</li>
    <li class="sort-list-item" id=${PRICE_ASC}>낮은 가격순</li>
    <li class="sort-list-item" id=${PRICE_DES}>높은 가격순</li>
  `;

  SortList.querySelectorAll('li').forEach((li) => {
    if (li.id === SORT) li.classList.add('selected-sort');
  });

  SortList.addEventListener('click', (event) => {
    if (event.target.closest('li')) {
      if (event.target.id === SORT) return;
      location.href = `/admin/order-management/?sort=${event.target.id}`;
    }
  });

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

  const EditButtons = $createElement('div', 'edit-buttons');
  EditButtons.innerHTML = `
    <button class="delete-selected button is-dark">선택 항목 삭제</button>
    <button class="delete-selected button is-dark">선택 항목 배송 정보 수정</button>
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
              이메일
            </a>
            <a href="#" class="dropdown-item is-active">
              주문 번호
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
          <th>주문정보</th>
          <th>고객정보</th>
          <th>주문상품</th>
          <th>결제정보</th>
          <th>배송상태</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${orders
          .map(
            ({
              orderId,
              createdAt,
              orderer: { email: ordererEmail, name: ordererName, phoneNumber: ordererPhoneNumber },
              recipient: {
                address1,
                address2,
                name: recipientName,
                phoneNumber: recipientPhoneNumber,
                zipCode,
              },
              requirement,
              productsPayment,
              products,
              deliveryCharge,
              totalPayment,
              paymentMethod,
              status,
            }) => `
            <tr id=${orderId}>
              <td>
                <label>
                  <input class="checkbox" type="checkbox"></input>
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
              <td class="order-orderer-square">${ordererName}</td>
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
              <td>${status}</td>
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
      if (selectedRow.classList.contains('selected')) selectedIds.push(Number(id));
      else selectedIds.console.log(selectedIds);
    }
    if (event.target.closest('.delete-one')) {
      const currentOrderId = event.target.closest('tr').id;
      if (!confirm('해당 항목을 삭제하시겠습니까?')) return;
      try {
        await fetch(`/api/v1/orders/${currentOrderId}`, { method: 'DELETE' });
        location.reload();
      } catch (err) {
        throw new Error({ message: err });
      }
    }
  });

  $managementContainer.append(SortList, SerchBox, EditButtons, Table);
};
render();
