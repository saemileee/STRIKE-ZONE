import { $ } from '/js/utils.js';
import { getCartListSelected, getOrderPrice } from '/js/api/cartAPI.js';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const cartListSelected = getCartListSelected();
const orderPrice = getOrderPrice();
const orderListContainer = document.querySelector('.order-list-container');

async function getData() {
  const { deliveryCharge } = await fetchData('/api/v1/shippings/default');
  let products = [];
  let totalAmount = 0;

  for (let cartList of cartListSelected) {
    const { id: productId, amount: quantity } = cartList;
    const { discountedPrice, name, teamName, price, rate, img } =
      await fetchData(`/api/v1/products/${productId}`);

    const totalProductAmount = discountedPrice * quantity;
    totalAmount += totalProductAmount;

    renderOrderList(
      teamName,
      name,
      quantity,
      rate,
      price,
      discountedPrice,
      totalProductAmount,
      img
    );

    products.push({
      productId,
      productName: name,
      quantity,
      price: discountedPrice,
      img: img[0],
    });
  }

  const deliveryChargeAmount = await deliveryCharge;
  const totalPaymentAmount = totalAmount + deliveryChargeAmount;
  updateCheckoutButton(totalPaymentAmount);
  renderReceipt(totalAmount, deliveryChargeAmount, totalPaymentAmount);

  return products;
}

async function updateCheckoutButton(amount) {
  const checkoutButton = document.querySelector('.check-out-button');
  checkoutButton.value = `${amount.toLocaleString()}원 결제하기`;
}

getData();

function renderOrderList(
  team,
  name,
  quantity,
  rate,
  price,
  discountedPrice,
  totalProductAmount,
  images
) {
  const orderProduct = document.createElement('div');
  const img = images[0];
  orderProduct.className = 'order-product';
  orderProduct.innerHTML = `<div class="image-container">
     <img src="${img}" />
  </div>
  <div class="product-information">
    <span class="order-product-team">${team}</span>
    <span class="order-product-title">${name}</span
    ><span class="order-product-rate">${rate}%</span
    ><span class="order-product-price">${price.toLocaleString()}원</span
    ><span class="order-product-discounted-price">${discountedPrice.toLocaleString()}원</span
    ><span class="order-product-count">${quantity}개</span>
    <span class="order-product-total-amount">${totalProductAmount.toLocaleString()}원</span
    >
  </div>`;
  orderListContainer.append(orderProduct);
}

function renderReceipt(totalProductAmount, deliveryCharge, totalPaymentAmount) {
  const totalProductAmountElement = document.querySelector(
    '.total-product-amount'
  );
  totalProductAmountElement.innerHTML = `${totalProductAmount.toLocaleString()}원`;

  const shippingChargeElement = document.querySelector('.shipping-charge');
  shippingChargeElement.innerHTML = `${deliveryCharge.toLocaleString()}원`;

  const totalPaymentAmountElement = document.querySelector('.total-pay-amount');
  totalPaymentAmountElement.innerHTML = `${totalPaymentAmount.toLocaleString()}원`;
}

//주소찾기 기능 연결
function findAndFillAddress(target) {
  document.querySelectorAll(`.${target}-address`).forEach(input => {
    input.addEventListener('click', () => {
      new daum.Postcode({
        oncomplete(data) {
          $(`.${target}-address-zonecode`).value = data.zonecode;
          $(`.${target}-address-base`).value = data.address;
          $(`.${target}-address-detail`).focus();
        },
      }).open();
    });
  });
}
findAndFillAddress('user');
findAndFillAddress('receiver');

//유효성 검사
function checkValidation(target) {
  const regex = {
    'user-email':
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  };
  if (!target.value.match(regex[target.id])) return false;
  return true;
}
function isValid(event) {
  if (!checkValidation(event.target)) {
    event.target.classList.add('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.style.display = '';
  } else {
    event.target.classList.remove('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.style.display = 'none';
  }
}
$('.user-email').addEventListener('blur', isValid);

//전화번호 하이픈 추가
function autoHyphen(target) {
  const targetElement = $(target);
  targetElement.addEventListener('input', () => {
    targetElement.value = targetElement.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{3,4})(\d{4})$/, '$1-$2');
  });
}
autoHyphen('.user-phone-number-back');
autoHyphen('.receiver-phone-number-back');

//주문자와 동일한 정보 채우기
const $fillDeliveryInformationButton = $('.fill-delivery-information');
$fillDeliveryInformationButton.addEventListener('click', () => {
  const userName = $('.user-name').value;
  const userPhoneNumberPro = $('.user-phone-number-pro').value;
  const userPhoneNumberBack = $('.user-phone-number-back').value;
  const userAddressZonecode = $('.user-address-zonecode').value;
  const userAddressBase = $('.user-address-base').value;
  const userAddressDetail = $('.user-address-detail').value;

  const $receiverInput = $('.receiver');
  const $receiverPhoneNumberProInput = $('.receiver-phone-number-pro');
  const $receiverPhoneNumberBackInput = $('.receiver-phone-number-back');
  const $receiverAddressZonecode = $('.receiver-address-zonecode');
  const $receiverAddressBase = $('.receiver-address-base');
  const $receiverAddressDetail = $('.receiver-address-detail');

  $receiverInput.value = userName;
  $receiverPhoneNumberProInput.value = userPhoneNumberPro;
  $receiverPhoneNumberBackInput.value = userPhoneNumberBack;
  $receiverAddressZonecode.value = userAddressZonecode;
  $receiverAddressBase.value = userAddressBase;
  $receiverAddressDetail.value = userAddressDetail;
});

//전체선택 버튼
function selectAllCheckbox() {
  const termCheckboxElements = document.querySelectorAll('.term-checkbox');
  let selectAllCheckboxElement = document.querySelector('.select-all');
  selectAllCheckboxElement.addEventListener('change', () => {
    if (selectAllCheckboxElement.checked) {
      for (let checkbox of termCheckboxElements) {
        checkbox.checked = true;
      }
    } else {
      for (let checkbox of termCheckboxElements) {
        checkbox.checked = false;
      }
    }
  });

  for (let checkbox of termCheckboxElements) {
    checkbox.addEventListener('change', () => {
      let checkedCount = 0;
      for (let _checkbox of termCheckboxElements) {
        _checkbox.checked === true ? checkedCount++ : null;
      }
      checkedCount === termCheckboxElements.length
        ? (selectAllCheckboxElement.checked = true)
        : (selectAllCheckboxElement.checked = false);
    });
  }
}
selectAllCheckbox();

function getOrdererData() {
  const email = $('.user-email').value;
  const name = $('.user-name').value;
  const phoneNumber = `${$('.user-phone-number-pro').value}-${
    $('.user-phone-number-back').value
  }`;
  return { email, name, phoneNumber };
}

function getRecipientData() {
  const name = $('.receiver').value;
  const address1 = $('.receiver-address-base').value;
  const address2 = $('.receiver-address-detail').value;
  const zipCode = $('.receiver-address-zonecode').value;
  const phoneNumber = `${$('.receiver-phone-number-pro').value}-${
    $('.receiver-phone-number-back').value
  }`;

  return { name, address1, address2, zipCode, phoneNumber };
}

async function postOrderData(event) {
  event.preventDefault();
  const products = await getData();
  const orderer = getOrdererData();
  const recipient = getRecipientData();
  const data = { products, orderer, recipient };
  console.log(data);
  fetch('/api/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      window.location.href = `/user/orders/complete/${data.createdOrder.orderId}`;
    });
}

const $checkOutButton = $('.check-out-button');
$checkOutButton.addEventListener('click', postOrderData);
