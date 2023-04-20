import * as utils from '/js/utils.js';

const loginForm = utils.$('.login-form');

const loginId = utils.$('#loginId');
const loginPassword = utils.$('#loginPassword');

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
  }).then((response) => console.log(response.json()));
};

loginForm.addEventListener('submit', onLoginSubmit);
