import { $ } from '/js/utils.js';
import { getCartListSelected, getOrderPrice } from '/js/api/cartAPI.js';

const cartListSelected = getCartListSelected();
const orderPrice = getOrderPrice();

function renderOrderList() {
  const orderListContainer = document.querySelector('.order-list-container');
  cartListSelected.forEach(orderData => {
    const { amount, id, img, name, price, team, total } = orderData;
    const orderProduct = document.createElement('div');
    orderProduct.className = 'order-product';
    orderProduct.innerHTML = `<div class="image-container">
    <img src="${img}" />
  </div>
  <div class="product-information">
    <span class="order-product-team">${team}</span>
    <span class="order-product-title">${name}</span
    ><span class="order-product-total-amount">${price.toLocaleString()}원</span
    ><span class="order-product-count">${amount}개</span>
  </div>`;
    orderListContainer.append(orderProduct);
  });

  const totalProductAmountElement = document.querySelector(
    '.total-product-amount'
  );
  totalProductAmountElement.innerHTML = `${orderPrice.toLocaleString()}원`;
}

renderOrderList();

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

const $checkOutButton = $('.check-out-button');
$checkOutButton.addEventListener('click', () => {
  const userName = $('.user-name').value;
  const userEmail = $('.user-email').value;
  const userPhoneNumberPro = $('.user-phone-number-pro').value;
  const userPhoneNumberBack = $('.user-phone-number-back').value;
  const userData = {
    userName,
    userEmail,
    userPhoneNumber: `${userPhoneNumberPro}${userPhoneNumberBack}`,
  };

  const receiver = $('.receiver').value;
  const receiverPhoneNumberPro = $('.receiver-phone-number-pro').value;
  const receiverPhoneNumberBack = $('.receiver-phone-number-back').value;
  const receiverAddressZonecode = $('.receiver-address-zonecode').value;
  const receiverAddressBase = $('.receiver-address-base').value;
  const receiverAddressDetail = $('.receiver-address-detail').value;
  const deliveryData = {
    receiver,
    receiverPhoneNumber: `${receiverPhoneNumberPro}${receiverPhoneNumberBack}`,
    receiverAddressZonecode,
    receiverAddressBase,
    receiverAddressDetail,
  };

  const $paymentMethods = document.getElementsByName('payment-method');
  let paymentMethod = $paymentMethods[0];
  for (const element of $paymentMethods) {
    paymentMethod.checked ? (paymentMethod = element.className) : null;
  }

  console.log(
    cartListSelected,
    orderPrice,
    userData,
    deliveryData,
    paymentMethod
  );
});
