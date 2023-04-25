import { fetchData, postData } from '/js/api/api.js';
import { setDiscount } from '/js/utils.js';

//카테고리 선택 렌더링
const teamSelectBox = document.querySelector('.select.team select');
const updateTeamOptions = async () => {
  const teams = await fetchData('/teams');
  const options = teams
    .map(team => `<option value=${team.teamId}>${team.teamName}</option>`)
    .join('');
  teamSelectBox.innerHTML = `<option selected>팀 전체</option>${options}`;
};
await updateTeamOptions();

const categorySelectBox = document.querySelector('.select.category select');
const updateCategoryOptions = async teamId => {
  const categories = await fetchData(`/teams/${teamId}/categories`);
  const options = categories
    .map(category => `<option>${category.categoryName}</option>`)
    .join('');
  categorySelectBox.innerHTML = `<option selected>카테고리 전체</option>${options}`;
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

priceInput.addEventListener('input', renderDiscountedPrice);
rateInput.addEventListener('input', renderDiscountedPrice);

const postButton = document.querySelector('.post');
postButton.addEventListener('click', async event => {
  event.preventDefault();

  const img1 = document.querySelector('.productThumbnail').files[0];
  const img2 = document.querySelector('.productDetailImages').files[0];
  const detailDescription = document.querySelector('.productDetailImages')
    .files[0];
  const formData = new FormData();
  formData.append('name', 'testName');
  formData.append('inventory', 100);
  formData.append('price', 1000);
  formData.append('rate', 20);
  formData.append('shortDescription', 'testShort');
  formData.append('img1', img1);
  formData.append('img2', img2);
  formData.append('detailDescription', detailDescription);
  try {
    const response = await postData(
      '/categories/ssg-landers-uniform/products/uploads',
      formData
    );

    console.log('Uploaded successfully', response);
  } catch (error) {
    console.error('Upload failed', error);
  }
});
