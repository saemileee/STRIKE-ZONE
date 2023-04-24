import { $ } from '/js/utils.js';

const userEmail = opener.document.querySelector('#loginId').value;
const authForm = $('.auth-form');
const authInput = $('#emailAuth');

function emailAuthentication(e) {
  e.preventDefault();
  console.log(userEmail, authInput.value);
}

authForm.addEventListener('submit', emailAuthentication);
