document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartContainer.innerHTML = ""; // Clear existing content

        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p><strong>${item.name}</strong> - ₹${item.price} x ${item.quantity}</p>
            `;
            cartContainer.appendChild(cartItem);
        });

        let checkoutButton = document.createElement("button");
        checkoutButton.innerText = "Go to Checkout";
        checkoutButton.classList.add("checkout-btn");
        checkoutButton.addEventListener("click", function () {
            alert("Proceeding to checkout!");
        });
        cartContainer.appendChild(checkoutButton);
    }
});
