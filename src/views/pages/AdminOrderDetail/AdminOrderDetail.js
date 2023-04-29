import { $ } from '/js/utils.js';

const render = async () => {
  const [, , , orderIdByPath] = location.pathname.split('/');
  const orderData = await fetch(`/api/v1/orders/${orderIdByPath}`).then((res) => res.json());
  const {
    orderId,
    createdAt,
    recipient: {
      address1,
      address2,
      name: recipientName,
      phoneNumber: recipientPhoneNumber,
      zipCode,
    },
    productsPayment,
    products,
    deliveryCharge,
    totalPayment,
    paymentMethod,
    status,
  } = orderData;

  const convertedDate = new Date(createdAt);
  const orderDateObj = {
    year: `${convertedDate.getFullYear()}`,
    month: `${convertedDate.getMonth() + 1}`,
    date: `${convertedDate.getDate()}`,
  };
  const orderDate = `${orderDateObj.year}-${orderDateObj.month}-${orderDateObj.date}`;

  const $managementContainer = $('.management-container');
  $managementContainer.innerHTML = `
    <h3 class="title is-4">주문 내역</h3>
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
            <a href="/admin/product-management/${productId}">
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
          <em>${recipientName}</em>
        </div>
        <div class="user-phone-number">
          <p>주소</p>
          <em>${address1} ${address2} [${zipCode}]</em>
        </div>
        <div class="user-address">
          <p>연락처</p>
          <em>${recipientPhoneNumber}</em>
        </div>
      </div>
    </div>
    <hr>
    <div class="status">
      <h4 h4 class="title is-3">배송 상태</h4>
      <em>${status}</em>
    </div>
    <hr>
    <div class="payment">
      <h4 h4 class="title is-3">결제 수단</h4>
      <em>${paymentMethod}</em>
    </div>
  </section>
  `;
};

render();
