/* eslint-disable */
import {
  getCartList,
  addItemCart,
  decreaseItemOfCart,
  deleteItemOfCart,
  deleteAllOfCart,
  toggleItemOfCart,
  toggleAllItemOfCart,
  getOrderPrice,
  getIsAllSelceted,
} from '/js/api/cartAPI.js';

function $(selector) {
  return document.querySelector(selector);
}

function $createElement(elementType, className) {
  const $el = document.createElement(elementType);
  $el.className = className;
  return $el;
}

const $price = $('.price');
const $checkAll = $('.cart-select-all-checkbox');
const $deleteAll = $('.delete-all');

const CartItem = (target, { productID, name, total, img, amount, selected }) => {
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
          <h1 class="cart-product-name">${name}</h1>
          <div class="cart-product-order">
            <div class="cart-product-amount">
              <span class="amount-minus">-</span>
              <span class="amount">${amount}</span>
              <span class="amount-plus">+</span>
            </div>
            <p class="cart-product-price">${total.toLocaleString()}원</p>
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

  const $amountController = $cartItem.querySelector('.cart-product-amount');
  $amountController.addEventListener('click', (event) => {
    if (event.target.closest('.amount-minus')) {
      decreaseItemOfCart(productID);
    }
    if (event.target.closest('.amount-plus')) {
      addItemCart(productID);
    }
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
    <button class="button is-primary order-button" onclick="location.href='/order'">주문하기</button>
  `;
  $price.append($cartPrice);
};

const checkAllHandler = () => {
  $checkAll.addEventListener('click', (event) => {
    const currentCheck = event.target.checked;
    toggleAllItemOfCart(currentCheck);
    render();
  });
};

const deleteAllHandler = () => {
  $deleteAll.addEventListener('click', (event) => {
    deleteAllOfCart();
    render();
  });
};

function render() {
  const $cartList = $('.cart-list');
  $cartList.innerHTML = '';

  const isAllSelceted = getIsAllSelceted();
  $checkAll.checked = isAllSelceted;

  const currentCart = getCartList();

  if (currentCart)
    currentCart.forEach(({ amount, id, img, name, total, selected }) => {
      CartItem($cartList, {
        productID: id,
        name,
        total,
        img,
        amount,
        selected,
      });
    });
  $price.innerHTML = '';

  const shipPrice = 3000;
  const totalPrice = getOrderPrice();
  CartPrice(shipPrice, totalPrice);
}

render();
checkAllHandler();
deleteAllHandler();
