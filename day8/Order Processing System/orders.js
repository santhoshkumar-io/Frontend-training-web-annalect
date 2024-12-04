'use strict';

function renderOrders() {
  const ordersContainer = document.querySelector('#orders-container');
  ordersContainer.innerHTML = '';

  if (orders.length === 0) {
    ordersContainer.innerHTML = '<p>No orders available!</p>';
    return;
  }

  orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.orderId = order.orderId;

    card.innerHTML = `
      <h4>Order #${order.orderId}</h4>
      <span>Customer: ${order.customerName}</span>
    `;

    card.addEventListener('click', () => openOrderDetail(order.orderId));
    ordersContainer.appendChild(card);
  });
}

function openOrderDetail(orderId) {
  const order = orders.find(order => order.orderId === orderId);
  if (!order) return;

  const orderTile = document.querySelector('#order-detail-tile');
  const orderDetails = document.querySelector('#order-details');
  const orderNumber = document.querySelector('#order-number');

  orderNumber.textContent = `Order #${order.orderId}`;
  orderDetails.innerHTML = `
    <p><strong>Customer Name:</strong> ${order.customerName}</p>
    <p><strong>Mobile Number:</strong> ${order.mobileNumber}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <p><strong>Order Date:</strong> ${order.date}</p>
    <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
    <h4>Products:</h4>
    <ul>
      ${order.items
        .map(
          item =>
            `<li>${item.name} - Qty: ${item.quantity} - ₹${
              item.price * item.quantity
            }</li>`
        )
        .join('')}
    </ul>
  `;

  const deleteOrderButton = document.querySelector('#delete-order');
  deleteOrderButton.dataset.orderId = orderId;

  orderTile.classList.remove('hidden');
}

function closeOrderDetail() {
  const orderTile = document.querySelector('#order-detail-tile');
  orderTile.classList.add('hidden');
}

function deleteOrder(orderId) {
  orders = orders.filter(order => order.orderId !== orderId);
  closeOrderDetail();
  renderOrders();
}
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
  orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.orderId = order.orderId;

    card.innerHTML = `
        <h4>Order #${order.orderId}</h4>
        <span>Customer: ${order.customerName}</span>
      `;

    card.addEventListener('click', () => openOrderDetail(order));
    ordersContainer.appendChild(card);
  });
}

function openOrderDetail(order) {
  const orderTile = document.querySelector('#order-detail-tile');
  const orderDetails = document.querySelector('#order-details');
  const orderNumber = document.querySelector('#order-number');

  orderNumber.textContent = `Order #${order.orderId}`;
  orderDetails.innerHTML = `
      <p><strong>Customer Name:</strong> ${order.customerName}</p>
      <p><strong>Mobile Number:</strong> ${order.mobileNumber}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <h4>Products:</h4>
      <ul>
        ${order.items
          .map(
            item =>
              `<li>${item.name} - Qty: ${item.quantity} - ₹${
                item.price * item.quantity
              }</li>`
          )
          .join('')}
      </ul>
    `;

  const deleteOrderButton = document.querySelector('#delete-order');
  deleteOrderButton.dataset.orderId = order.orderId;

  orderTile.classList.remove('hidden');
}

function closeOrderDetail() {
  document.querySelector('#order-detail-tile').classList.add('hidden');
}
