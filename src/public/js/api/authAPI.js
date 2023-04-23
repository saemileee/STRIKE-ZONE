// fetch의 토큰 옵션을 반환하는 함수, method 파라미터 미입력시 기본 값으로 "GET" 설정
export function getAuthOption(method = 'GET') {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const authOption = {
    method,
    headers: {
      token,
    },
  };
  return authOption;
}

// Login 확인 API, 현재 토큰을 가진 유저의 email을 반환. 로그인 상태가 아니거나 유효하지 않은 토큰일시 false 반환
export async function isLogin() {
  try {
    const result = await fetch('/api/v1/auth', getAuthOption());
    const { email } = await result.json();
    return email;
  } catch (err) {
    return false;
  }
}
