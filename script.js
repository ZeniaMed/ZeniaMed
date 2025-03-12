document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (category) {
        document.getElementById("categoryTitle").textContent = category;
        loadProducts(category);
    }

    updateCartDisplay();
});

const products = {
    "Sexual Wellness": [
        { name: "Viagra", price: 100 },
        { name: "Condom", price: 100 }
    ],
    "Diabetes": [
        { name: "Metformin", price: 200 },
        { name: "Insulin", price: 500 }
    ]
};

function loadProducts(category) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    if (products[category]) {
        products[category].forEach((product, index) => {
            const productItem = document.createElement("div");
            productItem.innerHTML = `
                <p>${product.name} - ₹${product.price} 
                <button onclick="addToCart('${category}', ${index})">Add to Cart</button></p>
            `;
            productList.appendChild(productItem);
        });
    }
}

function addToCart(category, productIndex) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products[category][productIndex];

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (cartItems && cartTotal) {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let itemElement = document.createElement("p");
            itemElement.innerHTML = `${item.name} - ₹${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        cartTotal.innerHTML = `<h2>Total: ₹${total}</h2>`;
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function applyDiscount() {
    let discountCode = document.getElementById("discountCode").value;
    let total = JSON.parse(localStorage.getItem("cart")).reduce((sum, item) => sum + item.price, 0);

    if (discountCode === "SAVE10") {
        total *= 0.9;
        alert("10% discount applied!");
    }

    document.getElementById("cartTotal").innerHTML = `<h2>Total: ₹${total.toFixed(2)}</h2>`;
}

function checkout() {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
