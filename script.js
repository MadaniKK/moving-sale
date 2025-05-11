// script.js
import { items } from './items.js';

const filterCategory = document.getElementById('filter-category');
const sortBy         = document.getElementById('sort-by');
const grid           = document.getElementById('items-grid');

function initFilters() {
  const cats = Array.from(new Set(items.map(i => i.category)));
  cats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    filterCategory.appendChild(opt);
  });
}

function renderItems() {
  grid.innerHTML = '';

  const chosenCat  = filterCategory.value;
  const chosenSort = sortBy.value;

  let list = items
    .map((item, idx) => ({ ...item, _idx: idx }))    // keep original index
    .filter(item =>
      chosenCat === 'all' || item.category === chosenCat
    );

  if (chosenSort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (chosenSort === 'status') {
    list.sort((a, b) =>
      a.status === b.status
        ? 0
        : (a.status === 'available' ? -1 : 1)
    );
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.images[0]}" alt="${item.title}" />
      <div class="card-content">
        <h2>${item.title}</h2>
        <small>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</small>
        <p>${item.description}</p>
        <div class="price ${item.price === 0 ? 'free' : ''}">
          ${item.price === 0 ? 'Free' : '$ ' + item.price}
        </div>
        <span class="status ${item.status}">
          ${item.status === 'sold' ? 'Sold' : 'Available'}
        </span>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `detail.html?id=${item._idx}`;
    });
    grid.appendChild(card);
  });
}

// wire up
filterCategory.addEventListener('change', renderItems);
sortBy.addEventListener('change',       renderItems);

initFilters();
renderItems();
document.getElementById('last-updated').textContent =
new Date().toLocaleDateString();
