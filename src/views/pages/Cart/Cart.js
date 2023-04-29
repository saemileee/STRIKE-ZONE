import {
  getCartList,
  getCartListSelected,
  addItemCart,
  decreaseItemOfCart,
  deleteItemOfCart,
  deleteAllOfCart,
  toggleItemOfCart,
  toggleAllItemOfCart,
  getOrderPrice,
  getIsAllSelected,
} from '/js/api/cartAPI.js';
import { $, $createElement } from '/js/utils.js';

const $checkAll = $('.cart-select-all-checkbox');
const $price = $('.price');

const CartItem = (target, { productID, name, price, total, img, amount, selected, rate }) => {
  const $cartItem = $createElement('li', 'cart-item');
  $cartItem.innerHTML = `
    <article class="cart-group" product-id=${productID}>
      <span class="cart-delete-button">
        <i class="fa-regular fa-trash-can"></i>
      </span>
      <div class="cart-select">
        <label class="checkbox">
          <input type="checkbox" class="cart-product-checkbox">
        </label>
      </div>
      <div class="cart-product">
        <div class="cart-product-data">
          <img src=${img} alt="">
          <a href="/products/${productID}" class="cart-product-name">${name}</a>
          <div class="cart-product-order">
            <div class="cart-product-amount">
              <span class="amount-minus">-</span>
              <span class="amount">${amount}</span>
              <span class="amount-plus">+</span>
            </div>
            <div class="cart-product-price-box">
              <p class="cart-product-price ${rate > 0 ? 'has-rate' : ''}"> ${(
    price * amount
  ).toLocaleString()}원 </p>
              ${
                rate > 0
                  ? `
                    <p class="cart-product-price">${total.toLocaleString()}원</p>
                    <span class="cart-product-rate">${rate}%</span>
                  `
                  : ''
              }
            </div>
        </div>
      </div>
    </article>
  `;

  const $checkbox = $cartItem.querySelector('.cart-product-checkbox');
  if (selected) $checkbox.checked = true;
  $checkbox.addEventListener('click', () => {
    toggleItemOfCart(productID);
    render();
  });

  const $amountIncreaseButton = $cartItem.querySelector('.amount-plus');
  $amountIncreaseButton.addEventListener('click', async (event) => {
    await addItemCart(productID);
    render();
  });

  const $amountDecreaseButton = $cartItem.querySelector('.amount-minus');
  $amountDecreaseButton.addEventListener('click', async (event) => {
    await decreaseItemOfCart(productID);
    render();
  });

  const $deleteButton = $cartItem.querySelector('.cart-delete-button');
  $deleteButton.addEventListener('click', () => {
    deleteItemOfCart(productID);
    render();
  });

  target.append($cartItem);
};

const CartPrice = (shipPrice, allProductsPrice) => {
  const $cartPrice = $createElement('div', 'cart-price');
  const ship = shipPrice.toLocaleString();
  const allProducts = allProductsPrice.toLocaleString();
  const total = (shipPrice + allProductsPrice).toLocaleString();
  $cartPrice.innerHTML = `
    <div class="ship">
      <p>배송비</p>
      <em class="ship-price">${ship}원</em>
    </div>
    <div class="product">
      <p>상품 금액</p>
      <em class="product-price">${allProducts}원</em>
    </div>
    <div class="total">
      <p>최종 금액</p>
      <em class="total-price">${total}원</em>
    </div>
    <button class="button is-black order-button">주문하기</button>
  `;
  const $orderButton = $cartPrice.querySelector('.order-button');

  $orderButton.addEventListener('click', () => {
    const selectedItemAmount = getCartListSelected();
    if (selectedItemAmount < 1) {
      alert('최소 한 가지 이상의 항목을 선택해주세요!');
      return;
    }
    location.href = '/order';
  });

  $price.append($cartPrice);
};

const toggleHandler = () => {
  $checkAll.addEventListener('click', (event) => {
    const currentCheck = event.target.checked;
    toggleAllItemOfCart(!currentCheck);
    render();
  });
};

const deleteAllHandler = () => {
  const $deleteAll = $('.delete-all');
  $deleteAll.addEventListener('click', (event) => {
    deleteAllOfCart();
    render();
  });
};

async function render() {
  const $cartList = $('.cart-list');
  $cartList.innerHTML = '';

  const isAllSelceted = getIsAllSelected();
  $checkAll.checked = isAllSelceted;

  const currentCart = getCartList();

  currentCart.forEach(({ amount, id, img, name, price, total, selected, rate }) => {
    CartItem($cartList, {
      productID: id,
      name,
      price,
      total,
      img,
      amount,
      selected,
      rate,
    });
  });
  $price.innerHTML = '';

  const shipPrice = 3000;
  const totalPrice = await getOrderPrice();
  CartPrice(shipPrice, totalPrice);
}

render();
toggleHandler();
deleteAllHandler();
