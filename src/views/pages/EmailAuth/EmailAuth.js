import { $ } from '/js/utils.js';

const userEmail = opener.document.querySelector('#loginId').value;
const authForm = $('.auth-form');
const authInput = $('#emailAuth');

function emailAuthentication(e) {
  e.preventDefault();
  fetch('/api/v1/auth/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userEmail, inputCode: authInput.value }),
  })
    .then((response) => response.json())
    .then(() => {
      alert('인증에 성공했습니다.');
      window.close();
    })
    .catch(() => {
      alert('인증번호가 일치하지 않습니다.\n인증번호를 확인해 주세요.');
    });
}

authForm.addEventListener('submit', emailAuthentication);
