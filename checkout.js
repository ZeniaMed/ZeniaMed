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
                cartItem.innerHTML = 
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
                ;
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

            switch (paymentMethod) {
                case "googlepay":
                    window.location.href = "https://pay.google.com/intl/en_in/about/"; // Replace with actual UPI ID
                    break;
                case "paytm":
                    window.open("https://paytm.com", "_blank");
                    break;
                case "amazonpay":
                    window.open("https://www.amazon.in/gp/aws/cart/add.html", "_blank");
                    break;
                case "netbanking":
                    window.open("https://www.yourbank.com/netbanking", "_blank"); // Replace with actual net banking URL
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
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBvjzms_g3GAfpSspsstO36A7eal7fuD7I",
    authDomain: "zeniamed.firebaseapp.com",
    projectId: "zeniamed",
    storageBucket: "zeniamed.firebasestorage.app",
    messagingSenderId: "795153300011",
    appId: "1:795153300011:web:bda2f2edd0cfe451b2486e",
    measurementId: "G-7Y0JNRYVDB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
// Firebase Configuration (Paste your own config here)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to save order details in Firestore
function placeOrder() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let totalPrice = document.getElementById("total-price").innerText;

    // Create an order object
    let orderData = {
        name: name,
        phone: phone,
        address: address,
        total: totalPrice,
        status: "Order Placed",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firestore
    db.collection("orders").add(orderData).then(() => {
        alert("Order Placed Successfully!");
        window.location.href = "tracking.html"; // Redirect to tracking page
    }).catch(error => {
        console.error("Error placing order: ", error);
    });
}

// Attach the function to the "Place Order" button
document.querySelector(".checkout-btn").addEventListener("click", placeOrder);
