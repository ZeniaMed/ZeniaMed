document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "CALCIUM TABLETS", price: 250 },
        { name: "MULTIVITAMIN CAPSULES", price: 300 },
        { name: "ARTHRITIS RELIEF CREAM", price: 180 },
        { name: "MEMORY BOOSTER SYRUP", price: 320 },
        { name: "JOINT SUPPORT TABLETS", price: 275 }
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
