'use strict';

const products = [
  { id: 1, name: 'Phone', price: 2000 },
  { id: 2, name: 'E-Pen', price: 200 },
  { id: 3, name: 'Headphones', price: 100 },
  { id: 4, name: 'Speaker', price: 2000 },
  { id: 5, name: 'Charger', price: 200 },
  { id: 6, name: 'Microphone', price: 100 },
  { id: 7, name: 'Watch', price: 2000 },
  { id: 8, name: 'Keyboard', price: 200 },
  { id: 9, name: 'Toy', price: 100 },
];

let cart = [];
let orders = [];

function createProductSelector() {
  const productSelect = document.querySelector('#product-selector');
  products.forEach(product => {
    const selectItem = document.createElement('option');
    selectItem.value = product.id;
    selectItem.textContent = `${product.name} - ₹${product.price}`;
    productSelect.appendChild(selectItem);
  });
}
function viewOrders() {
  window.location.href = 'orders.html';
}
function generateOrderNumber() {
  let orderId;
  do {
    orderId = Math.floor(100000 + Math.random() * 900000).toString();
  } while (orders.some(order => order.orderId === orderId));
  return orderId;
}
function updateCart() {
  const cartItems = document.querySelector('#cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    enableFormFields(); // Re-enable fields when cart is empty
  } else {
    cart.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>
          <div class="quantity-wrap">
            <button class="quantity-control" data-id="${product.id}" data-action="decrease">-</button>
            <span>${product.quantity}</span>
            <button class="quantity-control" data-id="${product.id}" data-action="increase">+</button>
          </div>
        </td>
        <td><strong>₹${product.price}</strong></td>
        <td>
          <button class="remove-product" data-id="${product.id}">Remove</button>
        </td>`;
      cartItems.appendChild(row);
      total += product.price * product.quantity;
    });
  }

  document.querySelector(
    '.cart-total span:last-child'
  ).textContent = `₹${total}`;
}

function addToCart(productId) {
  const selectedProduct = products.find(product => product.id === productId);

  if (!selectedProduct) return;

  const existingProduct = cart.find(product => product.id === productId);
  if (existingProduct) {
    if (existingProduct.quantity < 9) {
      existingProduct.quantity++;
    }
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  updateCart();
  disableFormFields();
  showMessage('Product added to the cart!', 'success');
}

function modifyQuantity(productId, action) {
  const product = cart.find(product => product.id === productId);
  if (product) {
    if (action === 'increase' && product.quantity < 9) {
      product.quantity++;
    } else if (action === 'decrease') {
      product.quantity--;
      if (product.quantity === 0) {
        cart = cart.filter(item => item.id !== productId);
      }
    }
    updateCart();
  }

  // Re-enable fields if cart is empty
  if (cart.length === 0) {
    enableFormFields();
    showMessage(
      'Cart is empty! You can now re-enter customer details.',
      'error'
    );
  }
}

function removeProduct(productId) {
  cart = cart.filter(product => product.id !== productId);
  updateCart();
  if (cart.length === 0) {
    enableFormFields();
    showMessage(
      'Cart is empty! You can now re-enter customer details.',
      'error'
    );
  }
}

function placeOrder() {
  const customerName = document.querySelector('#customer-name').value;
  const mobileNumber = document.querySelector('#mobile-number').value;
  console.log('hi');
  if (!customerName || !mobileNumber || cart.length === 0) {
    showMessage(
      'Please fill in all details and add items to the cart!',
      'error'
    );
    return;
  }
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const now = new Date();
  const orderDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now);
  const orderTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const newOrder = {
    orderId: generateOrderNumber(),
    customerName,
    mobileNumber,
    items: [...cart],
    status: 'Pending',
    date: orderDate,
    time: orderTime,
    total: totalPrice,
  };
  console.log(orders);
  orders.push(newOrder);

  localStorage.setItem('orders', JSON.stringify(orders));

  cart = [];
  updateCart();
  showMessage('Order placed successfully!', 'success');
}

function showMessage(message, type = 'error') {
  const messageContainer = document.querySelector('#message-container');
  const messageText = document.querySelector('#message-text');

  messageText.textContent = message;
  messageContainer.classList.remove('hidden', 'success', 'error');
  messageContainer.classList.add(type, 'show');

  setTimeout(() => {
    messageContainer.classList.remove('show');
  }, 3000);
}

function cancelOrder() {
  cart = [];
  updateCart();
  enableFormFields();
  showMessage('Order has been canceled.', 'error');
}

function disableFormFields() {
  document.querySelector('#customer-name').disabled = true;
  document.querySelector('#mobile-number').disabled = true;
}

function enableFormFields() {
  document.querySelector('#customer-name').disabled = false;
  document.querySelector('#mobile-number').disabled = false;
  document.querySelector('#customer-name').value = '';
  document.querySelector('#mobile-number').value = '';
  document.querySelector('#product-selector').value = 'select-default';
}

function resetFormFields() {
  document.querySelector('#customer-name').value = '';
  document.querySelector('#mobile-number').value = '';
  enableFormFields();
}

document.addEventListener('DOMContentLoaded', () => {
  createProductSelector();

  document.querySelector('#add-product').addEventListener('click', event => {
    event.preventDefault();
    const customerName = document.querySelector('#customer-name').value.trim();
    const mobileNumber = document.querySelector('#mobile-number').value.trim();
    const selectedId = Number(
      document.querySelector('#product-selector').value
    );

    if (!customerName || !mobileNumber || selectedId === 'select-default') {
      showMessage('Please fill in all details and select a product.', 'error');
      return;
    }

    addToCart(selectedId);
  });

  document.querySelector('#cart-items').addEventListener('click', event => {
    if (event.target.classList.contains('quantity-control')) {
      const productId = Number(event.target.dataset.id);
      const action = event.target.dataset.action;
      modifyQuantity(productId, action);
    }

    if (event.target.classList.contains('remove-product')) {
      const productId = Number(event.target.dataset.id);
      removeProduct(productId);
    }
  });

  document.querySelector('#place-order').addEventListener('click', placeOrder);
  document.querySelector('#view-orders').addEventListener('click', viewOrders);

  document
    .querySelector('#cancel-order')
    .addEventListener('click', cancelOrder);
});
