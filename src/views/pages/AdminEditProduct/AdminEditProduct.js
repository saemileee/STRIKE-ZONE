import { fetchData } from '/js/api/api.js';
import { setDiscount } from '/js/utils.js';

const productId = Number(window.location.pathname.split('/')[3]);
const product = await fetchData(`/products/${productId}`);
const {
  teamId,
  categoryId,
  name,
  inventory,
  price,
  rate,
  discountedPrice,
  shortDescription,
  img,
  detailDescription,
} = product;

const category = categoryId.split('-').pop();

console.log(product);

//카테고리 선택 렌더링
const teamSelectBox = document.querySelector('.select.team select');
const updateTeamOptions = async () => {
  const teams = await fetchData('/teams');
  const options = teams
    .map(team => `<option value=${team.teamId}>${team.teamName}</option>`)
    .join('');
  teamSelectBox.innerHTML = `<option selected>팀 전체</option>${options}`;
  teamSelectBox.value = teamId;
};
await updateTeamOptions();

const categorySelectBox = document.querySelector('.select.category select');
const updateCategoryOptions = async teamId => {
  const categories = await fetchData(`/teams/${teamId}/categories`);
  const options = categories
    .map(
      category =>
        `<option value=${category.categoryName}>${category.categoryName}</option>`
    )
    .join('');
  categorySelectBox.innerHTML = `<option selected>카테고리 전체</option>${options}`;
};
async function renderCategoryOptions() {
  const teamId = teamSelectBox.value;
  await updateCategoryOptions(teamId);
  categorySelectBox.value = category;
}

teamSelectBox.addEventListener('input', renderCategoryOptions);
renderCategoryOptions();

//상품명
const nameInput = document.querySelector('input.name');
nameInput.value = name;

//재고
const inventoryInput = document.querySelector('input.inventory');
inventoryInput.value = inventory;

//상품원가
const priceInput = document.querySelector('.price');
priceInput.value = price;

//상품 할인률
const rateInput = document.querySelector('.rate');
rateInput.value = rate;

//상품 판매가
const discountedPriceInput = document.querySelector('.discounted-price');

function renderDiscountedPrice() {
  const discountedPrice = setDiscount(priceInput.value, rateInput.value);
  discountedPriceInput.value = discountedPrice;
}
renderDiscountedPrice();
priceInput.addEventListener('input', renderDiscountedPrice);
rateInput.addEventListener('input', renderDiscountedPrice);

//짧은 설명
const shortDescriptionInput = document.querySelector('input.shortDescription');
shortDescriptionInput.value = shortDescription;

const postButton = document.querySelector('.post');
postButton.addEventListener('click', async event => {
  event.preventDefault();

  const productThumbnail = document.querySelector('.productThumbnail').files[0];
  const formData = new FormData();
});
