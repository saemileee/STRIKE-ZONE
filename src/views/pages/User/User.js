import { $ } from '/js/utils.js';
import { isLogin, getAuthOption } from '/js/api/authAPI.js';

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

  let userInfo;
  try {
    const userData = await fetch('/api/v1/users/me', getAuthOption());
    userInfo = await userData.json();
  } catch (err) {
    throw new Error({ messge: err });
  }

  const {
    koreanName,
    cheerTeam: { teamName, teamId },
    email,
    address: { postCode, roughAddress, detailAddress },
    phoneNumber,
    createdAt,
  } = userInfo;

  const currentDate = new Date();
  const convertedDate = new Date(createdAt);

  const diffMSec = currentDate.getTime() - convertedDate.getTime();
  const diffDate = Math.floor(diffMSec / (24 * 60 * 60 * 1000));

  const signUpDatte = {
    year: convertedDate.getFullYear(),
    month: convertedDate.getMonth() + 1,
    day: convertedDate.getDate(),
  };

  const { emblemPath } = await fetch(`/api/v1/teams/${teamId}`).then((res) =>
    res.json()
  );

  const $userData = $('.user-data');
  $userData.innerHTML = `
    <img class="cheer-team" src=${emblemPath}>
    <h3 class="title is-3">마이 페이지</h3>
    <hr>
    <h3 class="title is-3">안녕하세요! ${koreanName}님!</h3>
    <div class="user-data-desc">
      <div class="info">
        <p>나의 응원팀</p>
        <em>${teamName}</em>
      </div>
      <div class="info">
        <p>나의 주소지</p>
        <em>${roughAddress} ${detailAddress} [${postCode}]</em>
      </div>
      <div class="info">
        <p>나의 Email</p>
        <em>${email}</em>
      </div>
      <div class="info">
        <p>나의 전화번호</p>
        <em>${phoneNumber}</em>
      </div>
      <div class="info">
        <p>나의 가입일</p>
        <em>${signUpDatte.month}/${signUpDatte.day}/${signUpDatte.year}</em>
      </div>
      <h4 class="diff-date title is-3">저희가 만난지 <strong>${diffDate}</strong>일이나 지났어요!</h4>
    </div>
  `;
};

render();
