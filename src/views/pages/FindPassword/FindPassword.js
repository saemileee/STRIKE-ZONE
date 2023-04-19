import * as utils from '../../utils.js';

const findPasswordForm = utils.$('.find-password-form');

const onfindPasswordSubmit = (e) => {
  e.preventDefault();
  const findId = utils.$('#findId').value;
  const findName = utils.$('#findName').value;
  console.log(findId, findName);
};

findPasswordForm.addEventListener('submit', onfindPasswordSubmit);
