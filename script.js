const mainMenu = document.getElementById("mainMenu");
const addonsMenu = document.getElementById("addonsMenu");
const dessertMenu = document.getElementById("dessertMenu");
const drinksMenu = document.getElementById("drinksMenu");
const cartItems = document.getElementById("cartItems");
const checkoutBtn = document.getElementById("checkoutBtn");

// --- Step 1: Main dish clicked ---
mainMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    addToCart(e.target);
    mainMenu.classList.add("hidden");
    addonsMenu.classList.remove("hidden");
  }
});

// --- Step 2: Add-on clicked ---
addonsMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    addToCart(e.target);
    addonsMenu.classList.add("hidden");
    dessertMenu.classList.remove("hidden");
  }
});

// --- Step 3: Dessert clicked ---
dessertMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    addToCart(e.target);
    dessertMenu.classList.add("hidden");
    drinksMenu.classList.remove("hidden");
  }
});

// --- Step 4: Drink clicked ---
drinksMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    addToCart(e.target);
    drinksMenu.classList.add("hidden");
    alert("✅ Order complete! Review your cart below.");
  }
});

// --- Add item to cart ---
function addToCart(item) {
  const name = item.dataset.name.trim();
  const price = parseFloat(item.dataset.price).toFixed(2);
  const div = document.createElement("div");
  div.textContent = `${name} - $${price}`;
  cartItems.appendChild(div);
}

// Optional: Restart order when checkout is clicked
checkoutBtn.addEventListener("click", () => {
  alert("Thank you! Starting a new order...");
  cartItems.innerHTML = "";
  drinksMenu.classList.add("hidden");
  dessertMenu.classList.add("hidden");
  addonsMenu.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});
