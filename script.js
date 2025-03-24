document.addEventListener("DOMContentLoaded", function () {
    // Load cart items on page load
    loadCart();

    // Attach event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");

            if (!productCard) {
                alert("Error: Product card not found.");
                return;
            }

            let productNameElement = productCard.querySelector(".product-name");
            let productPriceElement = productCard.querySelector(".product-price");
            let productImageElement = productCard.querySelector("img");

            if (!productNameElement || !productPriceElement || !productImageElement) {
                alert("Error: Product details missing.");
                return;
            }

            let productName = productNameElement.innerText.trim();
            let productPrice = parseFloat(productPriceElement.innerText.replace("₹", "").trim());
            let productImage = productImageElement.src;

            if (!productName || isNaN(productPrice)) {
                alert("Error: Invalid product details.");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if item already exists in cart
            let existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} added to cart!`);
            loadCart();
        });
    });
});

// Function to update cart count
function loadCart() {
    let cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
