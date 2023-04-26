// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const loginFormWrapper = $('.login-form-wrapper');
const loginForm = $('.login-form');
const loginId = $('#loginId');
const loginPassword = $('#loginPassword');

function authEmailPopUp() {
  const userEmail = document.querySelector('#loginId').value;
  fetch('/api/v1/auth/email', {
    method: 'GET',
    headers: { email: userEmail },
  })
    .then((response) => response.json())
    .then(() => {
      const url = '/login/auth';
      const name = 'Email Authentication';
      const option =
        'width = 600, height = 300, top = 100, left = 200, location = no';
      window.open(url, name, option);
    })
    .catch(() => {
      alert('문제가 발생하였습니다.\n다시 시도해 주세요.');
    });
}

function resetPasswordPopUp() {
  const url = '/find-password/reset';
  const name = 'Password Reset';
  const option =
    'width = 600, height = 500, top = 100, left = 200, location = no';
  window.open(url, name, option);
}

const onLoginSubmit = (e) => {
  e.preventDefault();
  const userId = loginId.value;
  const userPassword = loginPassword.value;
  const userInfo = { email: userId, password: userPassword };

  fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      const { token, isEmailValid, isPasswordReset } = data;
      const userToken = JSON.stringify({ token: token });
      if (!isEmailValid) {
        authEmailPopUp();
      } else if (isPasswordReset) {
        resetPasswordPopUp();
      } else {
        document.cookie = `userToken=${userToken}; path=/`;
        window.location.href = '/';
      }
    })
    .catch(() => {
      const isloginWarning = $('.login-warning');
      if (isloginWarning === null) {
        const loginWarning = $createElement('div', 'login-warning');
        loginWarning.innerText = '아이디 또는 비밀번호가 올바르지 않습니다.';
        loginFormWrapper.appendChild(loginWarning);
      }
    });
};

loginForm.addEventListener('submit', onLoginSubmit);
