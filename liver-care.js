document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "LIV 52 DS SYRUP 200ML", price: 180, image: "images/liv52.jpg" },
        { name: "ESSENTIALE LIVER CAPSULES", price: 450, image: "images/essentiale.jpg" },
        { name: "HEPATITIS PROTECTOR TONIC", price: 300, image: "images/hepatitis-tonic.jpg" },
        { name: "MILK THISTLE EXTRACT 100MG", price: 500, image: "images/milk-thistle.jpg" },
        { name: "UDILIV 300MG TABLETS", price: 420, image: "images/udiliv.jpg" }
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
