document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "ACITROM 1MG", price: 99 },
        { name: "ACITROM 2MG", price: 195 },
        { name: "ACITROM 3MG", price: 225 },
        { name: "ATORVASTATIN 10MG", price: 150 },
        { name: "ATORVASTATIN 20MG", price: 275 },
        { name: "CLOPIDOGREL 75MG", price: 130 },
        { name: "CLOPIDOGREL 150MG", price: 250 },
        { name: "ROSUVASTATIN 10MG", price: 200 },
        { name: "ROSUVASTATIN 20MG", price: 350 },
        { name: "TELMISARTAN 40MG", price: 80 }
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
