// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

const loginFormWrapper = $('.login-form-wrapper');
const loginForm = $('.login-form');
const loginId = $('#loginId');
const loginPassword = $('#loginPassword');

function emailAuthPopUp() {
  // const emailAuthForm = $createElement('form', 'email-auth-form');
  // emailAuthForm.innerHTML = `
  // <div class="field is-horizontal email-auth-form-wrapper">
  //   <div class="field-body email-auth-form">
  //     <div class="field email-auth-input">
  //       <input
  //         type="text"
  //         placeholder="인증번호"
  //         class="input email-auth"
  //         id="emailAuth"
  //         required
  //       />
  //     </div>
  //     <button type="submit" class="button is-info" id="auth">확인</button>
  //   </div>
  // </div>
  // `;
  // loginFormWrapper.append(emailAuthForm);
  const url = '/login/auth';
  const name = 'Email Authentication';
  const option =
    'width = 600, height = 300, top = 100, left = 200, location = no';
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
      const { isEmailValid, token } = data;
      const userToken = JSON.stringify({ token: token });
      if (!isEmailValid) {
        emailAuthPopUp();
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
