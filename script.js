document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("category-title")) {
        loadCategory();
    }
    if (document.getElementById("cart-items")) {
        loadCart();
    }
    if (document.getElementById("checkout-summary")) {
        loadCheckout();
    }
});

// Medicine data
const medicines = {
    "Diabetes": ["Metformin", "Insulin"],
    "Cardiac": ["Aspirin", "Atorvastatin"],
    "Stomach": ["Antacid", "Omeprazole"],
    "Sexual Wellness": ["Viagra", "Condom"],
    "Oral Care": ["Toothpaste", "Mouthwash"],
    "Liver Care": ["Liv 52", "Essentiale"],
    "Pain Relievers": ["Paracetamol", "Ibuprofen"],
    "Cold and Immunity": ["Vitamin C", "Cough Syrup"],
    "Elderly Care": ["Calcium", "Multivitamins"],
    "Respiratory": ["Inhaler", "Nasal Spray"]
};

// Load category
function loadCategory() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    document.getElementById("category-title").innerText = category;
    
    const list = document.getElementById("medicine-list");
    medicines[category].forEach(med => {
        const div = document.createElement("div");
        div.innerHTML = `${med} - ₹100 <button onclick="addToCart('${med}')">Add to Cart</button>`;
        list.appendChild(div);
    });
}

// Add to Cart
function addToCart(medicine) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: medicine, price: 100 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${medicine} added to cart!`);
}

// Load Cart
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        cartHTML += `<p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
        total += item.price;
    });

    document.getElementById("cart-items").innerHTML = cartHTML;
    document.getElementById("total-price").innerText = total;
    document.getElementById("grand-total").innerText = total;
}

// Remove from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Apply Discount
function applyDiscount() {
    let discount = 50;
    document.getElementById("discount-amount").innerText = discount;
    document.getElementById("grand-total").innerText = parseInt(document.getElementById("total-price").innerText) - discount;
}

// Load Checkout
function loadCheckout() {
    document.getElementById("checkout-summary").innerText = localStorage.getItem("cart");
    document.getElementById("final-total").innerText = document.getElementById("grand-total").innerText;
}

// Complete Order
function completeOrder() {
    alert("Order placed successfully!");
    localStorage.clear();
    window.location.href = "index.html";
}
