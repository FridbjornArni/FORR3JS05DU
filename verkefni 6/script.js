// Fetch data and initial display
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const minPrice = Math.min(...data.map(item => item.price));
    const maxPrice = Math.max(...data.map(item => item.price));
    
    const priceSlider = document.getElementById('priceSlider');
    const priceLabel = document.getElementById('priceLabel');
    const searchBar = document.getElementById('searchBar');
    const sortSelect = document.getElementById('sortSelect');

    // Initialize the controls
    priceSlider.min = minPrice;
    priceSlider.max = maxPrice;
    priceSlider.value = maxPrice;
    priceLabel.textContent = maxPrice;
    const numberOfSteps = 20;  // The number of steps you want on the slider
    const stepSize = (maxPrice - minPrice) / numberOfSteps;

    priceSlider.step = stepSize;


    // Initial display
    filterAndDisplayData(data);

    // Event Listener for price slider
    priceSlider.addEventListener('input', () => {
      priceLabel.textContent = priceSlider.value;
      filterAndDisplayData(data);
    });

    // Event Listener for search bar
    searchBar.addEventListener('input', () => {
      filterAndDisplayData(data);
    });

    // Event Listener for sort select
    sortSelect.addEventListener('change', () => {
      filterAndDisplayData(data);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to filter and display items
function filterAndDisplayData(data) {
  const selectedPrice = parseFloat(document.getElementById('priceSlider').value);
  const query = document.getElementById('searchBar').value.toLowerCase();
  const sortBy = document.getElementById('sortSelect').value;

  let filteredData = data.filter(item => item.price <= selectedPrice);

  if (query) {
    filteredData = filteredData.filter(item => {
      return Object.values(item).some(val => 
        val.toString().toLowerCase().includes(query)
      );
    });
  }

  sortAndDisplayData(filteredData, sortBy);
}

// Function to sort and display items
function sortAndDisplayData(data, sortBy) {
  let sortedData;
  switch (sortBy) {
    case 'price-asc':
      sortedData = [...data].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedData = [...data].sort((a, b) => b.price - a.price);
      break;
    case 'date-asc':
      sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'date-desc':
      sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    default:
      sortedData = data;
      break;
  }
  displayData(sortedData);
}

// Function to display items
function displayData(items) {
  const container = document.getElementById('itemContainer');
  container.innerHTML = '';
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
      <h2>${item.name}</h2>
      <sub>heimilisfang ${item.location} -- ${formatDate(item.date)}</sub>
      <p>price: ${item.price}</p>
      <img src="${item.image_url}" alt="">
    `;
    container.appendChild(itemDiv);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
