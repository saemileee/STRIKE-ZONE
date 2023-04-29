import { $, autoHyphen } from '/js/utils.js';
import { regex, teamID } from '/js/constants.js';

const signUpForm = $('.sign-up-form');
const newUserEmail = $('#email');
const newUserPassword = $('#password');
const newUserPasswordVerify = $('#passwordVerify');
const newUserPhoneNumber = $('#phoneNumber');
const findAddress = document.querySelectorAll('.address');
const teams = document.getElementsByName('team');

function checkValidation(target) {
  if (!target.value.match(regex[target.id])) return false;
  return true;
}

function isValid(event) {
  if (!checkValidation(event.target)) {
    event.target.classList.add('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.classList.remove('hidden');
  } else {
    event.target.classList.remove('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.classList.add('hidden');
  }
}

function passwordVerify() {
  const warning = $('.password-verify-warning');
  if (
    newUserPassword.value !== newUserPasswordVerify.value ||
    newUserPasswordVerify.value === ''
  ) {
    newUserPasswordVerify.classList.add('is-danger');
    warning.classList.remove('hidden');
    return false;
  }
  newUserPasswordVerify.classList.remove('is-danger');
  warning.classList.add('hidden');
  return true;
}

function checkAddress() {
  if (findAddress[0].value && findAddress[2].value && findAddress[3].value) {
    return true;
  }
  return false;
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
  if (!checkAddress()) {
    alert('주소를 입력해 주세요.');
    return false;
  }
  if (!getCheerTeam()) {
    alert('응원하는 팀을 선택해 주세요.');
    return false;
  }
  return true;
}

function getPhoneNumber() {
  const firstNumber = $('#firstPhoneNumber');
  return `${firstNumber.options[firstNumber.selectedIndex].text}-${
    newUserPhoneNumber.value
  }`;
}

function searchZipcode() {
  new daum.Postcode({
    oncomplete(data) {
      const roadAddr = data.roadAddress;
      document.getElementById('postCode').value = data.zonecode;
      document.getElementById('roughAddress').value = roadAddr;
    },
  }).open();
}

function selectTeam() {
  teams.forEach((team) =>
    team.checked
      ? team.parentNode.classList.add('is-dark')
      : team.parentNode.classList.remove('is-dark')
  );
}

function getCheerTeam() {
  const checkedTeam = Array.from(teams).find((team) => team.checked);
  let selectedTeam;
  checkedTeam === undefined
    ? (selectedTeam = false)
    : (selectedTeam = teamID[checkedTeam.value]);
  return selectedTeam;
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
    userInfoKey.forEach((key) => {
      const userInfo = $(`#${key}`);
      if (key === 'phoneNumber') {
        newUser[key] = getPhoneNumber();
      } else if (key === 'cheerTeam') {
        newUser[key] = getCheerTeam();
      } else newUser[key] = userInfo.value;
    });

    fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then(() => {
        confirm('회원가입에 성공하였습니다.\n로그인 하시겠습니까?')
          ? (window.location.href = '/login')
          : (window.location.href = '/');
      })
      .catch(() => {
        alert('이미 존재하는 이메일입니다.');
      });
  }
}
autoHyphen('#phoneNumber');
signUpForm.addEventListener('submit', onSignUpSubmit);
newUserEmail.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', passwordVerify);
newUserPasswordVerify.addEventListener('blur', passwordVerify);
for (let i = 0; i < 3; i++) {
  findAddress[i].addEventListener('click', searchZipcode);
}
teams.forEach((node) => {
  node.addEventListener('click', selectTeam);
});
