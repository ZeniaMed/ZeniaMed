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
    }

    displayCart();

    window.updateQuantity = function (index, change) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    };

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Function to place an order
    function placeOrder() {
        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();
        let totalAmount = document.getElementById("total-price").textContent;

        if (!name || !phone || !address) {
            alert("⚠️ Please fill in all required fields.");
            return;
        }

        // Get a random location (for simulation)
        let latitude = 28.6139 + (Math.random() * 0.1);
        let longitude = 77.2090 + (Math.random() * 0.1);

        let orderData = {
            name,
            phone,
            address,
            total: totalAmount,
            status: "Order Placed",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            location: { lat: latitude, lng: longitude } // Initial order location
        };

        db.collection("orders").add(orderData).then((docRef) => {
            localStorage.removeItem("cart");
            alert("✅ Order Placed Successfully!");
            window.location.href = `tracking.html?orderId=${docRef.id}`;
        }).catch(error => {
            console.error("Error placing order: ", error);
        });
    }

    document.querySelector(".checkout-btn").addEventListener("click", placeOrder);
});
