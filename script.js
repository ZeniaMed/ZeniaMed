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
        div.onclick = () => alert(`Showing products for ${category}`);
        categoryContainer.appendChild(div);
    });
});

// Shopping cart logic
let cart = {
    total: 0,
    discount: 0
};

function updateCartDisplay() {
    document.getElementById("total-price").textContent = `₹${cart.total}`;
    document.getElementById("discount").textContent = `₹${cart.discount}`;
    document.getElementById("grand-total").textContent = `₹${cart.total - cart.discount}`;
}

function applyCoupon() {
    let discountAmount = 50; // Example discount in ₹
    cart.discount = discountAmount;
    updateCartDisplay();
    alert(`Coupon Applied! ₹${discountAmount} discount added.`);
}

function checkout() {
    alert(`Proceeding to checkout...\nTotal Amount: ₹${cart.total - cart.discount}`);
}

function refreshStatus() {
    let statuses = ["Preparing Order", "Out for Delivery", "Arriving Soon"];
    document.getElementById("order-status").textContent = statuses[Math.floor(Math.random() * statuses.length)];
}
