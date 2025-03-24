document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "CANDID DUSTING POWDER 100GM", price: 174, image: "images/candidpowder.jpg" },
        { name: "SUNSCREEN SPF 50", price: 450, image: "images/spf50.jpg" },
        { name: "ACNE CREAM", price: 320, image: "images/acne-cream.jpg" },
        { name: "VITAMIN E CREAM", price: 270, image: "images/vitamin-e.jpg" },
        { name: "ANTI-AGING NIGHT CREAM", price: 500, image: "images/anti-aging.jpg" }
    ];

    const medicineList = document.querySelector(".medicine-list");

    function renderMedicines() {
        medicineList.innerHTML = "";
        medicines.forEach((medicine, index) => {
            const medItem = document.createElement("div");
            medItem.classList.add("medicine-item");

            medItem.innerHTML = `
                <img src="${medicine.image}" alt="${medicine.name}" class="medicine-img">
                <h3>${medicine.name}</h3>
                <p class="price">₹${medicine.price}</p>
                <button class="add-to-cart" data-index="${index}">Add to Cart</button>
            `;

            medicineList.appendChild(medItem);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const selectedMedicine = medicines[index];
                addToCart(selectedMedicine);
            });
        });
    }

    function addToCart(medicine) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Check if the item already exists in the cart
        let existingItem = cart.find(item => item.name === medicine.name);

        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity
        } else {
            medicine.quantity = 1; // Set default quantity to 1
            cart.push(medicine);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${medicine.name} added to cart!`);
    }

    renderMedicines();
});
