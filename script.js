document.addEventListener("DOMContentLoaded", function () {
    // Handle "Add to Cart" button clicks
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.dataset.product;
            let price = this.dataset.price;

            addToCart(product, price);
        });
    });

    // Function to add items to cart
    function addToCart(product, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists in cart
        let existingProduct = cart.find(item => item.product === product);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ product, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product} added to cart!`);
    }
});
