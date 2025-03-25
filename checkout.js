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

    window.processPayment = function (method) {
        let totalAmount = document.getElementById("total-price").textContent;
        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();

        if (!name || !phone || !address) {
            alert("⚠️ Please fill in all required fields.");
            return;
        }

        let paymentLinks = {
            "gpay": `upi://pay?pa=merchant@upi&pn=ZeniaMed&mc=1234&tid=9876543210&tr=TXN1234&tn=Medicine%20Payment&am=${totalAmount}&cu=INR`,
            "paytm": `https://paytm.com/pay?pa=merchant@paytm&pn=ZeniaMed&am=${totalAmount}&cu=INR`,
            "amazonpay": `https://www.amazon.in/gp/payments/${totalAmount}`,
            "netbanking": `https://www.bankwebsite.com/netbanking?amount=${totalAmount}`,
            "lazypay": `https://lazypay.in/pay?amount=${totalAmount}`,
            "simpl": `https://getsimpl.com/pay?amount=${totalAmount}`,
            "cod": "Thank you! Your order will be delivered via Cash on Delivery."
        };

        if (method === "cod") {
            alert(paymentLinks[method]);
            placeOrder(name, phone, address, totalAmount, "Cash on Delivery");
        } else {
            window.location.href = paymentLinks[method];
            placeOrder(name, phone, address, totalAmount, method);
        }
    };

    function placeOrder(name, phone, address, totalAmount, paymentMethod) {
        let orderDetails = {
            customerName: name,
            phone: phone,
            address: address,
            items: cart,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            orderDate: new Date().toLocaleString(),
            status: "Order Placed"
        };

        localStorage.removeItem("cart");
        alert("✅ Order Placed Successfully!");
        window.location.href = "tracking.html";
    }
});
