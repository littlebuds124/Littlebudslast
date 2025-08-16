function loadCartUI(containerId, totalId, whatsappBtnId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById(containerId);
  const totalDiv = document.getElementById(totalId);
  const whatsappBtn = document.getElementById(whatsappBtnId);

  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <span>Rs. ${item.price.toLocaleString()}</span>
      <button class="remove-btn" onclick="removeItem(${index}, '${containerId}', '${totalId}', '${whatsappBtnId}')">Remove</button>
    `;
    container.appendChild(div);
  });

  totalDiv.textContent = cart.length
    ? `Total: Rs. ${total.toLocaleString()}`
    : 'Your cart is empty.';

  if (cart.length) {
    let message = "Hi! I'd like to order the following items from Little Buds:%0A%0A";
    cart.forEach(item => {
      message += `• ${item.name} - Rs. ${item.price.toLocaleString()}%0A`;
    });
    message += `%0ATotal: Rs. ${total.toLocaleString()}`;
    whatsappBtn.href = "https://wa.me/94779552234?text=" + message;
    whatsappBtn.style.display = "block";
  } else {
    whatsappBtn.style.display = "none";
  }
}

function removeItem(index, containerId, totalId, whatsappBtnId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartUI(containerId, totalId, whatsappBtnId);
  updateCartCount('cart-count');
}

function updateCartCount(elementId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = cart.length;
  }
}

<script src="js/cart.js"></script>
<script>
  loadCartUI('cart-container', 'total-price', 'send-whatsapp');
  updateCartCount('cart-count');
</script>