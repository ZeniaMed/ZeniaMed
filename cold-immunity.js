document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "VITAMIN C 1000MG", price: 150 },
        { name: "ZINC TABLETS", price: 120 },
        { name: "ANTIVIRAL SYRUP", price: 200 },
        { name: "HONEY COUGH SYRUP", price: 180 },
        { name: "IMMUNITY BOOSTER CAPSULES", price: 250 }
    ];

    const medicineList = document.querySelector(".medicine-list");

    medicines.forEach(med => {
        let medItem = document.createElement("div");
        medItem.classList.add("medicine-item");
        medItem.innerHTML = `
            <h3>${med.name}</h3>
            <p>₹${med.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        medicineList.appendChild(medItem);
    });
});
