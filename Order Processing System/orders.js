'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  if (orders.length === 0) {
    document.querySelector('#orders-container').innerHTML =
      '<p>No orders available!</p>';
  } else {
    renderOrders(orders);
  }
});
function renderOrders(orders) {
  const ordersContainer = document.querySelector('#orders-container');
  ordersContainer.innerHTML = ''; // Clear any previous content
  console.log(orders);
  orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.orderId = order.orderId;
    card.innerHTML = `
            <div class='order-head'>
            <div class='order-left'>
                <div class='order-field-wrap'>
                    <h6>ORDER PLACED</h6>
                    <h5>${order.date}</h5>
                </div>
                <div class='order-field-wrap'>
                    <h6>TOTAL</h6>
                    <h5>₹${order.total}</h5>
                </div>
                <div class='order-field-wrap'>
                    <h6>SHIP TO</h6>
                    <h5 id='name'>${order.customerName}</h5>
                </div>
                <div class='order-field-wrap'>
                    <h6>CONTACT</h6>
                    <h5>${order.mobileNumber}</h5>
                </div>

            </div>
            <div class='order-right'>
                <div class='order-id'>ORDER # ${order.orderId}</div>
                <p>Status: <span class='${order.status}'>${
      order.status
    }</span></p>
            </div>
            </div>
            <div class='order-details'>
                <ul class='products-list'>
                    ${order.items
                      .map(
                        item =>
                          `<li><span>${item.name}</span><span>${
                            item.price
                          } </span><span>X ${item.quantity} </span><span>₹${(
                            item.price * item.quantity
                          ).toFixed(2)}</span></li>`
                      )
                      .join('')}
                </ul>
                    <p><strong>Total Price:</strong><span>₹${order.total.toFixed(
                      2
                    )}</span></p>

              <div class='delete-btn-wrap'><button class="btn-delete" onclick="deleteOrder('${
                order.orderId
              }')">Delete Order</button></div>
            </div>
        `;
    card.addEventListener('click', () => toggleOrderDetails(card));
    ordersContainer.appendChild(card);
  });
}
function toggleOrderDetails(card) {
  card.classList.toggle('expanded');
}
function deleteOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders = orders.filter(order => order.orderId !== orderId);
  localStorage.setItem('orders', JSON.stringify(orders));
  renderOrders(orders);
}
