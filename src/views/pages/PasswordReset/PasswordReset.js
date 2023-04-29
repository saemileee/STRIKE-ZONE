import { $ } from '/js/utils.js';
import { regex } from '/js/constants.js';

const userEmail = opener.document.querySelector('#loginId').value;
const resetForm = $('.password-reset-form');
const newPasswordInput = $('#newPassword');
const newPasswordVerifyInput = $('#newPasswordVerify');

function checkValidation() {
  const { password: passwordRegex } = regex;

  if (!newPasswordInput.value.match(passwordRegex)) return false;
  return true;
}

function isValid() {
  const warning = $('.password-warning');
  if (!checkValidation()) {
    newPasswordInput.classList.add('is-danger');
    warning.classList.remove('hidden');
  } else {
    newPasswordInput.classList.remove('is-danger');
    warning.classList.add('hidden');
  }
}

function verifyPassword() {
  const warning = $('.password-verify-warning');
  if (
    newPasswordInput.value !== newPasswordVerifyInput.value ||
    newPasswordVerifyInput.value === ''
  ) {
    newPasswordVerifyInput.classList.add('is-danger');
    warning.classList.remove('hidden');
    return false;
  }
  newPasswordVerifyInput.classList.remove('is-danger');
  warning.classList.add('hidden');
  return true;
}

function resetPassword(e) {
  e.preventDefault();
  if (verifyPassword()) {
    const newPassword = newPasswordInput.value;
    fetch('/api/v1/users/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: newPassword }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('비밀번호가 변경되었습니다.');
        window.close();
      })
      .catch(() => {
        alert('문제가 발생하였습니다.\n로그인을 다시 시도해 주세요.');
      });
  } else {
    alert('비밀번호를 확인해주세요.');
  }
}

resetForm.addEventListener('submit', resetPassword);
newPasswordInput.addEventListener('blur', isValid);
newPasswordInput.addEventListener('blur', verifyPassword);
newPasswordVerifyInput.addEventListener('blur', verifyPassword);
