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
  // const orderIdByPath = location.pathname.split('/')[2];
  const DUMMY = {
    order_id: '2424121',
    orderDate: '2023-04-30',
    priceData: {
      productsPrice: 47000,
      shipPrice: 50000,
      totalPrice: 3000,
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

  const $userData = $('.user-data');
  $userData.innerHTML = `
    <h3 class="title is-3">주문 내역</h3>
    <hr>
    <div class="order-list-container">
      <div class="order-data order-id-group">
        <p>주문 번호</p>
        <em class="order-id">123123</em>
      </div>
      <div class="order-data order-address">
        <p>주문 일자</p>
        <em class="order-date">123123</em>
      </div>
      <hr>
      <h4 class="title is-4">주문상품</h4>
      <ul class="order-list">
      </ul>
      <hr>
      <div class="price-box ship">
        <p>상품 금액</p>
        <em>47,000</em>
      </div>
      <div class="price-box price">
        <p>배송비</p>
        <em>3,000</em>
      </div>
      <hr>
      <div class="price-box total-price">
        <p>총 결제 금액</p>
        <em>50,000</em>
      </div>
    </div>
    <hr>
    <div class="order-user-data">
      <h4 class="title is-3">배송지 정보</h4>
      <hr>
      <h4 class="title is-4">받으시는 분</h4>
      <div class="user-data-box">
        <div class="user-name">
          <p>받는 사람</p>
          <em></em>
        </div>
        <div class="user-phone-number">
          <p>주소</p>
          <em></em>
        </div>
        <div class="user-address">
          <p>연락처</p>
          <em></em>
        </div>
        <div class="user-requirement">
          <p>요청사항</p>
          <em></em>
        </div>
      </div>
    </div>
  </section>
  `;

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
