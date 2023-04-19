import * as utils from '../../utils.js';

const signUpForm = utils.$('.sign-up-form');
const newUserEmail = utils.$('#email');
const newUserPassword = utils.$('#password');
const newUserPasswordVerify = utils.$('#passwordVerify');
const newUserPhoneNumber = utils.$('#userPhoneNumber');
const findAddress = document.querySelectorAll('.address');

const newMemberInfo = document.querySelectorAll('input');

const onSignUpSubmit = (e) => {
  e.preventDefault();
  const newMember = {};
  newMemberInfo.forEach((node) => {
    const infoId = node.id;
    newMember[infoId] = node.value;
  });
  console.log(newMember);
};

const isValid = (e) => {
  const regex = {
    email:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
  };
  if (!e.target.value.match(regex[e.target.id])) {
    e.target.classList.add('is-danger');
  } else {
    e.target.classList.remove('is-danger');
  }
};

const passwordVerify = () => {
  if (
    newUserPassword.value !== newUserPasswordVerify.value ||
    newUserPasswordVerify.value === ''
  ) {
    newUserPasswordVerify.classList.add('is-danger');
  } else {
    newUserPasswordVerify.classList.remove('is-danger');
  }
};

const autoHyphen = () => {
  newUserPhoneNumber.value = newUserPhoneNumber.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{3,4})(\d{4})$/, `$1-$2`);
};

const searchZipcode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      var roadAddr = data.roadAddress;
      document.getElementById('zipcode').value = data.zonecode;
      document.getElementById('firstAddress').value = roadAddr;
    },
  }).open();
};

for (let i = 0; i < 3; i++)
  findAddress[i].addEventListener('click', searchZipcode);

signUpForm.addEventListener('submit', onSignUpSubmit);
newUserEmail.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', isValid);
newUserPasswordVerify.addEventListener('blur', passwordVerify);
newUserPhoneNumber.addEventListener('input', autoHyphen);
