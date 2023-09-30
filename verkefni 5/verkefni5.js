// Try to retrieve the shopping list from local storage
let storedShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
let shoppingList = storedShoppingList;

// Function to update the list and total price on the page
function updatePage() {
  // Calculate total price
  shoppingList.total = shoppingList.items.reduce((acc, item) => acc + item.price, 0);

  // Save the updated shopping list to local storage
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

  // Update total in the object
  console.log(`Total price: ${shoppingList.total}`);

  // Update HTML
  const itemList = document.getElementById('itemList');
  const totalPrice = document.getElementById('totalPrice');

  // List items
  let listHTML = '<ul>';
  shoppingList.items.forEach(item => {
    listHTML += `<li>${item.name} - ${item.price}</li>`;
  });
  listHTML += '</ul>';
  itemList.innerHTML = listHTML;

  // Display total price
  totalPrice.innerHTML = `Total price: ${shoppingList.total}`;
}

// Initialize page
updatePage();

// Event listener for the button
document.getElementById("newitem").addEventListener("click", function() {
  const newItem = document.querySelector(".inpStuff").value;
  const newPrice = parseInt(document.getElementById("inpPrice").value);

  // Add new item to the shoppingList object
  shoppingList.items.push({name: newItem, price: newPrice});

  // Update the page
  updatePage();

  // Optional: Clear the input fields
  document.querySelector(".inpStuff").value = "";
  document.getElementById("inpPrice").value = 0;
});
