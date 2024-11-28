// Sample Array of Product objects
const products = [
  {
    id: 1,
    name: 'Screwdriver',
    category: 'Tools',
    price: 10.5,
    quantity: 150,
    dateAdded: new Date('2023-01-01'),
  },
  {
    id: 2,
    name: 'Hammer',
    category: 'Tools',
    price: 12.75,
    quantity: 120,
    dateAdded: new Date('2023-02-15'),
  },
  {
    id: 3,
    name: 'Wrench',
    category: 'Tools',
    price: 15.0,
    quantity: 200,
    dateAdded: new Date('2023-03-10'),
  },
  {
    id: 4,
    name: 'Drill',
    category: 'Power Tools',
    price: 55.0,
    quantity: 80,
    dateAdded: new Date('2023-05-25'),
  },
  {
    id: 5,
    name: 'Nail Gun',
    category: 'Power Tools',
    price: 90.0,
    quantity: 50,
    dateAdded: new Date('2023-06-30'),
  },
  {
    id: 6,
    name: 'Saw',
    category: 'Tools',
    price: 20.0,
    quantity: 100,
    dateAdded: new Date('2023-04-20'),
  },
  {
    id: 7,
    name: 'Laser Cutter',
    category: 'Machines',
    price: 500.0,
    quantity: 15,
    dateAdded: new Date('2023-07-15'),
  },
  {
    id: 8,
    name: 'Band Saw',
    category: 'Machines',
    price: 250.0,
    quantity: 25,
    dateAdded: new Date('2023-08-05'),
  },
];

// 1. Sorting by Price (ascending) spread operator to create a new array
function sortByPrice() {
  const sortedByPrice = [...products].sort((a, b) => a.price - b.price);

  return sortedByPrice;
}

// 2. Sorting by Quantity (descending)
function sortByQuantity() {
  const sortedByQuantity = [...products].sort(
    (a, b) => b.quantity - a.quantity
  );
  return sortedByQuantity;
}

// 3. Sorting by Date Added (ascending)
function sortByDate() {
  const sortedByDateAdded = [...products].sort(
    (a, b) => a.dateAdded - b.dateAdded
  );
  return sortedByDateAdded;
}

// 4. Search: Find all products in a specific category (  e.g., 'Tools')
function searchByCategory(val) {
  const toolsCategory = products.filter(product => product.category === val);
  return toolsCategory;
}

// 5. Search: Find products with price less than a certain value (e.g., 30)
function searchByPrice(val) {
  const affordableProducts = products.filter(product => product.price < val);
  return affordableProducts;
}

// 6. Search: Find product by name (e.g., 'Hammer')
function searchByName(val) {
  const hammerProduct = products.find(product => product.name === val);
  if (hammerProduct) {
    return hammerProduct;
  } else {
    return {};
  }
}

// 7. Search: Find products with quantity greater than a certain value (e.g., 100)
function searchByQuantity(val) {
  const highQuantityProducts = products.filter(
    product => product.quantity > val
  );
  return highQuantityProducts;
}

// 8. Complex Search: Find products by category and price range
// const powerToolsUnder100 = products.filter(
//   product => product.category === 'Power Tools' && product.price < 100
// );
// console.log('Power Tools under 100:', powerToolsUnder100);
// console.log(sortByQuantity());
// console.log(sortByDate());
// console.log(searchByCategory());
// console.log(searchByPrice());
// console.log(searchByName());
// console.log(searchByQuantity());

document.addEventListener('DOMContentLoaded', () => {
  function displayContent(arr) {
    const list = document.getElementById('productList');
    list.innerHTML = ''; // Clear existing content

    if (typeof arr === 'string') {
      const listHead = document.createElement('h3');
      listHead.textContent = arr;
      list.appendChild(listHead);
    } else {
      //header
      const headerRow = document.createElement('tr');
      headerRow.className = 'table-header';
      const headers = ['Name', 'Price', 'Quantity', 'Category', 'Date'];
      headers.forEach(header => {
        const headerCell = document.createElement('th');
        headerCell.className = 'table-cell';
        headerCell.textContent = header;
        headerRow.appendChild(headerCell);
      });
      list.appendChild(headerRow);

      //rows
      if (Array.isArray(arr)) {
        arr.forEach(product => {
          const date = product.dateAdded.toISOString().split('T')[0];
          const row = document.createElement('tr');
          row.className = 'table-row';

          const values = [
            product.name,
            product.price,
            product.quantity,
            product.category,
            date,
          ];
          values.forEach(value => {
            const cell = document.createElement('td');
            cell.className = 'table-cell';
            cell.textContent = value;
            row.appendChild(cell);
          });

          list.appendChild(row);
        });
      } else {
        const date = arr.dateAdded.toISOString().split('T')[0];
        const row = document.createElement('tr');
        row.className = 'table-row';

        const values = [arr.name, arr.price, arr.quantity, arr.category, date];
        values.forEach(value => {
          const cell = document.createElement('td');
          cell.className = 'table-cell';
          cell.textContent = value;
          row.appendChild(cell);
        });

        list.appendChild(row);
      }
    }
  }

  document.getElementById('search-btn').addEventListener('click', () => {
    let val = document.getElementById('search-field').value;
    if (val != '') {
      if (document.getElementById('category-search').checked) {
        const check = searchByCategory(val);
        //Used terinary operator
        check.length > 0 ? displayContent(check) : displayContent('Not Found!');
      } else if (document.getElementById('price-search').checked) {
        const check = searchByPrice(val);
        //Used terinary operator
        check.length > 0 ? displayContent(check) : displayContent('Not Found!');
      } else if (document.getElementById('name-search').checked) {
        const check = searchByName(val);
        console.log(check);
        //Used terinary operator
        Object.keys(check).length > 0
          ? displayContent(check)
          : displayContent('Not Found!');
      } else if (document.getElementById('quantity-search').checked) {
        const check = searchByQuantity(val);
        //Used terinary operator
        check.length > 0 ? displayContent(check) : displayContent('Not Found!');
      } else {
        displayContent('No product Found');
      }
      document.getElementById('search-field').value = '';
    } else {
      displayContent('Search field is empty');
    }
  });
  document.getElementById('sort-btn').addEventListener('click', () => {
    let val = document.getElementById('sort-select').value;
    if (val === 'price') {
      displayContent(sortByPrice());
    } else if (val === 'date') {
      displayContent(sortByDate());
    } else if (val === 'quantity') {
      displayContent(sortByQuantity());
    } else {
      displayContent('Select any sort');
    }
    document.getElementById('sort-select').value = 'select-default';
  });
});
