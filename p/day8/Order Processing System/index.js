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
const orders = [
  {
    id: 100,
    name: 'summer',
    listOfProducts: [
      { id: 1, name: 'Phone', price: 2000 },
      { id: 2, name: 'Charger', price: 200 },
    ],
    totalAmount: 3000,
  },
];
function createProductSelector() {
  const productSelect = document.querySelector('#product-selector');

  products.forEach(product => {
    const selectItem = document.createElement('option');
    selectItem.value = product.id;
    selectItem.textContent = ` -----  ${product.name}  ---- `;
    productSelect.appendChild(selectItem);
  });
  return true;
}
function appendSelectedProducts(listOfProducts) {
  const list = document.querySelector('#product-list');
  list.innerHTML = '';
  let total = 0;

  listOfProducts.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `${product.name} ${product.price} X ${product.quantity}`;
    list.appendChild(listItem);
    total += calcAmount(product.price, product.quantity);
  });
  appendtotal(total);
  return listOfProducts;
}
function appendtotal(total) {
  const totalValue = document.querySelector('#total-value');
  totalValue.textContent = `The total is ${total}`;
}
function calcAmount(price, quantity) {
  return price * quantity;
}

function calcTotal(listOfProducts) {
  let total = 0;
  listOfProducts.forEach(product => {
    total += calcAmount(product.price, product.quantity);
  });
  return total;
}

function checkSameProduct(listOfProducts, selectedProduct, selectedId) {
  const isSameProduct = listOfProducts.findIndex(product => {
    return product.id === selectedId;
  });
  if (isSameProduct != -1) {
    listOfProducts[isSameProduct].quantity += 1;
    return appendSelectedProducts(listOfProducts);
  } else {
    listOfProducts.push(selectedProduct);
    return appendSelectedProducts(listOfProducts);
  }
}
function addProduct(listOfProducts) {
  const selectedId = Number(document.querySelector('#product-selector').value);
  const name = document.querySelector('#customer-name').value;
  const mobile = document.querySelector('#mobile-number').value;
  const regex = new RegExp('^[0-9]{10}$');
  console.log(selectedId);
  if (name !== '' && regex.test(mobile)) {
    const selectedProduct = products.find(product => {
      return product.id === selectedId;
    });
    return checkSameProduct(
      listOfProducts,
      { ...selectedProduct, quantity: 1 },
      selectedId
    );
  } else {
    console.log('Error');
  }
}
function addOrder(listOfProducts) {
  const name = document.querySelector('#customer-name').value;
  const mobile = document.querySelector('#mobile-number').value;
  const orderId = generateRandomSixDigitNumber();
  const orderList = document.querySelector('#order-list');
  const currentOrder = { id: orderId, name, mobile, listOfProducts };
  const orderListItem = document.createElement('li');
  orderListItem.textContent = `${currentOrder.id} ${currentOrder.name} ${
    currentOrder.mobile
  } ${formatProducts(currentOrder.listOfProducts)} total: ${calcTotal(
    currentOrder.listOfProducts
  )}`;
  orderList.appendChild(orderListItem);
  orders.push(currentOrder);
  console.log(orders);
  document.querySelector('#customer-name').value = '';
  document.querySelector('#mobile-number').value = '';
  document.querySelector('#product-selector').value = 'select-default';
  document.querySelector('#product-list').innerHTML = '';
  document.querySelector('#total-value').innerHTML = '';
}
function formatProducts(products) {
  return products
    .map(product => `${product.name} (${product.quantity})`)
    .join(', ');
}
function generateRandomSixDigitNumber() {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
}
document.addEventListener('DOMContentLoaded', () => {
  let listOfProducts = [];
  createProductSelector();
  document.querySelector('#add-product').addEventListener('click', () => {
    listOfProducts = addProduct(listOfProducts);
  });
  document.querySelector('#place-order').addEventListener('click', () => {
    addOrder(listOfProducts);
    listOfProducts = [];
    console.log(listOfProducts);
  });
});
