import * as utils from '../../utils.js';

const loginForm = utils.$('.login-form');

const loginId = utils.$('#loginId');
const loginPassword = utils.$('#loginPassword');

const onLoginSubmit = (e) => {
  e.preventDefault();
  const userId = loginId.value;
  const userPassword = loginPassword.value;
  console.log(userId, userPassword);
};

loginForm.addEventListener('submit', onLoginSubmit);
