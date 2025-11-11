window.onload = function() {
  const menus = ['mainMenu', 'addonsMenu', 'dessertMenu', 'drinksMenu'];
  let currentIndex = 0;
  let cart = [];
  let orderType = "";

  const cartItems = document.getElementById('cartItems');
  const dineInBtn = document.getElementById('dineInBtn');
  const takeOutBtn = document.getElementById('takeOutBtn');
  const orderTypeText = document.getElementById('orderType');

  // FRONT PAGE BUTTONS
  dineInBtn.addEventListener('click', () => startOrder("Dine In"));
  takeOutBtn.addEventListener('click', () => startOrder("Take Out"));

  function startOrder(type) {
    orderType = type;
    orderTypeText.textContent = type;
    document.getElementById('frontPage').classList.add('hidden');
    document.getElementById('navBar').classList.remove('hidden');
    document.getElementById('cartSection').classList.remove('hidden');
    showMenu(currentIndex);
  }

  // NAVIGATION BUTTONS
  document.getElementById('mainBtn').onclick = () => goToMenu(0);
  document.getElementById('addonsBtn').onclick = () => goToMenu(1);
  document.getElementById('dessertBtn').onclick = () => goToMenu(2);
  document.getElementById('drinksBtn').onclick = () => goToMenu(3);

  function goToMenu(index) {
    currentIndex = index;
    showMenu(currentIndex);
  }

  function showMenu(index) {
    menus.forEach((id, i) => {
      document.getElementById(id).classList.toggle('hidden', i !== index);
    });
  }

  // ADD ITEM TO CART
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.name;
      const price = parseFloat(item.dataset.price);
      cart.push({ name, price });
      renderCart();
    });
  });

  function renderCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `${item.name} - ₱${item.price}`;
      cartItems.appendChild(div);
    });
  }

  // CHECKOUT
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert("No items in cart!");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`✅ Checkout complete!\nOrder Type: ${orderType}\nTotal: ₱${total}`);
    cart = [];
    renderCart();
  });

  // CANCEL ORDER
  document.getElementById('cancelBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert("No active order to cancel.");
    } else {
      if (confirm("Are you sure you want to cancel your order?")) {
        cart = [];
        renderCart();
        alert("❌ Order cancelled.");
      }
    }
  });

  // BACK AND NEXT BUTTONS
  document.querySelectorAll('.backBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showMenu(currentIndex);
      } else {
        alert("You're at the first menu.");
      }
    });
  });

  document.querySelectorAll('.nextBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentIndex < menus.length - 1) {
        currentIndex++;
        showMenu(currentIndex);
      } else {
        alert("You’ve reached the last menu.");
      }
    });
  });
};
