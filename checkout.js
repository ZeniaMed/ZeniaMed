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
        displayCart();
    };

    document.querySelector(".checkout-btn").addEventListener("click", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let address = document.getElementById("address").value.trim();
        let selectedAddress = document.getElementById("saved-addresses").value;

        if (!name || !phone || (!address && !selectedAddress)) {
            alert("⚠️ Please fill in all required fields.");
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

        alert("✅ Order Placed Successfully!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

    document.getElementById("save-address").addEventListener("click", function () {
        let newAddress = document.getElementById("address").value.trim();
        if (newAddress) {
            let savedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
            savedAddresses.push(newAddress);
            localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
            alert("🏠 Address Saved Successfully!");
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

    // ✅ Handle Payment Clicks and Redirection
    document.querySelectorAll(".payment-option").forEach(option => {
        option.addEventListener("click", function () {
            let paymentMethod = this.getAttribute("data-upi");
            let amount = totalPrice.textContent.replace("₹", "");

            switch (paymentMethod) {
                case "googlepay":
                    window.location.href = `upi://pay?pa=yourupi@okhdfcbank&pn=ZeniaMed&mc=1234&tid=TXN${Date.now()}&tr=ORDER${Date.now()}&tn=ZeniaMed Payment&am=${amount}&cu=INR`;
                    break;
                case "paytm":
                    window.open("https://paytm.com", "_blank");
                    break;
                case "amazonpay":
                    window.open("https://www.amazon.in/gp/aws/cart/add.html", "_blank");
                    break;
                case "netbanking":
                    window.open("https://www.yourbank.com/netbanking", "_blank");
                    break;
                case "lazypay":
                    window.open("https://www.lazypay.in/", "_blank");
                    break;
                case "simpl":
                    window.open("https://www.getsimpl.com/", "_blank");
                    break;
                case "cod":
                    alert("💰 You have selected Cash on Delivery. Your order will be processed.");
                    break;
                default:
                    alert("⚠️ Payment method not available.");
            }
        });
    });
});

// ✅ Firebase Integration (Order Saving)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvjzms_g3GAfpSspsstO36A7eal7fuD7I",
    authDomain: "zeniamed.firebaseapp.com",
    projectId: "zeniamed",
    storageBucket: "zeniamed.appspot.com",
    messagingSenderId: "795153300011",
    appId: "1:795153300011:web:bda2f2edd0cfe451b2486e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Function to save order in Firebase
async function placeOrder() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let total = document.getElementById("total-price").textContent.replace("₹", "");

    try {
        await addDoc(collection(db, "orders"), {
            name: name,
            phone: phone,
            address: address,
            total: total,
            status: "Order Placed",
            timestamp: serverTimestamp()
        });

        alert("✅ Order Placed Successfully!");
        window.location.href = "tracking.html"; // Redirect to tracking page
    } catch (error) {
        console.error("Error placing order: ", error);
    }
}

// Attach function to "Place Order" button
document.querySelector(".checkout-btn").addEventListener("click", placeOrder);
