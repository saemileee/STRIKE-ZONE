import { $, selectAllCheckbox, autoHyphen } from '/js/utils.js';
import { getCartListSelected, deleteItemOfCart } from '/js/api/cartAPI.js';
import { fetchData, postData } from '/js/api/api.js';
import { isLogin, getUserInfo } from '/js/api/authAPI.js';

const params = new URLSearchParams(window.location.search);

const IS_CART = params.get('cart') !== 'false';

// 전체선택 버튼 기능
selectAllCheckbox('term-checkbox', 'select-all');

const {
  email: userEmail,
  koreanName: ordererName,
  phoneNumber: ordererPhoneNumber,
  address: ordererAddress,
} = await getUserInfo();

const cartListSelected = getCartListSelected();

if (!(await isLogin())) {
  window.location.href = '/login';
}

// 결제 버튼 업데이트
function updateCheckoutButton(amount) {
  const checkoutButton = document.querySelector('.check-out-button');
  checkoutButton.value = `${amount.toLocaleString()}원 결제하기`;
  const formElement = document.querySelector('.order-form');
  formElement.addEventListener('submit', postOrderData);
}

// 결제정보 데이터 가져오기
async function getReceiptData() {
  const { deliveryCharge } = await fetchData('/shippings/default');
  const productsData = await getOrderProducts();
  const totalAmount = productsData.reduce((acc, product) => acc + product.totalProductAmount, 0);

  const deliveryChargeAmount = await deliveryCharge;
  const totalPaymentAmount = totalAmount + deliveryChargeAmount;

  updateCheckoutButton(totalPaymentAmount);
  renderReceipt(totalAmount, deliveryChargeAmount, totalPaymentAmount);

  // return products;
}

await getReceiptData();

// 결제정보 렌더링
function renderReceipt(totalProductAmount, deliveryCharge, totalPaymentAmount) {
  const totalProductAmountElement = document.querySelector('.total-product-amount');
  totalProductAmountElement.innerHTML = `${totalProductAmount.toLocaleString()}원`;

  const shippingChargeElement = document.querySelector('.shipping-charge');
  shippingChargeElement.innerHTML = `${deliveryCharge.toLocaleString()}원`;

  const totalPaymentAmountElement = document.querySelector('.total-pay-amount');
  totalPaymentAmountElement.innerHTML = `${totalPaymentAmount.toLocaleString()}원`;
}

// 주문 리스트 가져오기
async function getOrderProducts() {
  // 바로구매 || 장바구니 구매 확인하여 프로덕트 디비 가져오기
  const cartMode = params.get('cart');
  const products =
    cartMode === 'false'
      ? [{ productId: params.get('id'), quantity: params.get('quantity') }]
      : cartListSelected.map((product) => ({
          productId: product.id,
          quantity: product.amount,
        }));

  const productsData = products.map(async (product) => {
    const { discountedPrice, name, teamName, price, rate, img } = await fetchData(
      `/products/${product.productId}`
    );
    const totalProductAmount = discountedPrice * product.quantity;

    return {
      productId: product.productId,
      quantity: product.quantity,
      productName: name,
      price: discountedPrice,
      img: img[0],
      team: teamName,
      originalPrice: price,
      rate,
      totalProductAmount,
    };
  });

  return Promise.all(productsData);
}

// 주문 리스트 렌더링
function renderOrderList(
  team,
  name,
  quantity,
  rate,
  price,
  discountedPrice,
  totalProductAmount,
  img
) {
  const orderProduct = document.createElement('div');
  orderProduct.className = 'order-product';
  orderProduct.innerHTML = `<div class="image-container">
     <img src="${img}" />
  </div>
  <div class="product-information">
    <div>
    <span class="order-product-team">${team}</span>
    <span class="order-product-title">${name}</span
    ></div>
    ${
      rate !== 0
        ? `<div><span class="order-product-rate">${rate}%</span
    ><span class="order-product-price">${price.toLocaleString()}원</span
    ></div>`
        : ''
    }<div><span class="order-product-discounted-price">${discountedPrice.toLocaleString()}원 | </span
    ><span class="order-product-count">${quantity}개</span></div>
    <span class="order-product-total-amount">${totalProductAmount.toLocaleString()}원</span
    >
  </div>`;

  const orderListContainer = document.querySelector('.order-list-container');
  orderListContainer.append(orderProduct);
}

