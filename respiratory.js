document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "ASTHALIN INHALER", price: 290, image: "images/asthalin-inhaler.jpg" },
        { name: "SEROFLO 250 INHALER", price: 650, image: "images/seroflo-inhaler.jpg" },
        { name: "VENTORLIN SYRUP 100ML", price: 120, image: "images/ventorlin.jpg" },
        { name: "DUOLIN INHALER", price: 420, image: "images/duolin-inhaler.jpg" },
        { name: "VASAKA COUGH SYRUP 100ML", price: 180, image: "images/vasaka.jpg" }
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

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                addToCart(medicines[index]);
            });
        });
    }

    function addToCart(medicine) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Check if item already exists in cart
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
