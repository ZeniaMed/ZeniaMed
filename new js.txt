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

function applyCoupon() {
    alert("Coupon Applied! Discount updated.");
}

function checkout() {
    alert("Proceeding to checkout...");
}

function refreshStatus() {
    let statuses = ["Preparing Order", "Out for Delivery", "Arriving Soon"];
    document.getElementById("order-status").textContent = statuses[Math.floor(Math.random() * statuses.length)];
}
