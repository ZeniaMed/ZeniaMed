document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "CANDID DUSTING POWDER 100GM", price: 174, image: "images/candidpowder.jpg" },
        { name: "SUNSCREEN SPF 50", price: 450, image: "images/spf50.jpg" },
        { name: "ACNE CREAM", price: 320, image: "images/acne-cream.jpg" },
        { name: "VITAMIN E CREAM", price: 270, image: "images/vitamin-e.jpg" },
        { name: "ANTI-AGING NIGHT CREAM", price: 500, image: "images/anti-aging.jpg" }
    ];

    const medicineList = document.querySelector(".medicine-list");

    medicines.forEach(med => {
        let medItem = document.createElement("div");
        medItem.classList.add("medicine-item");
        medItem.innerHTML = `
            <img src="${med.image}" alt="${med.name}" class="medicine-img">
            <h3>${med.name}</h3>
            <p>₹${med.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        medicineList.appendChild(medItem);
    });
});
