document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "VIAGRA 50MG", price: 400 },
        { name: "CIALIS 20MG", price: 450 },
        { name: "LEVITRA 10MG", price: 350 },
        { name: "KAMAGRA 100MG", price: 250 },
        { name: "DUREX EXTRA SAFE", price: 200 }
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
