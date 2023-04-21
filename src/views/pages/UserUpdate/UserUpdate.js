// eslint-disable-next-line
import { $, $createElement } from '/js/utils.js';

function getUser() {
  const { token } = JSON.parse(localStorage.getItem('user'));

  fetch('/api/v1/users', {
    method: 'GET',
    headers: {
      token,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
getUser();

const $userData = $('.user-data');

const $form = $createElement('form', 'update-form');
$form.innerHTML = `
  <form class="update-form">
  <h4 class="title is-4">회원 정보 수정</h4>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">이메일</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="email"
            class="input user-email"
            type="text"
            placeholder="이메일을 입력해 주세요."
            required
            autocomplete="off"
          />
          <p class="email-warning" style="display: none;">이메일 형식이 올바르지 않습니다.</p>
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">비밀번호</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="password"
            class="input user-password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            required
            autocomplete="off"
          />
          <p class="password-warning" style="display: none;">영문, 숫자, 특수문자를 포함한 8 ~ 16자의 비밀번호를 입력하세요</p>
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">비밀번호 확인</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="passwordVerify"
            class="input user-password"
            type="password"
            placeholder="비밀번호를 확인해 주세요."
            required
            autocomplete="off"
          />
          <p class="password-verify-warning" style="display: none;">비밀번호가 일치하지 않습니다.</p>
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">이름</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="koreanName"
            class="input user-name"
            type="text"
            placeholder="이름을 입력해 주세요."
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">휴대전화</label>
    </div>
    <div class="field-body">
      <p class="control">
        <span class="select">
          <select class="user-phone-number-pro" id="firstPhoneNumber">
            <option>010</option>
            <option>011</option>
            <option>016</option>
            <option>017</option>
            <option>018</option>
            <option>019</option>
          </select>
        </span>
      </p>
      <p class="control is-expanded">
        <input
          id="phoneNumber"
          class="input user-phone-number-back"
          type="tel"
          placeholder="나머지 번호를 입력해주세요."
          maxlength="9"
          required
          autocomplete="off"
        />
      </p>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">주소</label>
    </div>
    <div class="field-body">
      <p class="control">
        <span id="findZipcode" class="button address">우편번호 찾기</span>
      </p>
      <div class="field">
        <p class="control is-expanded">
          <input
            id="postCode"
            class="input address address-zonecode"
            type="text"
            placeholder="우편번호"
            readonly
            onfocus="this.blur()"
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="roughAddress"
            class="input address address-base"
            type="text"
            placeholder="주소"
            readonly
            onfocus="this.blur()"
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="detailAddress"
            class="input address address-detail"
            type="text"
            placeholder="상세주소를 입력해 주세요."
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">응원하는 팀</label>
    </div>
    <div class="field-body">
      <div class="field" id="cheerTeam">
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="SSG랜더스" />
          SSG 랜더스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="키움히어로즈" />
          키움 히어로즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="LG트윈스" />
          LG 트윈스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="KT위즈" />
          KT 위즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="KIA타이거즈" />
          KIA 타이거즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="NC다이노스" />
          NC 다이노스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="삼성라이온즈" />
          삼성 라이온즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="롯데자이언츠" />
          롯데 자이언츠
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="두산베어스" />
          두산 베어스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="한화이글스" />
          한화 이글스
        </label>
      </div>
    </div>
  </div>
  <div class="buttons">
    <button type="submit" class="button is-info" id="update">
      수정하기
    </button>
  </div>
  </form>
`;

$userData.append($form);

const updateForm = $('.update-form');
const newUserEmail = $('#email');
const newUserPassword = $('#password');
const newUserPasswordVerify = $('#passwordVerify');
const newUserPhoneNumber = $('#phoneNumber');
const findAddress = document.querySelectorAll('.address');
const teams = document.getElementsByName('team');

function checkValidation(target) {
  const regex = {
    email:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
  };
  if (!target.value.match(regex[target.id])) return false;
  return true;
}

function isValid(event) {
  if (!checkValidation(event.target)) {
    event.target.classList.add('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.style.display = '';
  } else {
    event.target.classList.remove('is-danger');
    const warning = $(`.${event.target.id}-warning`);
    warning.style.display = 'none';
  }
}

function passwordVerify() {
  const warning = $('.password-verify-warning');
  if (
    newUserPassword.value !== newUserPasswordVerify.value ||
    newUserPasswordVerify.value === ''
  ) {
    newUserPasswordVerify.classList.add('is-danger');
    warning.style.display = '';
    return false;
  }
  newUserPasswordVerify.classList.remove('is-danger');
  warning.style.display = 'none';
  return true;
}

function userInfoComplete() {
  if (!checkValidation(newUserEmail)) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (!checkValidation(newUserPassword)) {
    alert('비밀번호 형식이 올바르지 않습니다.');
    return false;
  }
  if (!passwordVerify()) {
    alert('비밀번호가 일치하지 않습니다.');
    return false;
  }
  return true;
}

function autoHyphen() {
  newUserPhoneNumber.value = newUserPhoneNumber.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{3,4})(\d{4})$/, '$1-$2');
}

function getPhoneNumber() {
  const firstNumber = $('#firstPhoneNumber');
  return `${firstNumber.options[firstNumber.selectedIndex].text}-${
    newUserPhoneNumber.value
  }`;
}

function searchZipcode() {
  new daum.Postcode({
    oncomplete(data) {
      const roadAddr = data.roadAddress;
      document.getElementById('postCode').value = data.zonecode;
      document.getElementById('roughAddress').value = roadAddr;
    },
  }).open();
}

function selectTeam() {
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].checked) {
      teams[i].parentNode.classList.add('is-info');
    } else {
      teams[i].parentNode.classList.remove('is-info');
    }
  }
}

function getCheerTeam() {
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].checked) return teams[i].value;
  }
}

function onUpdateSubmit(e) {
  e.preventDefault();
  if (userInfoComplete()) {
    const newUser = {};
    const userInfoKey = [
      'email',
      'password',
      'koreanName',
      'phoneNumber',
      'postCode',
      'roughAddress',
      'detailAddress',
      'cheerTeam',
    ];
    for (let i = 0; i < userInfoKey.length; i++) {
      const userInfo = $(`#${userInfoKey[i]}`);
      if (userInfoKey[i] === 'phoneNumber') {
        newUser[userInfoKey[i]] = getPhoneNumber();
      } else if (userInfoKey[i] === 'cheerTeam') {
        newUser[userInfoKey[i]] = getCheerTeam();
      } else {
        newUser[userInfoKey[i]] = userInfo.value;
      }
    }

    fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((user) => console.log(user));
  }
}

updateForm.addEventListener('submit', onUpdateSubmit);
newUserEmail.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', isValid);
newUserPassword.addEventListener('blur', passwordVerify);
newUserPasswordVerify.addEventListener('blur', passwordVerify);
newUserPhoneNumber.addEventListener('input', autoHyphen);
for (let i = 0; i < 3; i++) {
  findAddress[i].addEventListener('click', searchZipcode);
}
for (let i = 0; i < teams.length; i++) {
  teams[i].addEventListener('click', selectTeam);
}
