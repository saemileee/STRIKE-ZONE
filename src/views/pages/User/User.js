import { $ } from '/js/utils.js';

const render = async () => {
  const DUMMY = {
    address: {
      postCode: 6035,
      roughAddress: '서울 강남구 가로수길 5',
      detailAddress: '상세주소',
    },
    _id: '6442144a861b6e5cd305fa89',
    email: 'jjj@asd.com',
    password: '$2b$10$ZwiViDoD20Nc5qb9hXfGDOXVN7YLYfwsfzHqGwea/q5KCAMaH2x7O',
    koreanName: '봉길동',
    phoneNumber: '010-0000-0000',
    cheerTeam: {
      _id: '6440ee4dbe78f271d6821823',
      title: '한화 이글스',
      description: '한화 이글스입니다.',
      teamId: 'hanhwa-eagles',
      createdAt: '2023-04-20T07:48:29.878Z',
      updatedAt: '2023-04-20T07:48:29.878Z',
      __v: 0,
    },
    createdAt: '2023-04-01T04:42:50.038Z',
    updatedAt: '2023-04-21T04:42:50.038Z',
    __v: 0,
  };

  const {
    koreanName,
    cheerTeam: { title, teamId },
    email,
    address: { postCode, roughAddress, detailAddress },
    phoneNumber,
    createdAt,
  } = DUMMY;

  const currentDate = new Date();
  const convertedDate = new Date(createdAt);

  const diffMSec = currentDate.getTime() - convertedDate.getTime();
  const diffDate = Math.floor(diffMSec / (24 * 60 * 60 * 1000));

  const signUpDatte = {
    year: convertedDate.getFullYear(),
    month: convertedDate.getMonth() + 1,
    day: convertedDate.getDate(),
  };

  const { emblemPath } = await fetch(`/api/v1/teams/${teamId}`).then((res) => res.json());

  const $userData = $('.user-data');
  $userData.innerHTML = `
    <img class="cheer-team" src=${emblemPath}>
    <h3 class="title is-3">마이 페이지</h3>
    <hr>
    <h3 class="title is-3">안녕하세요! ${koreanName}님!</h3>
    <div class="user-data-desc">
      <div class="info">
        <p>나의 응원팀</p>
        <em>${title}</em>
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
