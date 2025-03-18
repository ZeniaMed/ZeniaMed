document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "PARACETAMOL 500MG", price: 30 },
        { name: "IBUPROFEN 400MG", price: 50 },
        { name: "ASPIRIN 300MG", price: 45 },
        { name: "DICLOFENAC GEL", price: 80 },
        { name: "NAPROXEN 250MG", price: 70 }
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
