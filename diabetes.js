document.addEventListener("DOMContentLoaded", function () {
    const medicines = [
        { name: "Glimepiride 2mg", price: "₹120" },
        { name: "Metformin 500mg", price: "₹150" },
        { name: "Vildagliptin 50mg", price: "₹250" },
        { name: "Glipizide 5mg", price: "₹100" },
        { name: "Sitagliptin 100mg", price: "₹400" },
        { name: "Pioglitazone 30mg", price: "₹130" },
        { name: "Dapagliflozin 10mg", price: "₹480" },
        { name: "Acarbose 50mg", price: "₹160" },
        { name: "Insulin Glargine", price: "₹600" },
        { name: "Repaglinide 2mg", price: "₹200" },
        { name: "Canagliflozin 100mg", price: "₹550" },
        { name: "Gliclazide 80mg", price: "₹140" },
        { name: "Empagliflozin 25mg", price: "₹500" },
        { name: "Linagliptin 5mg", price: "₹380" },
        { name: "Miglitol 50mg", price: "₹180" },
        { name: "Tolbutamide 500mg", price: "₹170" },
        { name: "Rosiglitazone 4mg", price: "₹120" },
        { name: "Nateglinide 120mg", price: "₹260" },
        { name: "Glucobay 50mg", price: "₹145" },
        { name: "Bromocriptine 2.5mg", price: "₹90" },
        { name: "Metformin XR 1000mg", price: "₹220" },
        { name: "Liraglutide Injection", price: "₹1500" },
        { name: "Exenatide Injection", price: "₹1400" },
        { name: "Albiglutide 30mg", price: "₹1350" },
        { name: "Ertugliflozin 5mg", price: "₹480" },
        { name: "Teneligliptin 20mg", price: "₹300" },
        { name: "Metformin + Glimepiride", price: "₹250" },
        { name: "Metformin + Sitagliptin", price: "₹450" },
        { name: "Insulin Aspart", price: "₹750" }
    ];

    const medicineList = document.querySelector(".medicine-list");

    medicines.forEach((medicine) => {
        const item = document.createElement("div");
        item.classList.add("medicine-item");
        item.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>Price: ${medicine.price}</p>
            <button onclick="addToCart('${medicine.name}', '${medicine.price}')">🛒 Add to Cart</button>
        `;
        medicineList.appendChild(item);
    });
});

function addToCart(name, price) {
    alert(`${name} added to cart!`);
}
