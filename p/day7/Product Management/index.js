'use strict';
const products = [
  {
    id: 1,
    name: 'Screwdriver',
    price: 10.5,
  },
  {
    id: 2,
    name: 'Hammer',
    price: 12.75,
  },
  {
    id: 3,
    name: 'Wrench',
    price: 15.0,
  },
  {
    id: 4,
    name: 'Drill',
    price: 55.0,
  },
  {
    id: 5,
    name: 'Nail Gun',
    price: 90.0,
  },
  {
    id: 6,
    name: 'Saw',
    price: 20.0,
  },
  {
    id: 7,
    name: 'Laser Cutter',
    price: 500.0,
  },
  {
    id: 8,
    name: 'Band Saw',
    price: 250.0,
  },
];

let person = {
  name: 'def',
  age: 30,
  city: 'abc',
};

function addProduct(id, name, price) {
  const product = { id: id, name: name, price: price };
  products.push(product);
  return product;
}

function updateProducts(id, name, price) {
  const product = products.find(existingProduct => {
    return existingProduct.id == id;
  });
  if (product) {
    product.name = name;
    product.price = price;
  }
}

const updateProductBtn = document.querySelector('#update-product');
updateProductBtn.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#add-product').addEventListener('click', () => {
    const id = document.querySelector('#id');
    const name = document.querySelector('#name');
    const price = document.querySelector('#price');
    const list = document.querySelector('#product-list');
    list.innerHTML = '';
    const listItem = document.createElement('h3');
    if (id.value != '' && name.value != '' && price.value != '') {
      addProduct(id.value, name.value, price.value);
      id.value = '';
      name.value = '';
      price.value = '';
      listItem.textContent = `Product Added!`;
      list.appendChild(listItem);
    } else {
      listItem.textContent = `Field Required!`;
      list.appendChild(listItem);
    }
  });
  document.querySelector('#view-products').addEventListener('click', () => {
    const list = document.querySelector('#product-list');

    list.innerHTML = '';

    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.className = product.id;
      listItem.textContent = `${product.id} ${product.name} ${product.price}`;
      const updateBtn = document.createElement('button');

      updateBtn.addEventListener('click', () => {
        document.querySelector('#add-product').disabled = true;

        const id = document.querySelector('#id');
        id.value = product.id;
        id.disabled = true;

        const name = document.querySelector('#name');
        name.value = product.name;
        const price = document.querySelector('#price');
        price.value = product.price;

        updateProductBtn.style.display = 'inline-block';
      });

      updateBtn.className = product.id;
      updateBtn.textContent = 'Update';
      listItem.appendChild(updateBtn);

      list.appendChild(listItem);
    });
  });
  document.querySelector('#update-product').addEventListener('click', () => {
    const list = document.querySelector('#product-list');
    list.innerHTML = '';
    const listItem = document.createElement('h3');
    listItem.textContent = 'Product has been updated';
    list.appendChild(listItem);
    const id = document.querySelector('#id');
    const name = document.querySelector('#name');
    const price = document.querySelector('#price');

    updateProducts(id.value, name.value, price.value);
    id.disabled = false;

    id.value = '';
    name.value = '';
    price.value = '';
    document.querySelector('#add-product').disabled = false;

    updateProductBtn.style.display = 'none';
  });
  document.querySelector('#apply-discount').addEventListener('click', () => {
    const discount = document.querySelector('#discount');
    if (discount != '') {
      const discountedProducts = [...products];
      const list = document.querySelector('#discounted-products');
      list.innerHTML = '';
      console.log(discountedProducts);
      discountedProducts.map(product => {
        const listItem = document.createElement('li');
        listItem.className = product.id;
        product.price =
          product.price - product.price * (parseFloat(discount.value) / 100);
        listItem.textContent = `${product.id} ${product.name} ${product.price}`;
        list.appendChild(listItem);
      });
      discount.value = '';
    } else {
    }
  });
});
