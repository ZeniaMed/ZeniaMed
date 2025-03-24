document.addEventListener("DOMContentLoaded", function () {
    // Load cart items on page load
    loadCart();

    // Attach event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let productName = productCard.querySelector(".product-name").innerText;
            let productPrice = productCard.querySelector(".product-price").innerText.replace("₹", "").trim();
            let productImage = productCard.querySelector("img").src; // Get product image

            if (!productName || !productPrice) {
                alert("Error: Missing product details.");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if item already exists in cart
            let existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1, image: productImage });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} added to cart!`);
            loadCart();
        });
    });
});

function loadCart() {
    let cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
