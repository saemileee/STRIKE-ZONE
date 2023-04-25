import { fetchData, postData } from '/js/api/api.js';
import { setDiscount } from '/js/utils.js';

//카테고리 선택 렌더링
const teamSelectBox = document.querySelector('.select.team select');
const updateTeamOptions = async () => {
  const teams = await fetchData('/teams');
  const options = teams
    .map(team => `<option value=${team.teamId}>${team.teamName}</option>`)
    .join('');
  teamSelectBox.innerHTML = `<option selected>팀을 선택해 주세요.</option>${options}`;
};
await updateTeamOptions();

const categorySelectBox = document.querySelector('.select.category select');
const updateCategoryOptions = async teamId => {
  const categories = await fetchData(`/teams/${teamId}/categories`);
  const options = categories
    .map(category => `<option>${category.categoryName}</option>`)
    .join('');
  categorySelectBox.innerHTML = `<option selected>카테고리를 선택해 주세요.</option>${options}`;
};

teamSelectBox.addEventListener('input', async () => {
  const teamId = teamSelectBox.value;
  await updateCategoryOptions(teamId);
});

const priceInput = document.querySelector('.price');
const rateInput = document.querySelector('.rate');
const discountedPriceInput = document.querySelector('.discounted-price');

function renderDiscountedPrice() {
  const discountedPrice = setDiscount(priceInput.value, rateInput.value);
  discountedPriceInput.value = discountedPrice;
}

// const fileInputs = document.querySelectorAll('.file-input');
// for (const input of fileInputs) {
//   input.addEventListener('input', event => {
//     event.preventDefault();
//     const fileName = document.querySelector(`.file-name .${input.dataset.for}`);
//     fileName.innerHTML = input.files[0].name;
//   });
// }

// const fileDeleteButtons = document.querySelectorAll('.file-delete-button');
// for (const button of fileDeleteButtons) {
//   button.addEventListener('click', event => {
//     event.preventDefault();
//     const linkFor = button.dataset.for;
//     const fileInput = document.querySelector(`.file-input.${linkFor}`);
//     fileInput.value = '';
//   });
// }

priceInput.addEventListener('input', renderDiscountedPrice);
rateInput.addEventListener('input', renderDiscountedPrice);

const postButton = document.querySelector('.post');
postButton.addEventListener('click', async event => {
  event.preventDefault();
  const team = document.querySelector('.team select').value;
  const category = document.querySelector('.category select').value;
  const name = document.querySelector('.name').value;
  const inventory = document.querySelector('.inventory').value;
  const price = document.querySelector('.price').value;
  const rate = document.querySelector('.rate').value;
  const shortDescription = document.querySelector('.shortDescription').value;

  const detailDescription =
    document.querySelector('.detailDescription').files[0];
  const thumbnail = document.querySelector('.thumbnail').files[0];
  const subThumbnailsInputs = document.querySelector('.subThumbnails');

  const form = {
    team,
    category,
    name,
    inventory,
    price,
    rate,
    shortDescription,
  };

  console.log(form);

  //이미지 업로드
  const formData = new FormData();
  formData.append('name', name);
  formData.append('inventory', inventory);
  formData.append('price', price);
  formData.append('rate', rate);
  formData.append('shortDescription', shortDescription);
  formData.append('thumbnail', thumbnail);
  // formData.append('subThumbnails', img2);
  formData.append('detailDescription', detailDescription);
  for (const subThumbnail of subThumbnailsInputs.files) {
    formData.append('subThumbnails', subThumbnail);
  }

  try {
    const response = await fetch(
      '//34.64.244.53/api/v1/categories/ssg-landers-uniform/products/uploads',
      { method: 'POST', body: formData }
    );

    console.log('Uploaded successfully', response);
  } catch (error) {
    console.error('Upload failed', error);
  }
});
