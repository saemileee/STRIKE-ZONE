// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

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
  const DUMMY = [
    {
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
    },
    {
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
      createdAt: '2022-04-22T05:21:03.229Z',
      updatedAt: '2022-04-22T05:21:03.229Z',
      __v: 0,
    },
  ];
  // const orders = await fetch("/api/v1/orders").then(res => res.json());

  const $userData = $('.user-data');
  $userData.innerHTML = `
    <h3 class="title is-3">주문 목록</h3>
    <hr>
    <ul class="order-list">
    </ul>
  `;

  const $orderList = $('.order-list');
  DUMMY.forEach((order) => {
    OrderItem($orderList, order);
  });
};

render();
