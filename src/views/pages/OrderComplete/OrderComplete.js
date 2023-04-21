// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const OrderItem = (target, { team, name, img, amount, price }) => {
  const $item = $createElement('li', 'order-item');
  $item.innerHTML = `
  <div class="image-container">
    <img src=${img} />
  </div>
  <div class="product-information">
    <span class="order-product-team">${team}</span>
    <span class="order-product-title">${name}</span>
    <span class="order-product-total-amount">${price.toLocaleString()}원</span>
    <span class="order-product-count">${amount}개</span>
  </div>
  `;
  target.append($item);
};

const render = () => {
  const orderIdByPath = location.pathname.split('/')[2];
  /*

    주문 정보를 받는 API

  */
  const DUMMY = {
    order_id: '2424121',
    orderDate: '2023-04-30',
    priceData: {
      productsPrice: 47000,
      shipPrice: 3000,
      totalPrice: 50000,
    },
    userData: {
      name: '김민규',
      phoneNumber: '010-1234-5678',
      address: '경기도 구리시 수택천로33번길 9',
      requirement: '부재시 문 앞에 놔주세요',
    },
    products: [
      {
        productID: '734541',
        name: '김성근 싸인볼',
        team: '한화',
        img: '/assets/img/product/ball.jpg',
        price: 30000,
        amount: 3,
      },
      {
        productID: '1241244',
        name: '김성근 선글라스',
        team: '태평양 돌핀스',
        img: '/assets/img/product/sunglass.jpg',
        price: 17000,
        amount: 3,
      },
    ],
  };

  const $orderList = $('.order-list');
  DUMMY.products.forEach(({ team, name, img, amount, price }) => {
    OrderItem($orderList, {
      team,
      name,
      img,
      amount,
      price,
    });
  });

  const $orderId = $('.order-id');
  $orderId.textContent = DUMMY.order_id;
  const $orderDate = $('.order-date');
  $orderDate.textContent = DUMMY.orderDate;

  $('.price em').textContent = DUMMY.priceData.productsPrice.toLocaleString();
  $('.ship em').textContent = DUMMY.priceData.shipPrice.toLocaleString();
  $('.total-price em').textContent = DUMMY.priceData.totalPrice.toLocaleString();

  $('.user-name em').textContent = DUMMY.userData.name;
  $('.user-address em').textContent = DUMMY.userData.address;
  $('.user-phone-number em').textContent = DUMMY.userData.phoneNumber;
  $('.user-requirement em').textContent = DUMMY.userData.requirement;
};

render();
