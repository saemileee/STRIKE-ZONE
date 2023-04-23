export function $(selector) {
  return document.querySelector(selector);
}

export function $createElement(elementType, className) {
  const $element = document.createElement(elementType);
  $element.className = className;
  return $element;
}

//체크박스 전체선택 기능
export function selectAllCheckbox(checkboxesClassName, selectAllClassName) {
  const termCheckboxElements = document.querySelectorAll(`.${checkboxesClassName}`);
  let selectAllCheckboxElement = document.querySelector(`.${selectAllClassName}`);
  selectAllCheckboxElement.addEventListener('change', () => {
    if (selectAllCheckboxElement.checked) {
      for (let checkbox of termCheckboxElements) {
        checkbox.checked = true;
      }
    } else {
      for (let checkbox of termCheckboxElements) {
        checkbox.checked = false;
      }
    }
  });

  for (let checkbox of termCheckboxElements) {
    checkbox.addEventListener('change', () => {
      let checkedCount = 0;
      for (let _checkbox of termCheckboxElements) {
        _checkbox.checked === true ? checkedCount++ : null;
      }
      checkedCount === termCheckboxElements.length
        ? (selectAllCheckboxElement.checked = true)
        : (selectAllCheckboxElement.checked = false);
    });
  }
}

//전화번호 하이픈 추가
export function autoHyphen(target) {
  const targetElement = document.querySelector(target);
  targetElement.addEventListener('input', () => {
    targetElement.value = targetElement.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{3,4})(\d{4})$/, '$1-$2');
  });
}

export function setDiscount(price, rate) {
  return price * ((100 - rate) * 0.01);
}

export function getCookie(name) {
  let matches = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return matches ? decodeURIComponent(matches[2]) : undefined;
}
