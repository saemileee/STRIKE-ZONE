import { fetchData, deleteData } from '/js/api/api.js';

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

const filterProducts = (teamId, category) => {
  let filteredProducts = products;
  if (teamId !== '팀 전체') {
    filteredProducts = filteredProducts.filter(
      product => product.teamId === teamId
    );
  }
  if (category !== '카테고리 전체') {
    filteredProducts = filteredProducts.filter(
      product => product.categoryName === category
    );
  }
  return filteredProducts;
};

const renderProducts = filteredProducts => {
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
  products.forEach(product => {
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
    <th><input type="checkbox" data-product="${productId}"/></th>
    <th>${new Date(createdAt).toLocaleString()}</th>
    <td>${new Date(updatedAt).toLocaleString()}</td>
    <td>${productId}</td>
    <td>${teamName}</td>
    <td>${categoryName}</td>
    <td>${name}</td>
    <td><img src="${img[0]}"/></td>
    <td>${price.toLocaleString()}원</td>
    <td>${rate}%</td>
    <td>${discountedPrice.toLocaleString()}원</td>
    <td>${inventory}개</td>
    `;

    const tdElement = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.className = 'edit-product button is-small';
    editButton.innerHTML = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-product button is-danger is-small';
    deleteButton.innerHTML = '삭제';

    tdElement.append(editButton, deleteButton);
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

const addProductButton = document.querySelector('.add-product');
addProductButton.addEventListener('click', () => {
  window.location.href = '/admin/product-management/post';
});

renderProductList(products);
renderTotalProducts(products);
