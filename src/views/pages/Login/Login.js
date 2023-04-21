import { $ } from '/js/utils.js';

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
      console.log(token);
      localStorage.setItem('user', token);
    });
};

loginForm.addEventListener('submit', onLoginSubmit);
