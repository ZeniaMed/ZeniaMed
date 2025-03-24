document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.querySelector("#cart-items tbody");
    let totalPriceElement = document.getElementById("total-price");

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let totalAmount = 0;

        cart.forEach((item, index) => {
            let totalItemPrice = item.price * item.quantity;
            totalAmount += totalItemPrice;

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${item.image}" alt="${item.name}" class="cart-item-img"></td>
                <td>${item.name}</td>
                <td>
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>₹${item.price}</td>
                <td>₹${totalItemPrice}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceElement.textContent = totalAmount;
    }

    window.updateQuantity = function(index, change) {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        }
    };

    updateCart();

    // Coupon Apply Feature
    document.getElementById("apply-coupon-btn").addEventListener("click", function () {
        let coupon = document.getElementById("coupon-code").value;
        if (coupon === "DISCOUNT50") {
            document.getElementById("discount-amount").textContent = "50";
            totalPriceElement.textContent = totalPriceElement.textContent - 50;
        } else {
            alert("Invalid Coupon Code!");
        }
    });

    // Add New Address Feature
    document.getElementById("add-new-address-btn").addEventListener("click", function () {
        document.getElementById("new-address-form").style.display = "block";
    });

    document.getElementById("save-address-btn").addEventListener("click", function () {
        let newAddress = document.getElementById("new-address").value;
        if (newAddress.trim() !== "") {
            document.getElementById("saved-address").textContent = newAddress;
            document.getElementById("new-address-form").style.display = "none";
        }
    });

    // Place Order Button
    document.getElementById("place-order-btn").addEventListener("click", function () {
        alert("Order Placed Successfully! ✅");
        localStorage.removeItem("cart");
        window.location.href = "index.html"; // Redirect to home
    });
});
