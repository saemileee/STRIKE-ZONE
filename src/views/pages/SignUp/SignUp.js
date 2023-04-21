import * as utils from '/js/utils.js';

const signUpForm = utils.$('.sign-up-form');
const newUserEmail = utils.$('#email');
const newUserPassword = utils.$('#password');
const newUserPasswordVerify = utils.$('#passwordVerify');
const newUserPhoneNumber = utils.$('#phoneNumber');
const findAddress = document.querySelectorAll('.address');
const teams = document.querySelectorAll('.team');

function checkValidation(target) {
  const regex = {
    email:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
  };
  if (!target.value.match(regex[target.id])) return false;
  return true;
}

function isValid(event) {
  if (!checkValidation(event.target)) {
    event.target.classList.add('is-danger');
    const warning = utils.$(`.${event.target.id}-warning`);
    warning.style.display = '';
  } else {
    event.target.classList.remove('is-danger');
    const warning = utils.$(`.${event.target.id}-warning`);
    warning.style.display = 'none';
  }
}

function passwordVerify() {
  const warning = utils.$('.password-verify-warning');
  if (
    newUserPassword.value !== newUserPasswordVerify.value ||
    newUserPasswordVerify.value === ''
  ) {
    newUserPasswordVerify.classList.add('is-danger');
    warning.style.display = '';
    return false;
  }
  newUserPasswordVerify.classList.remove('is-danger');
  warning.style.display = 'none';
  return true;
}

function userInfoComplete() {
  if (!checkValidation(newUserEmail)) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (!checkValidation(newUserPassword)) {
    alert('비밀번호 형식이 올바르지 않습니다.');
    return false;
  }
  if (!passwordVerify()) {
    alert('비밀번호가 일치하지 않습니다.');
    return false;
  }
  return true;
}

function autoHyphen() {
  newUserPhoneNumber.value = newUserPhoneNumber.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{3,4})(\d{4})$/, `$1-$2`);
}

function getPhoneNumber() {
  const firstNumber = utils.$('#firstPhoneNumber');
  return `${firstNumber.options[firstNumber.selectedIndex].text}-${
    newUserPhoneNumber.value
  }`;
}

function searchZipcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      const roadAddr = data.roadAddress;
      document.getElementById('postCode').value = data.zonecode;
      document.getElementById('roughAddress').value = roadAddr;
    },
  }).open();
}

function selecteTeam(event) {
  event.target.classList.toggle('selected');
  event.target.parentNode.classList.toggle('is-info');
}

function getCheerTeam() {
  const selectedTeam = document.querySelectorAll('.selected');
  const cheerTeam = [];
  selectedTeam.forEach((node) => {
    cheerTeam.push(node.value);
  });
  return cheerTeam.join(' ');
}

function onSignUpSubmit(e) {
  e.preventDefault();
  if (userInfoComplete()) {
    const newUser = {};
    const userInfoKey = [
      'email',
      'password',
      'koreanName',
      'phoneNumber',
      'postCode',
      'roughAddress',
      'detailAddress',
    ];
    for (let i = 0; i < userInfoKey.length; i++) {
      const userInfo = utils.$(`#${userInfoKey[i]}`);
      if (userInfoKey[i] === 'phoneNumber') {
        newUser[userInfoKey[i]] = getPhoneNumber();
      } else {
        newUser[userInfoKey[i]] = userInfo.value;
      }
    }
    newUser['cheerTeam'] = getCheerTeam();
    
    fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((user) => console.log(user));
  }
}

signUpForm.addEventListener('submit', onSignUpSubmit);
newUserEmail.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', passwordVerify);
newUserPasswordVerify.addEventListener('blur', passwordVerify);
newUserPhoneNumber.addEventListener('input', autoHyphen);
for (let i = 0; i < 3; i++) {
  findAddress[i].addEventListener('click', searchZipcode);
}
for (let i = 0; i < teams.length; i++) {
  teams[i].addEventListener('click', selecteTeam);
}
