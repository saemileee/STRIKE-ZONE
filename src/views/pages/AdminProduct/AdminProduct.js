import { fetchData, deleteData } from '/js/api/api.js';
import { selectAllCheckbox } from '/js/utils.js';

const render = async () => {};

render();

let products = await fetchData('/products');
products = products.sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);
const tbodyElement = document.querySelector('tbody');

const teamSelectBox = document.querySelector('.select.team select');
const updateTeamOptions = async () => {
  const teams = await fetchData('/teams');
  const options = teams
    .map((team) => `<option value=${team.teamId}>${team.teamName}</option>`)
    .join('');
  teamSelectBox.innerHTML = `<option selected>팀 전체</option>${options}`;
};
await updateTeamOptions();

const categorySelectBox = document.querySelector('.select.category select');
const updateCategoryOptions = async (teamId) => {
  const categories = await fetchData(`/teams/${teamId}/categories`);
  const options = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join('');
  categorySelectBox.innerHTML = `<option selected>카테고리 전체</option>${options}`;
};

const filterProducts = (teamId, category) => {
  let filteredProducts = products;
  if (teamId !== '팀 전체') {
    filteredProducts = filteredProducts.filter(
      (product) => product.teamId === teamId
    );
  }
  if (category !== '카테고리 전체') {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryName === category
    );
  }
  return filteredProducts;
};

const renderProducts = (filteredProducts) => {
  renderTotalProducts(filteredProducts);
  renderProductList(filteredProducts);
};

teamSelectBox.addEventListener('input', async () => {
  const teamId = teamSelectBox.value;
  await updateCategoryOptions(teamId);
  const filteredProducts = filterProducts(teamId, categorySelectBox.value);
  renderProducts(filteredProducts);
});

categorySelectBox.addEventListener('input', () => {
  const teamId = teamSelectBox.value;
  const category = categorySelectBox.value;
  const filteredProducts = filterProducts(teamId, category);
  renderProducts(filteredProducts);
});

function renderTotalProducts(products) {
  const totalProductsElement = document.querySelector('.total-products');
  totalProductsElement.innerHTML = '';
  totalProductsElement.innerHTML = `전체 상품 : ${products.length}`;
}

function renderProductList(products) {
  tbodyElement.innerHTML = '';
  products.forEach((product) => {
    const {
      productId,
      teamName,
      categoryName,
      name,
      price,
      rate,
      discountedPrice,
      img,
      createdAt,
      updatedAt,
      inventory,
    } = product;
    const trElement = document.createElement('tr');
    trElement.innerHTML = `
    <td><input type="checkbox" data-product="${productId}" class="product-checkbox"/></td>
    <td><span>${new Date(createdAt).toLocaleString()}</span></td>
    <td><span>${new Date(updatedAt).toLocaleString()}</span></td>
    <td><span>${productId}</span></td>
    <td><span>${teamName}</span></td>
    <td><span>${categoryName}</span></td>
    <td><span>${name}</span></td>
    <td><img src="${img[0]}"/></td>
    <td><span>${price.toLocaleString()}원</span></td>
    <td><span>${rate}%</span></td>
    <td><span>${discountedPrice.toLocaleString()}원</span></td>
    <td><span>${inventory}개</span></td>
    `;

    const tdElement = document.createElement('td');

    const editDiv = document.createElement('div');
    editDiv.className = 'product-edit';

    const editButton = document.createElement('button');
    editButton.className = 'edit-product button is-dark';
    editButton.innerHTML = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-product button is-danger';
    deleteButton.innerHTML = '삭제';

    editDiv.append(editButton, deleteButton);
    tdElement.append(editDiv);
    trElement.append(tdElement);

    tbodyElement.append(trElement);

    editButton.addEventListener('click', () => {
      window.location.href = `/admin/product-management/${productId}`;
    });

    deleteButton.addEventListener('click', async () => {
      if (
        confirm(`삭제한 상품 정보는 되돌릴 수 없습니다.
정말 지우시겠습니까?`)
      ) {
        await deleteData(`/products/${productId}`);
        window.location.reload();
      }
    });
  });
}

const checkedDeleteButton = document.querySelector('.checked-delete-button');
checkedDeleteButton.addEventListener('click', async () => {
  const checkboxes = document.querySelectorAll('.product-checkbox');
  const checkedBoxes = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  );
  const checkedProducts = checkedBoxes.map((checkbox) => {
    const productId = checkbox.dataset.product;
    return productId;
  });
  if (
    confirm(`삭제한 상품 정보는 되돌릴 수 없습니다.
선택한 상품 ${checkedProducts.length}개를 정말 지우시겠습니까?`)
  ) {
    try {
      const response = await fetch(`//34.64.244.53/api/v1/products`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds: checkedProducts }),
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
});

const addProductButton = document.querySelector('.add-product');
addProductButton.addEventListener('click', () => {
  window.location.href = '/admin/product-management/post';
});

renderProductList(products);
renderTotalProducts(products);

selectAllCheckbox('product-checkbox', 'product-checkbox-all');

document.querySelectorAll('.admin-data')[1].remove();
