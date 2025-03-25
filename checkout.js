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

    // ✅ Payment Links Mapping
    const paymentLinks = {
        googlepay: "upi://pay?pa=YOUR_UPI_ID@upi&pn=ZeniaMed&am=500&cu=INR",
        paytm: "https://paytm.com/link-to-payment",
        amazonpay: "https://www.amazon.in/gp/pay",
        netbanking: "https://razorpay.com/payment-link",
        lazypay: "https://www.lazypay.in/",
        simpl: "https://www.getsimpl.com/",
        cod: "COD" // Special case for Cash on Delivery
    };

    // ✅ Redirect to Payment Page on Click
    document.querySelectorAll(".payment-option").forEach(option => {
        option.addEventListener("click", function () {
            const paymentMethod = this.getAttribute("data-upi");

            if (paymentMethod === "cod") {
                alert("You have selected Cash on Delivery. No payment needed now.");
            } else {
                window.location.href = paymentLinks[paymentMethod];
            }
        });
    });

    // ✅ "Place Order" Button Functionality
    document.querySelector(".checkout-btn").addEventListener("click", function () {
        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();

        // 🛑 Validate Name, Phone, and Address
        if (name === "" || phone === "" || address === "") {
            alert("⚠️ Please fill in all the shipping details.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("⚠️ Please enter a valid 10-digit phone number.");
            return;
        }

        if (cart.length === 0) {
            alert("⚠️ Your cart is empty! Add items before placing an order.");
            return;
        }

        // ✅ Order Success Message
        alert("🎉 Order placed successfully! You will receive an update soon.");

        // 🟢 Clear Cart After Order
        localStorage.removeItem("cart");

        // 🔄 Redirect to Order Tracking Page (Change to your tracking page)
        window.location.href = "tracking.html";
    });

});
