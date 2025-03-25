document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    function displayCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
        } else {
            cartItemsContainer.innerHTML = "";  
            cart.forEach((item, index) => {
                let cartItem = document.createElement("tr");
                cartItem.innerHTML = `
                    <td>${index + 1}</td>
                    <td><img src="${item.image}" alt="${item.name}" class="checkout-img"></td>
                    <td>${item.name}</td>
                    <td>
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span id="qty-${index}">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </td>
                    <td>₹${item.price}</td>
                    <td id="total-${index}">₹${(item.price * item.quantity).toFixed(2)}</td>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalPrice.textContent = `₹${totalAmount.toFixed(2)}`;
        }
    }

    displayCart();

    // ✅ Real-time Quantity Update
    window.updateQuantity = function (index, change) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart[index].quantity += change;

        // 🛑 If quantity is 0, remove the item
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // 🟢 **Update Only Affected Elements Instead of Refreshing**
        if (cart.length > 0 && cart[index]) {
            document.getElementById(`qty-${index}`).textContent = cart[index].quantity;
            document.getElementById(`total-${index}`).textContent = `₹${(cart[index].price * cart[index].quantity).toFixed(2)}`;
        } else {
            displayCart(); // Refresh if item removed
        }

        // 🟢 Update Total Amount
        let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = `₹${totalAmount.toFixed(2)}`;
    };
});
