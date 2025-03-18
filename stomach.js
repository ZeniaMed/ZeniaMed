document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "GASOFAST", price: 75 },
        { name: "PANTOPRAZOLE 40MG", price: 95 },
        { name: "RABEPRAZOLE 20MG", price: 120 },
        { name: "ESOMEPRAZOLE 40MG", price: 150 },
        { name: "OMEPRAZOLE 20MG", price: 90 },
        { name: "DOMPERIDONE 10MG", price: 80 },
        { name: "ITOPRIDE 50MG", price: 175 },
        { name: "LANSOPRAZOLE 30MG", price: 140 },
        { name: "FAMOTIDINE 40MG", price: 110 },
        { name: "RANITIDINE 150MG", price: 100 }
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
