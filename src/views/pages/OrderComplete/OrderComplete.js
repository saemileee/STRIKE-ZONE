import { $ } from '/js/utils.js';

const urlParams = new URL(location.href).searchParams;
const ORDER_ID = urlParams.get('id');

if (!ORDER_ID) location.href = `/NotFound`;

$('.to-order-detail-button').addEventListener('click', () => {
  location.href = `/user/orders/${ORDER_ID}`;
});
