document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "ALOEVERA MOISTURIZER", price: 200 }, 
        { name: "SUNSCREEN SPF 50", price: 450, image: "images/spf50.jpg" },
        { name: "ACNE CREAM", price: 320 },
        { name: "VITAMIN E CREAM", price: 270 },
        { name: "ANTI-AGING NIGHT CREAM", price: 500 }
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
