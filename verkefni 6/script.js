// Fetch data and initial display
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Find min and max prices
    const minPrice = Math.min(...data.map(item => item.price));
    const maxPrice = Math.max(...data.map(item => item.price));
    
    // Initialize the price slider
    const priceSlider = document.getElementById('priceSlider');
    const priceLabel = document.getElementById('priceLabel');
    priceSlider.min = minPrice;
    priceSlider.max = maxPrice;
    priceSlider.step = 10;  // Here you set the step
    priceSlider.value = maxPrice;
    priceLabel.textContent = maxPrice;

    displayData(data);

    // Add slider event listener
    priceSlider.addEventListener('input', (e) => {
      const selectedPrice = e.target.value;
      priceLabel.textContent = selectedPrice;
      const filteredData = data.filter(item => item.price <= selectedPrice);
      displayData(filteredData);
    });

    
    // Add slider event listener
    priceSlider.addEventListener('input', (e) => {
      const selectedPrice = e.target.value;
      priceLabel.textContent = selectedPrice;
      const filteredData = data.filter(item => item.price <= selectedPrice);
      displayData(filteredData);
    });    displayData(data);
    
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', (e) => {
      const sortBy = e.target.value;
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
          sortedData = data; // Original order or any other default
          break;
      }

      displayData(sortedData);
    });
  })
  .catch(error => console.error('Error fetching data:', error));



function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
  

// Function to display items
function displayData(items) {
  const container = document.getElementById('itemContainer');
  // Clear existing items
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
