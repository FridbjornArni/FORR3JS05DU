// fetch func to get json file
fetch('data.json')
  .then(response => response.json())
  .then(data => displayData(data))
  .catch(error => console.error('Error fetching data:', error));

// displaying items
function displayData(items) {
  const container = document.getElementById('itemContainer');
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = 
		`<h2>${item.name}</h2>
		<sub>heimilisfang ${item.location} -- ${item.date}</sub>
		<p>price: ${item.price}</p>
		<img src="${item.image_url}" alt="">
		`;
    container.appendChild(itemDiv);
  });
}
