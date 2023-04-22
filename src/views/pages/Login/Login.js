// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const loginForm = $('.login-form');

const loginId = $('#loginId');
const loginPassword = $('#loginPassword');

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
    .then((token) => {
      localStorage.setItem('user', JSON.stringify(token));
      window.location.href = '/';
    })
    .catch(() => {
      const isloginWarning = $('.login-warning');
      if (isloginWarning === null) {
        const loginFormWrapper = $('.login-form-wrapper');
        const loginWarning = $createElement('div', 'login-warning');
        loginWarning.innerText = '아이디 또는 비밀번호가 올바르지 않습니다.';
        loginFormWrapper.appendChild(loginWarning);
      }
    });
};

loginForm.addEventListener('submit', onLoginSubmit);
