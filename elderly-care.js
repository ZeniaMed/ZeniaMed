document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "REVITAL SENIOR 30 CAPS", price: 350, image: "images/revital-senior.jpg" },
        { name: "SEACOD LIVER OIL CAPS", price: 420, image: "images/seacod.jpg" },
        { name: "DABUR LAL TAIL 200ML", price: 250, image: "images/laltail.jpg" },
        { name: "HIMALAYA GERI-FORTE TABLETS", price: 380, image: "images/geriforte.jpg" },
        { name: "NEERI SYRUP 200ML", price: 210, image: "images/neeri.jpg" }
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
