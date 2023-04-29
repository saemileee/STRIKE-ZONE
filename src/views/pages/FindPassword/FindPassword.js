import { $ } from '/js/utils.js';

const findPasswordForm = $('.find-password-form');
const findEmailInput = $('#findId');
const findNameInput = $('#findName');

const onfindPasswordSubmit = (e) => {
  e.preventDefault();
  const findEmail = findEmailInput.value;
  const findName = findNameInput.value;
  const findUser = { email: findEmail, koreanName: findName };

  if (confirm('비밀번호를 초기화하시겠습니까?')) {
    fetch('/api/v1/auth/password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(findUser),
    })
      .then((response) => response.json())
      .then(() => {
        alert('초기화된 비밀번호가 이메일로 전송되었습니다.');
      })
      .catch(() => {
        alert('이메일과 이름을 다시 확인해주세요.');
      });
  }
};

findPasswordForm.addEventListener('submit', onfindPasswordSubmit);
