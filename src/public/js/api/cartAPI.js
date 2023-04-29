import { setDiscount } from '../utils.js';

function changeCartAmount() {
  document.querySelector('.cart-amount').innerHTML = getCartList().length;
}

function getCartFromLocal() {
  const existsCart = localStorage.getItem('cart');
  const cartList = JSON.parse(existsCart) || {};
  return cartList;
}

function setCartToLocal(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  changeCartAmount();
}

async function getItemById(id) {
  return await fetch(`/api/v1/products/${id}`).then((res) => res.json());
}

export function getCartList() {
  const cartList = getCartFromLocal();

  const arrayCart = Object.entries(cartList).map(([id, data]) => ({
    id,
    ...data,
  }));

  return arrayCart;
}

export function getCartListSelected() {
  const cartList = getCartList();
  const selectedCartList = cartList.filter(({ selected }) => selected);

  return selectedCartList;
}

export function getAllProduct() {
  const cartList = getCartListSelected();
  return cartList.length;
}

export async function getOrderPrice(ship) {
  const cartList = getCartListSelected();
  if (cartList.length < 1) return 0;

  const totalPricesByServer = await Promise.all(
    cartList.map(async ({ id, amount }) => {
      const cartItem = await getItemById(id);
      const { price, rate } = cartItem;
      const combinedPrice = setDiscount(price, rate) * amount;
      return combinedPrice;
    })
  );
  const totalPrice = totalPricesByServer.reduce((acc, cur) => acc + cur, 0);

  if (ship) return totalPrice + ship;
  return totalPrice;
}

export async function addItemCart(id, requestAmount = 1) {
  const cartList = getCartFromLocal();
  const { img, name, team, price, rate } = await getItemById(id);
  const discountedPrice = setDiscount(price, rate);
  if (cartList[id]) {
    const { amount } = cartList[id];
    cartList[id] = {
      ...cartList[id],
      rate,
      price,
      amount: amount + Number(requestAmount),
      total: discountedPrice * (amount + Number(requestAmount)),
    };
  } else {
    cartList[id] = {
      name,
      team,
      rate,
      img: img[0],
      price,
      discountedPrice,
      amount: Number(requestAmount),
      total: discountedPrice * Number(requestAmount),
      selected: true,
    };
  }
  setCartToLocal(cartList);
}

export async function decreaseItemOfCart(id) {
  const cartList = getCartFromLocal();
  if (cartList[id].amount > 1) {
    const { amount } = cartList[id];
    const { price, rate } = await getItemById(id);
    const discountedPrice = setDiscount(price, rate);
    cartList[id] = {
      ...cartList[id],
      rate,
      price,
      amount: amount - 1,
      total: discountedPrice * (amount - 1),
    };
  } else delete cartList[id];
  setCartToLocal(cartList);
}

export function deleteItemOfCart(id) {
  const cartList = getCartFromLocal();
  delete cartList[id];
  setCartToLocal(cartList);
}

export function deleteAllOfCart() {
  setCartToLocal({});
}

export function toggleItemOfCart(id) {
  const cartList = getCartFromLocal();
  cartList[id].selected = !cartList[id].selected;
  setCartToLocal(cartList);
}

export function toggleAllItemOfCart(boolean) {
  const cartList = getCartFromLocal();
  const cartListKeys = Object.keys(cartList);

  cartListKeys.forEach((key) => {
    cartList[key].selected = !boolean;
  });
  setCartToLocal(cartList);
}

export function getIsAllSelected() {
  const cartList = getCartFromLocal();
  const cartListKeys = Object.keys(cartList);

  return cartListKeys.every((key) => cartList[key].selected);
}
