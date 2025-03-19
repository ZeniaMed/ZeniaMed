document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "SALBUTAMOL INHALER", price: 320 },
        { name: "MONTELUKAST TABLETS", price: 250 },
        { name: "BRONCHODILATOR SYRUP", price: 180 },
        { name: "CETIRIZINE TABLETS", price: 100 },
        { name: "MUCOLYTIC COUGH SYRUP", price: 220 }
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
