document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = totalAmount;
    }

    // Handle Form Submission
    document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Order Placed Successfully! ✅");
        localStorage.removeItem("cart"); // Clear cart after order placement
        window.location.href = "index.html"; // Redirect to home page
    });
});
