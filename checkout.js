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

    window.updateQuantity = function (index, change) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart[index].quantity += change;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        if (cart.length > 0 && cart[index]) {
            document.getElementById(`qty-${index}`).textContent = cart[index].quantity;
            document.getElementById(`total-${index}`).textContent = `₹${(cart[index].price * cart[index].quantity).toFixed(2)}`;
        } else {
            displayCart();
        }

        let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = `₹${totalAmount.toFixed(2)}`;
    };

    document.querySelector(".checkout-btn").addEventListener("click", function () {
        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();

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

        let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let order = {
            customerName: name,
            phoneNumber: phone,
            address: address,
            items: cart.map(item => ({ name: item.name, quantity: item.quantity })), // Store only name & quantity
            totalAmount: totalAmount,
            date: new Date().toLocaleString()
        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert("🎉 Order placed successfully! You will receive an update soon.");

        localStorage.removeItem("cart");

        window.location.href = "admin.html";  // Redirect to admin page to see the order
    });

});
