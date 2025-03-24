document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "Atenolol 50mg", price: 80, image: "images/atenolol.png" },
        { name: "Metoprolol 25mg", price: 100, image: "images/metoprolol.png" },
        { name: "Amlodipine 5mg", price: 75, image: "images/amlodipine.png" },
        { name: "Losartan 50mg", price: 120, image: "images/losartan.png" },
        { name: "Ramipril 5mg", price: 110, image: "images/ramipril.png" },
        { name: "Clopidogrel 75mg", price: 150, image: "images/clopidogrel.png" },
        { name: "Rosuvastatin 10mg", price: 130, image: "images/rosuvastatin.png" },
        { name: "Simvastatin 20mg", price: 95, image: "images/simvastatin.png" },
        { name: "Enalapril 10mg", price: 125, image: "images/enalapril.png" },
        { name: "Bisoprolol 2.5mg", price: 135, image: "images/bisoprolol.png" }
    ];

    const medicineList = document.querySelector(".medicine-list");

    function renderMedicines() {
        medicineList.innerHTML = "";
        medicines.forEach((medicine, index) => {
            const medItem = document.createElement("div");
            medItem.classList.add("medicine-item");

            medItem.innerHTML = `
                <img src="${medicine.image}" alt="${medicine.name}">
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
