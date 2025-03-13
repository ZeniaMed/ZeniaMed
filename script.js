document.addEventListener("DOMContentLoaded", function() {
    const categories = [
        "Diabetes", "Cardiac", "Stomach", "Sexual Wellness", "Oral Care",
        "Liver Care", "Pain Relievers", "Cold and Immunity", "Elderly Care", "Respiratory"
    ];

    const categoryContainer = document.getElementById("categories");

    categories.forEach(category => {
        let div = document.createElement("div");
        div.classList.add("category");
        div.textContent = category;
        div.onclick = () => addToCart(category); // Now clicking a category adds it to cart
        categoryContainer.appendChild(div);
    });

    updateCartDisplay(); // Ensure cart is updated on page load
});

// Shopping cart logic
let cart = {
    total: 0,
    discount: 0,
    appliedCoupon: false
};

// Example function to simulate adding a product to the cart
function addToCart(category) {
    let productPrice = Math.floor(Math.random() * 500) + 100; // Random price between ₹100-₹600
    cart.total += productPrice;
    updateCartDisplay();
    alert(`${category} added to cart for ₹${productPrice}`);
}

// Function to update cart display
function updateCartDisplay() {
    document.getElementById("total-price").textContent = `₹${cart.total}`;
    document.getElementById("discount").textContent = `₹${cart.discount}`;
    document.getElementById("grand-total").textContent = `₹${cart.total - cart.discount}`;
}

// Function to apply coupon
function applyCoupon() {
    if (cart.appliedCoupon) {
        alert("Coupon already applied!");
        return;
    }

    if (cart.total === 0) {
        alert("Your cart is empty! Add items before applying a coupon.");
        return;
    }

    let discountAmount = 50; // Fixed ₹50 discount
    cart.discount = discountAmount;
    cart.appliedCoupon = true;
    updateCartDisplay();
    alert(`Coupon Applied! ₹${discountAmount} discount added.`);
}

// Checkout function
function checkout() {
    if (cart.total === 0) {
        alert("Your cart is empty! Add some products before checking out.");
        return;
    }

    alert(`Proceeding to checkout...\nTotal Amount: ₹${cart.total - cart.discount}`);
}

