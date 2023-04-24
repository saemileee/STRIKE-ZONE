import { addItemCart } from '/js/api/cartAPI.js';

function getDiscountPrice(price, rate) {
  return price * ((100 - rate) * 0.01);
}

const Product = (
  target,
  { productId, name, teamName, img, inventory, discountedPrice, price, rate }
) => {
  const isSoldOut = inventory < 1;
  const isDiscount = rate > 0;
  let renderedPrice;
  if (isDiscount) renderedPrice = getDiscountPrice(discountedPrice, rate);
  renderedPrice = discountedPrice.toLocaleString();

  const $product = document.createElement('a');
  $product.setAttribute('href', `/products/${productId}`);
  $product.className = 'product';
  $product.innerHTML = `
    <div class="product-image">
      <img src="${img[0]}" alt="${name}">
    </div>
    <div class="product-content">
      <button class="product-cart-button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <h1 class="product-header">
        <span class="product-header-team">${teamName}</span>
        <span class="product-header-name">${name}</span>
      </h1>
      <div class="product-price">
        ${
          isDiscount
            ? `
            <div class="discount-field">
              <em class="product-price-rate">${rate}%</em>
              <em class="product-price-original">${price.toLocaleString()}원</em>
            </div>
            `
            : ''
        }
        <p class="product-price">${renderedPrice}원</p>
      </div>
    </div>
  `;

  const $cartBtn = $product.querySelector('.product-cart-button');
  $cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isSoldOut) {
      alert('품절된 상품입니다.');
      return;
    }
    alert('장바구니에 상품이 추가되었습니다!');
    addItemCart(productId);
  });

  if (isSoldOut) {
    $product.classList.add('soldout');
  }

  target.append($product);
};

export default Product;
