document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
            totalPrice.textContent = "0.00";
            return;
        }

        cartItemsContainer.innerHTML = "";  // Clear previous content
        let totalAmount = 0;

        cart.forEach((item, index) => {
            let itemTotal = (item.price * item.quantity).toFixed(2);
            totalAmount += parseFloat(itemTotal);

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
                <td>₹${itemTotal}</td>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPrice.textContent = totalAmount.toFixed(2);
    }

    // ✅ Function to Update Quantity Dynamically
    window.updateQuantity = function (index, change) {
        if (cart[index].quantity + change <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity += change;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Refresh cart without reloading the page
    };

    renderCart(); // Initial render

    // ✅ Handle Order Placement
    document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Order Placed Successfully! ✅");
        localStorage.removeItem("cart"); // Clear cart after order placement
        window.location.href = "index.html"; // Redirect to home page
    });

    // ✅ Handle Payment Redirection
    document.querySelectorAll(".payment-option").forEach(option => {
        option.addEventListener("click", function () {
            const method = this.getAttribute("data-upi");
            let upiLinks = {
                "googlepay": "upi://pay?pa=your-vpa@okhdfcbank&pn=ZeniaMed&mc=1234&tid=123456&tr=order123&tn=Medicine%20Payment&am=" + totalPrice.textContent + "&cu=INR",
                "paytm": "https://paytm.com",
                "amazonpay": "https://www.amazon.in/gp/aws/cart/add.html",
                "netbanking": "https://netbanking.example.com",
                "lazypay": "https://lazypay.in",
                "simpl": "https://getsimpl.com",
                "cod": "#"
            };

            if (upiLinks[method] === "#") {
                alert("Cash on Delivery selected. Your order will be placed!");
            } else {
                window.location.href = upiLinks[method]; // Redirect to respective payment
            }
        });
    });
});
