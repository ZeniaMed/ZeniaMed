document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    // Function to Display Cart Items in Checkout
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

    displayCart(); // Call Function to Show Cart Items

    // Function to Update Quantity
    window.updateQuantity = function (index, change) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // Refresh cart without reloading
    };

    // Handle Order Placement
    document.querySelector(".checkout-btn").addEventListener("click", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();
        let selectedAddress = document.getElementById("saved-addresses").value;

        if (!name || !phone || (!address && !selectedAddress)) {
            alert("Please fill in all required fields.");
            return;
        }

        let finalAddress = address ? address : selectedAddress;
        let orderDetails = {
            customerName: name,
            phone: phone,
            address: finalAddress,
            items: cart,
            totalAmount: document.getElementById("total-price").textContent,
            orderDate: new Date().toLocaleString()
        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(orderDetails);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order Placed Successfully! ✅");
        localStorage.removeItem("cart"); // Clear Cart
        window.location.href = "index.html"; // Redirect to Home Page
    });

    // Handle Saved Address Storage
    document.getElementById("save-address").addEventListener("click", function () {
        let newAddress = document.getElementById("address").value.trim();
        if (newAddress) {
            let savedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
            savedAddresses.push(newAddress);
            localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
            alert("Address Saved Successfully!");
            loadSavedAddresses();
        }
    });

    // Load Saved Addresses
    function loadSavedAddresses() {
        let savedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
        let savedAddressesDropdown = document.getElementById("saved-addresses");
        savedAddressesDropdown.innerHTML = "<option value=''>Select a saved address</option>";
        savedAddresses.forEach(address => {
            let option = document.createElement("option");
            option.value = address;
            option.textContent = address;
            savedAddressesDropdown.appendChild(option);
        });
    }

    loadSavedAddresses(); // Load saved addresses on page load
});
