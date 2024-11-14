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

const Orders = [
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
    selectItem.textContent = ` ----- ${product.name}  ---- `;
    productSelect.appendChild(selectItem);
  });
  return true;
}
function displaySelectedProducts(listOfProducts, quantity, selectedProduct) {
  listOfProducts.push({ quantity, ...selectedProduct });
  const list = document.querySelector('#product-list');
  const listItem = document.createElement('li');
  listItem.textContent = `${selectedProduct.name} ${selectedProduct.price}`;
  list.appendChild(listItem);
}
function checkSameProduct(listOfProducts, selectedProduct, selectedId) {
  const isSameProduct = listOfProducts.find(product => {
    return product.id === selectedId;
  });
  console.log(isSameProduct);

  let quantity = 0;
  if (isSameProduct) {
    quantity += 1;
    listOfProducts;
  } else {
    quantity = 1;
    displaySelectedProducts(listOfProducts, quantity, selectedProduct);
  }
  console.log(quantity);
}

function addProduct(listOfProducts) {
  const selectedId = Number(document.querySelector('#product-selector').value);
  const name = document.querySelector('#customer-name').value;
  const mobile = document.querySelector('#mobile-number').value;
  const regex = new RegExp('^[0-9]{10}$');
  if (name !== '' && regex.test(mobile) && selectedId != 'select-default') {
    const selectedProduct = products.find(product => {
      return product.id === selectedId;
    });

    checkSameProduct(listOfProducts, selectedProduct, selectedId);

    return true;
  } else {
    console.log('Error');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const listOfProducts = [];
  createProductSelector();
  document.querySelector('#add-product').addEventListener('click', () => {
    addProduct(listOfProducts);
  });
});
