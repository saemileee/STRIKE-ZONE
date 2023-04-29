export function $(selector) {
  return document.querySelector(selector);
}

export function $createElement(elementType, className) {
  const $element = document.createElement(elementType);
  $element.className = className;
  return $element;
}

// 체크박스 전체선택 기능
export function selectAllCheckbox(checkboxesClassName, selectAllClassName) {
  const termCheckboxElements = document.querySelectorAll(`.${checkboxesClassName}`);
  const selectAllCheckboxElement = document.querySelector(`.${selectAllClassName}`);
  selectAllCheckboxElement.addEventListener('change', () => {
    if (selectAllCheckboxElement.checked) {
      for (const checkbox of termCheckboxElements) {
        checkbox.checked = true;
      }
    } else {
      for (const checkbox of termCheckboxElements) {
        checkbox.checked = false;
      }
    }
  });

  for (const checkbox of termCheckboxElements) {
    checkbox.addEventListener('change', () => {
      let checkedCount = 0;
      for (const _checkbox of termCheckboxElements) {
        _checkbox.checked === true ? checkedCount++ : null;
      }
      checkedCount === termCheckboxElements.length
        ? (selectAllCheckboxElement.checked = true)
        : (selectAllCheckboxElement.checked = false);
    });
  }
}

// 전화번호 하이픈 추가
export function autoHyphen(target) {
  const targetElement = document.querySelector(target);
  targetElement.addEventListener('input', () => {
    targetElement.value = targetElement.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{3,4})(\d{4})$/, '$1-$2');
  });
}

export function setDiscount(price, rate) {
  return parseInt(Math.ceil(price * ((100 - rate) * 0.01)) / 10) * 10;
}

export function getCookie(name) {
  const matches = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return matches ? decodeURIComponent(matches[2]) : undefined;
}

export function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 JAN 1999 00:00:10 GMT; path=/`;
}
