// Try to retrieve the shopping list from local storage
let storedShoppingList = JSON.parse(localStorage.getItem("shoppingList")) || { items: [
  { name: "pizza", price: 850 },
  { name: "t-shirt", price: 3000 },
  { name: "bounty", price: 150 },
  { name: "coke", price: 250 },
],
total: 0,};
let shoppingList = storedShoppingList;

function updatePage() {
  // Calculate total price
  shoppingList.total = shoppingList.items.reduce((acc, item) => acc + item.price, 0);

  // Save the updated shopping list to local storage
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

  // Update HTML
  const itemList = document.getElementById('itemList');
  const totalPrice = document.getElementById('totalPrice');

  let listHTML = '<ul>';
  shoppingList.items.forEach((item, index) => {
    listHTML += `<li data-index="${index}">${item.name} - ${item.price}</li>`;
  });
  listHTML += '</ul>';
  itemList.innerHTML = listHTML;

  // Display total price
  totalPrice.innerHTML = `Total price: ${shoppingList.total}`;

  // Attach event listeners to list items
  document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', function(event) {
      const index = event.target.getAttribute('data-index');
      shoppingList.items.splice(index, 1);
      updatePage();
    });
  });
}

// Initialize page
updatePage();

document.getElementById("newitem").addEventListener("click", function() {
  const newItem = document.querySelector(".inpStuff").value;
  const newPrice = parseInt(document.getElementById("inpPrice").value);

  // Add new item to the shoppingList object
  shoppingList.items.push({ name: newItem, price: newPrice });

  // Update the page
  updatePage();

  // Optional: Clear the input fields
  document.querySelector(".inpStuff").value = "";
  document.getElementById("inpPrice").value = 0;
});
  