document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "GASOFAST", price: 75, image: "images/gasofast.png" },
        { name: "PANTOPRAZOLE 40MG", price: 95, image: "images/pantoprazole.png" },
        { name: "RABEPRAZOLE 20MG", price: 120, image: "images/rabeprazole.png" },
        { name: "ESOMEPRAZOLE 40MG", price: 150, image: "images/esomeprazole.png" },
        { name: "OMEPRAZOLE 20MG", price: 90, image: "images/omeprazole.png" },
        { name: "DOMPERIDONE 10MG", price: 80, image: "images/domperidone.png" },
        { name: "ITOPRIDE 50MG", price: 175, image: "images/itopride.png" },
        { name: "LANSOPRAZOLE 30MG", price: 140, image: "images/lansoprazole.png" },
        { name: "FAMOTIDINE 40MG", price: 110, image: "images/famotidine.png" },
        { name: "RANITIDINE 150MG", price: 100, image: "images/ranitidine.png" }
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
