// 신상품 기준이 될 밀리세컨즈 구하기
function getMsToCheckNewProduct(day) {
  // 하루는 총 86400초이다.
  const secondsPerDay = 24 * 60 * 60;

  const standardMsOfNewProduct = day * secondsPerDay * 1000;

  return standardMsOfNewProduct;
}

export {
  getMsToCheckNewProduct,
};