function displayOrderList(products) {
  products.forEach((product) => {
    const {
      team,
      productName: name,
      quantity,
      rate,
      originalPrice: price,
      price: discountedPrice,
      totalProductAmount,
      img,
    } = product;
    renderOrderList(team, name, quantity, rate, price, discountedPrice, totalProductAmount, img);
  });
}
displayOrderList(await getOrderProducts());

// 주소찾기 기능 연결
function findAndFillAddress(target) {
  document.querySelectorAll(`.${target}-address`).forEach((input) => {
    input.addEventListener('click', (event) => {
      event.preventDefault();
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

// 유효성 검사
// function checkValidation(target) {
//   const regex = {
//     'user-email':
//       /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
//   };
//   if (!target.value.match(regex[target.id])) return false;
//   return true;
// }
// function isValid(event) {
//   if (!checkValidation(event.target)) {
//     event.target.classList.add('is-danger');
//     const warning = $(`.${event.target.id}-warning`);
//     warning.style.display = '';
//   } else {
//     event.target.classList.remove('is-danger');
//     const warning = $(`.${event.target.id}-warning`);
//     warning.style.display = 'none';
//   }
// }
// $('.user-email').addEventListener('blur', isValid);

// 폰 번호 오토하이픈
autoHyphen('.user-phone-number-back');
autoHyphen('.receiver-phone-number-back');

// 로그인한 유저 정보 기반으로 주문자 폼 채우기

function fillOrdererInformation() {
  const ordererInput = $('.user-name');
  const ordererPhoneNumberProInput = $('.user-phone-number-pro');
  const ordererPhoneNumberBackInput = $('.user-phone-number-back');
  const ordererAddressZonecode = $('.user-address-zonecode');
  const ordererAddressBase = $('.user-address-base');
  const ordererAddressDetail = $('.user-address-detail');

  ordererInput.value = ordererName;
  ordererPhoneNumberProInput.value = ordererPhoneNumber.split('-')[0];
  ordererPhoneNumberBackInput.value = `${ordererPhoneNumber.split('-')[1]}-${
    ordererPhoneNumber.split('-')[2]
  }`;
  ordererAddressZonecode.value = ordererAddress.postCode;
  ordererAddressBase.value = ordererAddress.roughAddress;
  ordererAddressDetail.value = ordererAddress.detailAddress;
}
fillOrdererInformation();

// 함수로 주문자와 동일한 정보 채우기 구현
const $fillDeliveryInformationButton = $('.fill-delivery-information');
$fillDeliveryInformationButton.addEventListener('click', (event) => {
  event.preventDefault();
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

// 주문자 정보 가져오기
function getOrdererData() {
  const email = userEmail;
  const name = $('.user-name').value;
  const phoneNumber = `${$('.user-phone-number-pro').value}-${$('.user-phone-number-back').value}`;
  return { email, name, phoneNumber };
}

// 수령자 정보 가져오기
function getRecipientData() {
  const name = $('.receiver').value;
  const address1 = $('.receiver-address-base').value;
  const address2 = $('.receiver-address-detail').value;
  const zipCode = $('.receiver-address-zonecode').value;
  const phoneNumber = `${$('.receiver-phone-number-pro').value}-${
    $('.receiver-phone-number-back').value
  }`;

  return {
    name,
    address1,
    address2,
    zipCode,
    phoneNumber,
  };
}

// 결제수단 정보 가져오기
function getPaymentMethodData() {
  const paymentMethods = document.querySelectorAll('.payment-method input[type="radio"]');

  for (const paymentMethod of paymentMethods) {
    if (paymentMethod.checked) return paymentMethod.value;
  }
}

// 주문 데이터 전송
async function postOrderData(event) {
  event.preventDefault();
  const products = await getOrderProducts();
  const orderer = getOrdererData();
  const recipient = getRecipientData();
  const paymentMethod = getPaymentMethodData();
  const data = {
    products,
    orderer,
    recipient,
    paymentMethod,
  };
  const postedData = await postData('/orders', data);
  if (IS_CART) {
    products.forEach(({ productId }) => {
      console.log(productId);
      deleteItemOfCart(productId);
    });
  }
  window.location.href = `/order/complete?id=${postedData.createdOrder.orderId}`;
}