// Function to refresh order status
function refreshStatus() {
    let statuses = ["Preparing Order", "Out for Delivery", "Arriving Soon"];
    document.getElementById("order-status").textContent = statuses[Math.floor(Math.random() * statuses.length)];
}
document.addEventListener("DOMContentLoaded", function() {
    const categories = {
        "Diabetes": [
            { name: "Metformin", price: 150 },
            { name: "Glimepiride", price: 200 },
            { name: "Insulin Glargine", price: 500 },
            { name: "Sitagliptin", price: 300 },
            { name: "Pioglitazone", price: 250 },
            { name: "Dapagliflozin", price: 350 },
            { name: "Empagliflozin", price: 360 },
            { name: "Gliclazide", price: 180 },
            { name: "Linagliptin", price: 320 },
            { name: "Liraglutide", price: 450 },
            { name: "Acarbose", price: 140 },
            { name: "Miglitol", price: 130 },
            { name: "Repaglinide", price: 220 },
            { name: "Nateglinide", price: 210 },
            { name: "Canagliflozin", price: 340 },
            { name: "Glipizide", price: 190 },
            { name: "Tolbutamide", price: 160 },
            { name: "Chlorpropamide", price: 170 },
            { name: "Rosiglitazone", price: 260 },
            { name: "Exenatide", price: 400 }
        ],
        "Cardiac": [
            { name: "Atenolol", price: 120 },
            { name: "Bisoprolol", price: 150 },
            { name: "Carvedilol", price: 180 },
            { name: "Metoprolol", price: 130 },
            { name: "Propranolol", price: 110 },
            { name: "Lisinopril", price: 140 },
            { name: "Enalapril", price: 135 },
            { name: "Ramipril", price: 145 },
            { name: "Losartan", price: 160 },
            { name: "Valsartan", price: 170 },
            { name: "Amlodipine", price: 125 },
            { name: "Nifedipine", price: 115 },
            { name: "Diltiazem", price: 155 },
            { name: "Verapamil", price: 165 },
            { name: "Digoxin", price: 180 },
            { name: "Hydrochlorothiazide", price: 90 },
            { name: "Furosemide", price: 100 },
            { name: "Spironolactone", price: 130 },
            { name: "Clopidogrel", price: 190 },
            { name: "Simvastatin", price: 200 }
        ],
        "Stomach": [
            { name: "Omeprazole", price: 80 },
            { name: "Lansoprazole", price: 85 },
            { name: "Pantoprazole", price: 90 },
            { name: "Esomeprazole", price: 95 },
            { name: "Ranitidine", price: 70 },
            { name: "Famotidine", price: 75 },
            { name: "Cimetidine", price: 65 },
            { name: "Sucralfate", price: 100 },
            { name: "Misoprostol", price: 110 },
            { name: "Metoclopramide", price: 60 },
            { name: "Domperidone", price: 65 },
            { name: "Ondansetron", price: 120 },
            { name: "Prochlorperazine", price: 80 },
            { name: "Dicyclomine", price: 85 },
            { name: "Hyoscine", price: 90 },
            { name: "Loperamide", price: 50 },
            { name: "Diphenoxylate", price: 55 },
            { name: "Bismuth Subsalicylate", price: 70 },
            { name: "Simethicone", price: 40 },
            { name: "Activated Charcoal", price: 45 }
        ],
        "Sexual Wellness": [
            { name: "Sildenafil", price: 150 },
            { name: "Tadalafil", price: 160 },
            { name: "Vardenafil", price: 170 },
            { name: "Avanafil", price: 180 },
            { name: "Dapoxetine", price: 140 },
            { name: "Flibanserin", price: 190 },
            { name: "Bremelanotide", price: 200 },
            { name: "Testosterone Gel", price: 220 },
            { name: "Estradiol Cream", price: 210 },
            { name: "Progesterone Capsules", price: 230 },
            { name: "Clomiphene Citrate", price: 250 },
            { name: "Letrozole", price: 260 },
            { name: "Anastrozole", price: 270 },
            { name: "Tamoxifen", price: 280 },
            { name: "Finasteride", price: 130 },
            { name: "Dutasteride", price: 140 },
            { name: "Alprostadil", price: 300 },
            { name: "Yohimbine", price: 120 },
            { name: "Maca Root Extract", price: 110 },
            { name: "L-Arginine", price: 100 }
        ],
        "Oral Care": [
            { name: "Chlorhexidine Mouthwash", price: 50 },
            { name: "Fluoride Toothpaste", price: 40 },
            { name: "Hydrogen Peroxide Solution", price: 30 },
            { name: "Sodium Bicarbonate", price: 20 },
            { name: "Potassium Nitrate Toothpaste", price: 60 },
            { name: "Triclosan Toothpaste", price: 70 },
            { name: "Cetylpyridinium Chloride", price: 80 },
            { name: "Benzocaine Gel", price: 90 },
            { name: "Clotrimazole Troches", price: 100 },
            { name: "Nystatin Suspension", price: 110 },
            { name: "Acyclovir Buccal Tablets", price: 120 },
            { name
       ],
  "Liver Care": [
            { name: "Silymarin", price: 200 },
            { name: "Ursodeoxycholic Acid", price: 250 },
            { name: "L-Ornithine-L-Aspartate", price: 220 },
            { name: "Ademetionine", price: 300 },
            { name: "Lactulose", price: 180 },
            { name: "Rifaximin", price: 350 },
            { name: "Spironolactone", price: 150 },
            { name: "Propranolol", price: 130 },
            { name: "Vitamin E", price: 90 },
            { name: "N-Acetylcysteine", price: 210 },
            { name: "Glutathione", price: 280 },
            { name: "Metadoxine", price: 260 },
            { name: "Pentoxifylline", price: 230 },
            { name: "Thiamine", price: 70 },
            { name: "Folic Acid", price: 60 },
            { name: "Ribavirin", price: 400 },
            { name: "Interferon Alfa", price: 500 },
            { name: "Telbivudine", price: 450 },
            { name: "Tenofovir", price: 420 },
            { name: "Entecavir", price: 430 }
        ],
        "Pain Relievers": [
            { name: "Paracetamol", price: 50 },
            { name: "Ibuprofen", price: 60 },
            { name: "Diclofenac", price: 70 },
            { name: "Naproxen", price: 80 },
            { name: "Aspirin", price: 40 },
            { name: "Tramadol", price: 90 },
            { name: "Codeine", price: 100 },
            { name: "Morphine", price: 150 },
            { name: "Fentanyl", price: 200 },
            { name: "Oxycodone", price: 180 },
            { name: "Hydrocodone", price: 170 },
            { name: "Methadone", price: 160 },
            { name: "Buprenorphine", price: 140 },
            { name: "Celecoxib", price: 120 },
            { name: "Etoricoxib", price: 130 },
            { name: "Piroxicam", price: 110 },
            { name: "Meloxicam", price: 100 },
            { name: "Ketorolac", price: 90 },
            { name: "Indomethacin", price: 80 },
            { name: "Mefenamic Acid", price: 70 }
        ],
        "Cold and Immunity": [
            { name: "Vitamin C", price: 30 },
            { name: "Zinc Gluconate", price: 40 },
            { name: "Echinacea", price: 50 },
            { name: "Elderberry Extract", price: 60 },
            { name: "Guaifenesin", price: 70 },
            { name: "Dextromethorphan", price: 80 },
            { name: "Phenylephrine", price: 90 },
            { name: "Pseudoephedrine", price: 100 },
            { name: "Diphenhydramine", price: 110 },
            { name: "Loratadine", price: 120 },
            { name: "Cetirizine", price: 130 },
            { name: "Fexofenadine", price: 140 },
            { name: "Oseltamivir", price: 150 },
            { name: "Amantadine", price: 160 },
            { name: "Rimantadine", price: 170 },
            { name: "Baloxavir Marboxil", price: 180 },
            { name: "Umifenovir", price: 190 },
            { name: "Interferon Beta", price: 200 },
            { name: "Remdesivir", price: 210 },
            { name: "Favipiravir", price: 220 }
        ],
        "Elderly Care": [
            { name: "Calcium Carbonate", price: 50 },
            { name: "Vitamin D3", price: 60 },
            { name: "Alendronate", price: 70 },
            { name: "Risedronate", price: 80 },
            { name: "Denosumab", price: 90 },
            { name: "Teriparatide", price: 100 },
            { name: "Donepezil", price: 110 },
            { name: "Rivastigmine", price: 120 },
            { name: "Galantamine", price: 130 },
            { name: "Memantine", price: 140 },
            { name: "Levodopa-Carbidopa", price: 150 },
            { name: "Pramipexole", price: 160 },
            { name: "Ropinirole", price: 170 },
            { name: "Selegiline", price: 180 },
            { name: "Rasagiline", price: 190 },
            { name: "Entacapone", price: 200 },
            { name: "Tolcapone", price: 210 },
            { name: "Amantadine", price: 220 },
            { name: "Clopidogrel", price: 230 },
            { name: "Warfarin", price: 240 }
        ],
        "Respiratory": [
            { name: "Salbutamol", price: 50 },
            { name: "Ipratropium Bromide", price: 60 },
            { name: "Tiotropium", price: 70 },
            { name: "Budesonide", price: 80 },
            { name: "Fluticasone", price: 90 },
            { name: "Beclometasone", price: 100 },
            { name: "Montelukast", price: 110 },
            { name: "Zafirlukast", price: 120 },
            { name: "Theophylline", price: 130 },
            { name: "Aminophylline", price: 140 },
            { name: "Prednisolone", price: 150 },
            { name: "Dexamethasone",
::contentReference[oaicite:0]{index=0}
    document.addEventListener("DOMContentLoaded", function() {
    console.log("ZeniaMed App Loaded");
});

 
