import { $ } from '/js/utils.js';

const findPasswordForm = $('.find-password-form');

const onfindPasswordSubmit = (e) => {
  e.preventDefault();
  const findId = $('#findId').value;
  const findName = $('#findName').value;
  console.log(findId, findName);
};

findPasswordForm.addEventListener('submit', onfindPasswordSubmit);
