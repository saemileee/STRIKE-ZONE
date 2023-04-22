import { $ } from '/js/utils.js';

const signUpForm = $('.sign-up-form');
const newUserEmail = $('#email');
const newUserPassword = $('#password');
const newUserPasswordVerify = $('#passwordVerify');
const newUserPhoneNumber = $('#phoneNumber');
const findAddress = document.querySelectorAll('.address');
const teams = document.getElementsByName('team');

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
    const warning = $(`.${event.target.id}-warning`);
    warning.style.display = '';
  } else {
    event.target.classList.remove('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.style.display = 'none';
  }
}

function passwordVerify() {
  const warning = $('.password-verify-warning');
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
  const firstNumber = $('#firstPhoneNumber');
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

function selectTeam() {
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].checked) {
      teams[i].parentNode.classList.add('is-info');
    } else {
      teams[i].parentNode.classList.remove('is-info');
    }
  }
}

function getCheerTeam() {
  const teamID = {
    롯데자이언츠: '6440ec92b1154c52aee0c4a7',
    KIA타이거즈: '6440ee20be78f271d6821815',
    삼성라이온즈: '6440ee2ebe78f271d6821817',
    LG트윈스: '6440ee33be78f271d6821819',
    두산베어스: '6440ee37be78f271d682181b',
    키움히어로즈: '6440ee3cbe78f271d682181d',
    SSG랜더스: '6440ee43be78f271d682181f',
    KT위즈: '6440ee48be78f271d6821821',
    한화이글스: '6440ee4dbe78f271d6821823',
    NC다이노스: '6440ee51be78f271d6821825',
  };
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].checked) {
      return teamID[teams[i].value];
    }
  }
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
      'cheerTeam',
    ];
    for (let i = 0; i < userInfoKey.length; i++) {
      const userInfo = $(`#${userInfoKey[i]}`);
      if (userInfoKey[i] === 'phoneNumber') {
        newUser[userInfoKey[i]] = getPhoneNumber();
      } else if (userInfoKey[i] === 'cheerTeam') {
        newUser[userInfoKey[i]] = getCheerTeam();
      } else {
        newUser[userInfoKey[i]] = userInfo.value;
      }
    }

    fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((user) => console.log(user))
      .catch(() => {
        alert('이미 존재하는 이메일입니다.');
      });
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
  teams[i].addEventListener('click', selectTeam);
}
