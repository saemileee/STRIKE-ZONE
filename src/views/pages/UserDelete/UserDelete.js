import { $, $createElement, getCookie, deleteCookie } from '/js/utils.js';
import { isLogin } from '/js/api/authAPI.js';

const render = async () => {
  let loginEmail;
  try {
    loginEmail = await isLogin();
    if (!loginEmail) {
      alert('회원 전용 페이지입니다!');
      location.href = '/login';
    }
  } catch (err) {
    throw new Error({ messge: err });
  }

  const $userData = $('.user-data');
  const deleteConfirm = $createElement('div', 'delete-confirm');
  deleteConfirm.innerHTML = `
<div class="delete-confirm-wrapper">
  <h3 class="title is-3">회원 탈퇴</h3>
  <p>탈퇴를 진행하면 서비스를 이용할 수 없으며 계정과 데이터가 삭제됩니다.</p>
  <button class="button is-danger" id="userDelete">확인</button>
</div>
`;
  $userData.append(deleteConfirm);

  function deleteUser() {
    const { token } = JSON.parse(getCookie('userToken'));

    if (confirm('정말 탈퇴하시겠습니까?')) {
      fetch('/api/v1/users/me', {
        method: 'DELETE',
        headers: {
          token,
        },
      })
        .then((response) => response.json())
        .then(() => {
          deleteCookie('userToken');
          alert('탈퇴가 완료되었습니다.');
          window.location.href = '/';
        })
        .catch(() => {
          const isloginWarning = $('.login-warning');
          if (isloginWarning === null) {
            const loginFormWrapper = $('.login-form-wrapper');
            const loginWarning = $createElement('div', 'login-warning');
            loginWarning.innerText = '탈퇴를 실패하였습니다.';
            loginFormWrapper.appendChild(loginWarning);
          }
        });
    }
  }

  function checkPassword() {
    if (confirm('정말 탈퇴하시겠습니까?')) {
      deleteConfirm.remove();

      const checkPasswordForm = $createElement('form', 'check-login-form');
      checkPasswordForm.innerHTML = `
    <section class="check-login-wrapper">
      <h3 class="title is-3">비밀번호 확인</h3>
      <div class="login-form-wrapper">
        <div class="login-form">
          <div class="login-input">
            <input
              type="password"
              placeholder="비밀번호"
              class="input check-password"
              id="loginPassword"
              required
            />
          </div>
          <button type="submit" class="button is-danger" id="login">확인</button>
        </div>    
      </div>
    </section>
    `;
      $userData.append(checkPasswordForm);
      const checkForm = $('.check-login-form');
      checkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkPassword = $('.check-password').value;
        const { token } = JSON.parse(getCookie('userToken'));

        fetch('/api/v1/auth/password', {
          method: 'POST',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: checkPassword }),
        })
          .then((response) => response.json())
          .then(() => deleteUser())
          .catch(() => {
            const isloginWarning = $('.login-warning');
            if (isloginWarning === null) {
              const loginFormWrapper = $('.login-form-wrapper');
              const loginWarning = $createElement('div', 'login-warning');
              loginWarning.innerText = '비밀번호를 확인해주세요.';
              loginFormWrapper.appendChild(loginWarning);
            }
          });
      });
    }
  }

  const deleteButton = $('#userDelete');
  deleteButton.addEventListener('click', checkPassword);
};

render();
