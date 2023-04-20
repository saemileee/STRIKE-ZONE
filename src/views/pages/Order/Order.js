import { $ } from '/js/utils.js';

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

  console.log(userData, deliveryData, paymentMethod);
});
