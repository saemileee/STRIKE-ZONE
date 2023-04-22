export function $(selector) {
  return document.querySelector(selector);
}

export function $createElement(elementType, className) {
  const $element = document.createElement(elementType);
  $element.className = className;
  return $element;
}

export function setDiscount(price, rate) {
  return price * ((100 - rate) * 0.01);
}
