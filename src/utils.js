// yyyy-MM-dd HH:mm:ss 형식으로 날짜를 얻는 함수
function getCurrentDateString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = (`0${today.getMonth() + 1}`).slice(-2);
  const day = (`0${today.getDate()}`).slice(-2);

  const hours = (`0${today.getHours()}`).slice(-2);
  const minutes = (`0${today.getMinutes()}`).slice(-2);
  const seconds = (`0${today.getSeconds()}`).slice(-2);

  const currentDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return currentDateString;
}

// 신상품 기준이 될 밀리세컨즈 구하기
function getMsToCheckNewProduct(day) {
  // 하루는 총 86400초이다.
  const secondsPerDay = 24 * 60 * 60;

  const standardMsOfNewProduct = day * secondsPerDay * 1000;

  return standardMsOfNewProduct;
}

export {
  getCurrentDateString,
  getMsToCheckNewProduct,
};
