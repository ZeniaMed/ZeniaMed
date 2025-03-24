document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutItemsContainer = document.getElementById("checkout-items");
    let totalPriceElement = document.getElementById("total-price");

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
    } else {
        let totalAmount = 0;
        cart.forEach((item, index) => {
            let totalItemPrice = item.price * item.quantity;
            totalAmount += totalItemPrice;

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${item.image}" class="checkout-img" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${totalItemPrice}</td>
            `;
            checkoutItemsContainer.appendChild(row);
        });

        totalPriceElement.textContent = totalAmount;
    }

    // Manage Address
    let savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    let addressSelect = document.getElementById("saved-address");
    savedAddresses.forEach(address => {
        let option = document.createElement("option");
        option.value = address;
        option.textContent = address;
        addressSelect.appendChild(option);
    });

    document.getElementById("add-new-address").addEventListener("click", function () {
        document.getElementById("new-address-form").style.display = "block";
    });

    document.getElementById("save-address").addEventListener("click", function () {
        let fullName = document.getElementById("full-name").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let fullAddress = `${fullName}, ${phone}, ${address}`;

        savedAddresses.push(fullAddress);
        localStorage.setItem("addresses", JSON.stringify(savedAddresses));

        let option = document.createElement("option");
        option.value = fullAddress;
        option.textContent = fullAddress;
        addressSelect.appendChild(option);

        alert("Address Saved!");
        document.getElementById("new-address-form").reset();
        document.getElementById("new-address-form").style.display = "none";
    });

    // Apply Coupon
    document.getElementById("apply-coupon").addEventListener("click", function () {
        let couponCode = document.getElementById("coupon-code").value;
        if (couponCode === "DISCOUNT10") {
            let newTotal = parseFloat(totalPriceElement.textContent) * 0.9;
            totalPriceElement.textContent = newTotal.toFixed(2);
            alert("Coupon Applied! 10% Discount Applied.");
        } else {
            alert("Invalid Coupon Code!");
        }
    });

    // Place Order
    document.getElementById("place-order").addEventListener("click", function () {
        let selectedPayment = document.querySelector("input[name='payment-method']:checked");
        if (!selectedPayment) {
            alert("Please select a payment method!");
            return;
        }

        let selectedAddress = document.getElementById("saved-address").value;
        if (!selectedAddress) {
            alert("Please select or add a delivery address!");
            return;
        }

        alert("Order Placed Successfully! ✅");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
});
