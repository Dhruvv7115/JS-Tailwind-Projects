document.addEventListener('DOMContentLoaded', () => {
  let products = [
    { id: 1, name: 'Product 1', price: 59.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.999 },
  ];

  const productsList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const emptyCartMsg = document.getElementById('empty-cart');
  const cartTotalDisplay = document.getElementById('cart-total');
  const totalPriceDisplay = document.getElementById('total-price');
  const checkoutBtn = document.getElementById('checkout-btn');

  let cart = JSON.parse(localStorage.getItem('cart-items')) || [];

  renderCart(cart);

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
    <span>
    ${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productsList.appendChild(productDiv);
  });

  productsList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON'){
      const productId = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);

      const newCartItem = {
        id: Date.now(),
        name: product.name,
        price: product.price
      }

      addToCart(newCartItem);
    }
  });

  cartItems.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
      const cartItemId = parseInt(e.target.getAttribute('data-id'));
      removeFromCart(cartItemId);
    }
  });

  function addToCart(cartItem){
    cart.push(cartItem);
    saveToLocalStorage();
    renderCart(cart);
  }

  function removeFromCart(itemId){
    cart = cart.filter(item => item.id !== itemId);
    saveToLocalStorage();
    renderCart(cart);
  }

  function renderCart(cart){
    cartItems.textContent = '';

    let totalPrice = 0;

    if(cart.length > 0){ 
      emptyCartMsg.classList.add('hidden')
      cartTotalDisplay.classList.remove('hidden');

      cart.forEach(item => {
        totalPrice += Number(item.price);
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart');
        cartItemDiv.setAttribute('data-id', `${item.id}`)
        cartItemDiv.innerHTML = `
        <span>
          ${item.name} - $${item.price.toFixed(2)}
        </span>
        <button data-id="${item.id}">
          Remove
        </button>`;
        cartItems.appendChild(cartItemDiv);
      });
      totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;
      
    }else {
      if(emptyCartMsg.classList.contains('hidden')){
        emptyCartMsg.classList.remove('hidden');
      }
      cartTotalDisplay.classList.add('hidden');
    }
  }

  function saveToLocalStorage(){
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }

  checkoutBtn.addEventListener('click', () => {
    alert('Your order has been placed.')
    cart.length = 0;
    renderCart(cart);
  });

})