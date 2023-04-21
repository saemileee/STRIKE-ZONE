// eslint-disable-next-line
import DUMMY_DATA from '/js/constants/dummy.js';

function getCartFromLocal() {
  const existsCart = localStorage.getItem('cart');
  const cartList = JSON.parse(existsCart) || {};
  return cartList;
}

function setCartToLocal(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getItemById(id) {
  return DUMMY_DATA.find(({ productID }) => productID === id);
}

export function getCartList() {
  const cartList = getCartFromLocal();

  const arrayCart = Object.entries(cartList).map(([id, data]) => ({
    id,
    ...data,
  }));

  return arrayCart;
}

/* order 페이지 사용 영역 */

export function getAllProduct(ship) {
  const cartList = getCartListSelected();
  return cartList.length;
}

export function getCartListSelected() {
  const cartList = getCartList();
  const selectedCartList = cartList.filter(({ selected }) => selected);

  return selectedCartList;
}

export function getOrderPrice(ship) {
  const cartList = getCartListSelected();
  const totalPricesByServer = cartList.map(
    ({ id, amount }) => getItemById(id).price * amount
  );
  const totalPrice = totalPricesByServer.reduce((acc, cur) => acc + cur, 0);

  if (ship) return totalPrice + ship;
  return totalPrice;
}

/* order 페이지 사용 영역 */

export function addItemCart(id, requestAmount = 1) {
  const cartList = getCartFromLocal();
  const { img, name, team, price } = getItemById(id);
  if (cartList[id]) {
    const { amount } = cartList[id];
    cartList[id] = {
      ...cartList[id],
      price,
      amount: amount + Number(requestAmount),
      total: price * (amount + 1),
    };
  } else {
    cartList[id] = {
      name,
      team,
      img,
      amount: Number(requestAmount),
      price,
      total: price,
      selected: true,
    };
  }
  setCartToLocal(cartList);
}

export function decreaseItemOfCart(id) {
  const cartList = getCartFromLocal();
  if (cartList[id].amount > 1) {
    const { amount } = cartList[id];
    const { price } = getItemById(id);
    cartList[id] = {
      ...cartList[id],
      price,
      amount: amount - 1,
      total: price * (amount - 1),
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
  for (const key in cartList) {
    cartList[key].selected = boolean;
  }
  setCartToLocal(cartList);
}

export function getIsAllSelceted(boolean) {
  const cartList = getCartFromLocal();
  for (const key in cartList) {
    if (!cartList[key].selected) return false;
  }
  return true;
}
