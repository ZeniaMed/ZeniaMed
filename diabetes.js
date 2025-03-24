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

    medicines.forEach((med, index) => {
        let medItem = document.createElement("div");
        medItem.classList.add("medicine-item");
        medItem.innerHTML = `
            <h3>${med.name}</h3>
            <p>₹${med.price}</p>
            <button class="add-to-cart" data-index="${index}">Add to Cart</button>
        `;
        medicineList.appendChild(medItem);
    });

    // ✅ Fix: Ensure correct item is stored in localStorage when clicking "Add to Cart"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const selectedMed = medicines[index];

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: selectedMed.name, price: selectedMed.price, quantity: 1 });

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(selectedMed.name + " added to cart!");
        });
    });
});
