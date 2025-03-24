document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "DAILYGLIM M1 FORTE", price: 85 },
        { name: "DAILYGLIM M2", price: 95 },
        { name: "DAILYGLIM PM 2", price: 95 },
        { name: "DEBIGLIP 50M", price: 160 },
        { name: "DEBIGLIP M FORTE", price: 230 },
        { name: "DEBISTAL 500 SR", price: 34.5 },
        { name: "DEBISTAL GM2", price: 95 },
        { name: "DEBISTAL M2 FORTE", price: 90 },
        { name: "GM SR 1", price: 64.37 },
        { name: "GM SR 2", price: 80.52 }
    ];

    const medicineList = document.querySelector(".medicine-list");

    medicines.forEach(med => {
        let medItem = document.createElement("div");
        medItem.classList.add("medicine-item");
        medItem.innerHTML = `
            <h3>${med.name}</h3>
            <p>₹${med.price}</p>
            <button class="add-to-cart" data-name="${med.name}" data-price="${med.price}">Add to Cart</button>
        `;
        medicineList.appendChild(medItem);
    });

    // ✅ Attach event listener to dynamically added buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productName = this.getAttribute("data-name");
            let productPrice = parseFloat(this.getAttribute("data-price"));

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: name, price: price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart!");
    }
});
