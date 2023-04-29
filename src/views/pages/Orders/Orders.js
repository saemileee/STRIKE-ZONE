// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';
import { isLogin } from '/js/api/authAPI.js';

const OrderItem = (
  target,
  { orderId, productsPayment, deliveryCharge, totalPayment, products, createdAt }
) => {
  const $item = $createElement('li', 'order-item');
  const convertedDate = new Date(createdAt);
  const orderDate = {
    year: convertedDate.getFullYear(),
    month: convertedDate.getMonth() + 1,
    day: convertedDate.getDate(),
  };

  $item.innerHTML = `
    <div class="order-item-header">
      <h1>${orderDate.year}. ${orderDate.month}. ${orderDate.day} 주문</h1>
    </div>
    <ul class="order-item-products-list">
      ${products
        .map(
          ({ productName, img, price, quantity }) => `
          <li class="order-item-product">
            <img class="product-img" src=${img}>
            <div class="order-item-product-desc">
              <h2 class="product-name">
                ${productName}
              </h2>
              <span class="product-price">
                ${price.toLocaleString()}원
              </span>
              <span class="product-quantity">
                ${quantity}개
              </span>
              <span class="product-price">
              </span>
            </div>
          </li>
        `
        )
        .join('')}
    </ul>
    <div class="price">
      <span>상품 가격 ${productsPayment.toLocaleString()}원</span>
      <span>+</span>
      <span>배송비 ${deliveryCharge.toLocaleString()}원</span>
      <span>=</span>
      <span class="total-price">총 ${totalPayment.toLocaleString()}원</span>
    </div>
  `;

  $item.addEventListener('click', (event) => {
    location.href = `/user/orders/${orderId}`;
  });
  target.append($item);
};

const render = async () => {
  let email;
  try {
    email = await isLogin();
    if (!email) {
      alert('회원 전용 페이지 입니다!');
      location.href = '/login';
    }
  } catch (err) {
    alert(err);
    location.href = '/NotFound';
  }

  const orders = await fetch(`/api/v1/users/${email}/orders`).then((res) => res.json());

  const $userData = $('.user-data');
  $userData.innerHTML = `
    <h3 class="title is-3">주문 목록</h3>
    <hr>
    <ul class="order-list">
    </ul>
  `;

  const $orderList = $('.order-list');
  orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((order) => {
      OrderItem($orderList, order);
    });
};

render();
