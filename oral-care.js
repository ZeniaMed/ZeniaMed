document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "COLGATE TOOTHPASTE", price: 50 },
        { name: "SENSODYNE REPAIR & PROTECT", price: 140 },
        { name: "LISTERINE MOUTHWASH", price: 120 },
        { name: "ORAJEL PAIN RELIEF", price: 90 },
        { name: "DENTOGEL", price: 150 }
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
