import { setDiscount } from '/js/utils.js';
import { updateTeamOptions, updateCategoryOptions } from '/components/Product/CategorySelectbox.js';

//카테고리 선택 렌더링
const teamSelectBox = document.querySelector('.select.team select');
await updateTeamOptions(teamSelectBox);

const categorySelectBox = document.querySelector('.select.category select');
teamSelectBox.addEventListener('input', async () => {
  const teamId = teamSelectBox.value;
  await updateCategoryOptions(teamId, categorySelectBox);
});

const priceInput = document.querySelector('.price');
const rateInput = document.querySelector('.rate');
const discountedPriceInput = document.querySelector('.discounted-price');

rateInput.addEventListener('input', function () {
  if (this.value.length > 2) {
    this.value = this.value.slice(0, 2);
  }
});

function renderDiscountedPrice() {
  const discountedPrice = Math.ceil(setDiscount(priceInput.value, rateInput.value));
  discountedPriceInput.value = discountedPrice;
}

priceInput.addEventListener('input', renderDiscountedPrice);
rateInput.addEventListener('input', renderDiscountedPrice);

const postButton = document.querySelector('.post');
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const team = document.querySelector('.team select').value;
  const category = document.querySelector('.category select').value;
  const name = document.querySelector('.name').value;
  const inventory = document.querySelector('.inventory').value;
  const price = document.querySelector('.price').value;
  const rate = document.querySelector('.rate').value;
  const shortDescription = document.querySelector('.shortDescription').value;

  const detailDescription = document.querySelector('.detailDescription').files[0];
  const thumbnail = document.querySelector('.thumbnail').files[0];
  const subThumbnailsInputs = document.querySelector('.subThumbnails');

  const formData = new FormData();
  formData.append('name', name);
  formData.append('inventory', inventory);
  formData.append('price', price);
  formData.append('rate', rate);
  formData.append('shortDescription', shortDescription);
  formData.append('thumbnail', thumbnail);
  formData.append('detailDescription', detailDescription);
  for (const subThumbnail of subThumbnailsInputs.files) {
    formData.append('subThumbnails', subThumbnail);
  }

  try {
    const response = await fetch(
      `//34.64.244.53/api/v1/categories/${team}-${category}/products/uploads`,
      { method: 'POST', body: formData }
    );
    alert('상품이 성공적으로 추가되었습니다.');
    window.location.href = '/admin/product-management';
  } catch (error) {
    console.error('Upload failed', error);
  }
});

document.querySelectorAll('.admin-data')[1].remove();
