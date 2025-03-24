document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
    } else {
        cartItemsContainer.innerHTML = "";  // Clear existing content
        cart.forEach((item, index) => {
            let cartItem = document.createElement("tr");
            cartItem.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${item.image}" alt="${item.name}" class="checkout-img"></td>
                <td>${item.name}</td>
                <td>
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>₹${item.price}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = totalAmount.toFixed(2);
    }

    document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Order Placed Successfully! ✅");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
});

// ✅ Fix Quantity Update on Checkout Page
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();  // Refresh the page to show updates
}
