// Search Form
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navMenu.classList.remove('active');
}
document.querySelector('#close-search').onclick = () => {
    searchForm.classList.remove('active');
}

// Mobile Menu
let navMenu = document.querySelector('.nav-menu');
document.querySelector('#menu-btn').onclick = () => {
    navMenu.classList.toggle('active');
    searchForm.classList.remove('active');
}

// Cart Sidebar
let cartSidebar = document.querySelector('.cart-sidebar');
document.querySelector('.cart-icon').onclick = () => {
    cartSidebar.classList.add('active');
}
document.querySelector('#close-cart').onclick = () => {
    cartSidebar.classList.remove('active');
}

// Products Data
const products = [
    {
        id: 1,
        name: "Jawline Whey Isolate",
        price: 8500,
        oldPrice: 10000,
        image: "https://unsplash.com/photos/black-plastic-bottle-and-two-canisters-VSX8y08N2RY"
    },
    {
        id: 2,
        name: "Shredder Creatine",
        price: 3200,
        oldPrice: 4000,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    },
    {
        id: 3,
        name: "V-Taper Pre-Workout",
        price: 4500,
        oldPrice: 5500,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
    },
    {
        id: 4,
        name: "Men's Physique Stack",
        price: 15000,
        oldPrice: 20000,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
    },
    {
        id: 5,
        name: "Aesthetic Shaker 700ml",
        price: 1200,
        oldPrice: 1500,
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400"
    },
    {
        id: 6,
        name: "Sharp Cuts Fat Burner",
        price: 5500,
        oldPrice: 7000,
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400"
    }
];

// Load Products
const productContainer = document.querySelector('.product-container');
function loadProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">Rs. ${product.price} <span>Rs. ${product.oldPrice}</span></div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add To Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}
loadProducts();

// Cart Functionality
let cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('#cart-total');

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
    cartSidebar.classList.add('active');
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="item-price">Rs. ${item.price} x ${item.quantity}</div>
            </div>
            <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartCount.textContent = count;
    cartTotal.textContent = `Rs. ${total}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Deal Timer - Ends at 5 AM Fajr
function updateTimer() {
    const now = new Date();
    const fajr = new Date();
    fajr.setHours(5, 0, 0, 0);
    if (now > fajr) fajr.setDate(fajr.getDate() + 1);
    
    const diff = fajr - now;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// Checkout
document.querySelector('.checkout-btn').onclick = () => {
    if (cart.length === 0) {
        alert('Cart is empty. first add some items. 😂');
    } else {
        alert('Order confirmed! will be dilverd soon. 💪');
        cart = [];
        updateCart();
        cartSidebar.classList.remove('active');
    }
}

// Navbar scroll effect
window.onscroll = () => {
    searchForm.classList.remove('active');
    navMenu.classList.remove('active');
}
