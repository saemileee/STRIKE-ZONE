function getDiscountPrice(price, rate) {
  return price * ((100 - rate) * 0.01);
}

const renderProducts = (
  target,
  { productId, name, teamName, img, price, rate }
) => {
  const isDiscount = rate > 0;
  let renderedPrice;
  if (isDiscount) renderedPrice = getDiscountPrice(price, rate);
  renderedPrice = price.toLocaleString();

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
        ${isDiscount ? `<em class="product-price-rate">${rate}%</em>` : ''}
        <p class="product-price">${renderedPrice}원</p>
      </div>
    </div>
  `;

  const $cartBtn = $product.querySelector('.product-cart-button');
  $cartBtn.addEventListener('click', e => {
    e.preventDefault();
    addItemCart(productID);
  });

  target.append($product);
};

export default renderProducts;
