document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "COLGATE STRONG TEETH 100GM", price: 55, image: "images/colgate.jpg" },
        { name: "SENSODYNE RAPID RELIEF 80GM", price: 210, image: "images/sensodyne.jpg" },
        { name: "DABUR RED TOOTHPASTE 150GM", price: 90, image: "images/daburred.jpg" },
        { name: "LISTERINE MOUTHWASH 250ML", price: 180, image: "images/listerine.jpg" },
        { name: "CLOHEX PLUS MOUTHWASH 200ML", price: 160, image: "images/clohex.jpg" }
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
