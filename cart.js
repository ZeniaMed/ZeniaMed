document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".cart-container");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty 🛒</p>";
        return;
    }

    cartContainer.innerHTML = `<div class="cart-items"></div>`;
    const cartItemsContainer = document.querySelector(".cart-items");

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-index="${index}">❌ Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    let checkoutButton = document.createElement("button");
    checkoutButton.innerText = "🛒 Proceed to Checkout";
    checkoutButton.classList.add("checkout-btn");
    checkoutButton.addEventListener("click", function () {
        alert("Proceeding to checkout!");
    });
    cartContainer.appendChild(checkoutButton);

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
});
