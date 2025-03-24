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
                        <span class="item-qty">${item.quantity}</span>
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
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

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

    loadSavedAddresses();

    // ✅ Payment Mode Handling: Redirect to UPI/Wallets
    document.querySelectorAll(".payment-option").forEach(option => {
        option.addEventListener("click", function () {
            let paymentMethod = this.getAttribute("data-method");

            let upiLink = "";
            switch (paymentMethod) {
                case "gpay":
                    upiLink = "upi://pay?pa=yourmerchant@okhdfcbank&pn=ZeniaMed&cu=INR";
                    break;
                case "paytm":
                    upiLink = "https://paytm.com";
                    break;
                case "amazonpay":
                    upiLink = "https://www.amazon.in/gp/aws/cart/add.html";
                    break;
                case "netbanking":
                    upiLink = "https://netbanking.example.com";
                    break;
                case "lazypay":
                    upiLink = "https://www.lazypay.in/";
                    break;
                case "simpl":
                    upiLink = "https://www.getsimpl.com/";
                    break;
                case "cod":
                    alert("You have selected Cash on Delivery. Proceeding to Order Confirmation.");
                    return;
                default:
                    alert("Payment method not available.");
                    return;
            }

            window.open(upiLink, "_blank");
        });
    });
});
