// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const render = () => {
  // const orderIdByPath = location.pathname.split('/')[2];
  const DUMMY = {
    _id: '64436ebf865e23b8f38616b2',
    orderId: 1,
    productsPayment: 365000,
    deliveryCharge: 3000,
    totalPayment: 368000,
    products: [
      {
        productId: 3,
        productName: '[롯데 자이언츠] 자수형 어센틱 원정 유니폼',
        quantity: 3,
        price: 100000,
        img: '/assets/img/products/23-lotte-giants-authentic-away-uniform-1.jpg',
        _id: '64436ebf865e23b8f38616b3',
      },
      {
        productId: 1,
        productName: '[롯데 자이언츠] 일반형 원정 유니폼',
        quantity: 1,
        price: 65000,
        img: '/assets/img/products/23-lotte-giants-away-uniform-1.jpg',
        _id: '64436ebf865e23b8f38616b4',
      },
    ],
    orderer: {
      email: 'abc@example.com',
      name: '홍길동',
      phoneNumber: '010-1234-5678',
      _id: '64436ebf865e23b8f38616b5',
    },
    recipient: {
      name: '홍길동',
      address1: '경기 성남시 분당구 정자일로 95',
      address2: '1층',
      zipCode: '13561',
      phoneNumber: '010-1234-5678',
      _id: '64436ebf865e23b8f38616b6',
    },
    createdAt: '2023-04-22T05:21:03.229Z',
    updatedAt: '2023-04-22T05:21:03.229Z',
    __v: 0,
  };

  const { orderId, createdAt, products, productsPayment, deliveryCharge, totalPayment, recipient } =
    DUMMY;
  const convertedDate = new Date(createdAt);
  const orderDateObj = {
    year: `${convertedDate.getFullYear()}`,
    month: `${convertedDate.getMonth()}${1}`,
    date: `${convertedDate.getDate()}`,
  };
  const orderDate = `${orderDateObj.year}-${orderDateObj.month}-${orderDateObj.date}`;

  const $userData = $('.user-data');
  $userData.innerHTML = `
    <h3 class="title is-3">주문 내역</h3>
    <hr>
    <div class="order-list-container">
      <div class="order-data order-id-group">
        <p>주문 번호</p>
        <em class="order-id">${orderId}</em>
      </div>
      <div class="order-data order-address">
        <p>주문 일자</p>
        <em class="order-date">${orderDate}</em>
      </div>
      <hr>
      <h4 class="title is-4">주문상품</h4>
      <ul class="order-list">
        ${products
          .map(
            ({ productName, img, price, quantity, productId }) => `
            <a href="/products/${productId}">
              <li class="order-item-product"">
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
            </a>
          `
          )
          .join('')}
      </ul>
      <hr>
      <div class="price-box ship">
        <p>상품 금액</p>
        <em>${productsPayment.toLocaleString()}</em>
      </div>
      <div class="price-box price">
        <p>배송비</p>
        <em>${deliveryCharge.toLocaleString()}</em>
      </div>
      <hr>
      <div class="price-box total-price">
        <p>총 결제 금액</p>
        <em>${totalPayment.toLocaleString()}</em>
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
          <em>${recipient.name}</em>
        </div>
        <div class="user-phone-number">
          <p>주소</p>
          <em>${recipient.address1} ${recipient.address2} [${recipient.zipCode}]</em>
        </div>
        <div class="user-address">
          <p>연락처</p>
          <em>${recipient.phoneNumber}</em>
        </div>
      </div>
    </div>
  </section>
  `;
};

render();
