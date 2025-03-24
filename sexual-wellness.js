document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "VIAGRA 50MG", price: 400, image: "images/viagra.jpg" },
        { name: "CIALIS 20MG", price: 450, image: "images/cialis.jpg" },
        { name: "LEVITRA 10MG", price: 350, image: "images/levitra.jpg" },
        { name: "KAMAGRA 100MG", price: 250, image: "images/kamagra.jpg" },
        { name: "DUREX EXTRA SAFE", price: 200, image: "images/durex.jpg" }
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
