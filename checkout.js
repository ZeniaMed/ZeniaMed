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
        
        let upiId = "merchant@upi"; // Apna UPI ID yaha dalein
        let qrCodeImage = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=upi://pay?pa=${upiId}&pn=ZeniaMed&am=${totalAmount}&cu=INR`;

        let paymentLinks = {
            "gpay": `upi://pay?pa=${upiId}&pn=ZeniaMed&am=${totalAmount}&cu=INR`,
            "paytm": `https://paytm.com/pay?pa=${upiId}&am=${totalAmount}&cu=INR`,
            "amazonpay": `https://www.amazon.in/gp/payments/${totalAmount}`,
            "netbanking": `https://www.bankwebsite.com/netbanking?amount=${totalAmount}`,
            "lazypay": `https://lazypay.in/pay?amount=${totalAmount}`,
            "simpl": `https://getsimpl.com/pay?amount=${totalAmount}`,
            "cod": "Thank you! Your order will be delivered via Cash on Delivery."
        };

        if (method === "cod") {
            alert(paymentLinks[method]);
        } else if (method === "gpay" || method === "paytm") {
            document.getElementById("qr-code").src = qrCodeImage;
            alert(`Scan the QR Code to complete payment of ₹${totalAmount}`);
        } else {
            window.location.href = paymentLinks[method];
        }
    };
});
