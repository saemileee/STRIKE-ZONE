import { $, $createElement, deleteCookie } from '/js/utils.js';
import { isAdmin } from '/js/api/authAPI.js';

const loginForm = $('.login-form');
const loginId = $('#loginId');
const loginPassword = $('#loginPassword');
const homeButton = $('#home');

const onLoginSubmit = (e) => {
  e.preventDefault();
  const adminId = loginId.value;
  const adminPassword = loginPassword.value;
  const adminInfo = { email: adminId, password: adminPassword };

  fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminInfo),
  })
    .then((response) => response.json())
    .then(async (token) => {
      const adminToken = JSON.stringify(token);
      document.cookie = `userToken=${adminToken}; path=/`;

      let tokenIsAdmin;
      try {
        tokenIsAdmin = await isAdmin();
        if (!tokenIsAdmin) {
          deleteCookie('userToken');
          alert('관리자 전용 페이지입니다!');
          location.href = '/login';
        } else {
          alert('관리자 로그인 성공');
          window.location.href = '/admin/user-management';
        }
      } catch (err) {
        throw new Error({ messge: err });
      }
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

function goToHome(e) {
  e.preventDefault();
  window.location.href = '/';
}

loginForm.addEventListener('submit', onLoginSubmit);
homeButton.addEventListener('click', goToHome);
