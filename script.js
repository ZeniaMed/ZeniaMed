document.addEventListener("DOMContentLoaded", function() {
    const categories = [
        "Diabetes", "Cardiac", "Stomach", "Sexual Wellness", "Oral Care",
        "Liver Care", "Pain Relievers", "Cold and Immunity", "Elderly Care", "Respiratory"
    ];

    const categoryContainer = document.getElementById("categories");

    categories.forEach(category => {
        let div = document.createElement("div");
        div.classList.add("category");
        div.textContent = category;
        div.onclick = () => addToCart(category); // Now clicking a category adds it to cart
        categoryContainer.appendChild(div);
    });

    updateCartDisplay(); // Ensure cart is updated on page load
});

// Shopping cart logic
let cart = {
    total: 0,
    discount: 0,
    appliedCoupon: false
};

// Example function to simulate adding a product to the cart
function addToCart(category) {
    let productPrice = Math.floor(Math.random() * 500) + 100; // Random price between ₹100-₹600
    cart.total += productPrice;
    updateCartDisplay();
    alert(`${category} added to cart for ₹${productPrice}`);
}

// Function to update cart display
function updateCartDisplay() {
    document.getElementById("total-price").textContent = `₹${cart.total}`;
    document.getElementById("discount").textContent = `₹${cart.discount}`;
    document.getElementById("grand-total").textContent = `₹${cart.total - cart.discount}`;
}

// Function to apply coupon
function applyCoupon() {
    if (cart.appliedCoupon) {
        alert("Coupon already applied!");
        return;
    }

    if (cart.total === 0) {
        alert("Your cart is empty! Add items before applying a coupon.");
        return;
    }

    let discountAmount = 50; // Fixed ₹50 discount
    cart.discount = discountAmount;
    cart.appliedCoupon = true;
    updateCartDisplay();
    alert(`Coupon Applied! ₹${discountAmount} discount added.`);
}

// Checkout function
function checkout() {
    if (cart.total === 0) {
        alert("Your cart is empty! Add some products before checking out.");
        return;
    }

    alert(`Proceeding to checkout...\nTotal Amount: ₹${cart.total - cart.discount}`);
}

// Function to refresh order status
function refreshStatus() {
    let statuses = ["Preparing Order", "Out for Delivery", "Arriving Soon"];
    document.getElementById("order-status").textContent = statuses[Math.floor(Math.random() * statuses.length)];
}
