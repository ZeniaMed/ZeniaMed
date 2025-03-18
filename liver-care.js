document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "LIV 52 TABLET", price: 200 },
        { name: "ESSENTIALe LIVER CAPSULE", price: 350 },
        { name: "HEPAMERZ GRANULES", price: 450 },
        { name: "URSODEOXYCHOLIC ACID 300MG", price: 500 },
        { name: "SILYMARIN CAPSULES", price: 275 }
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
