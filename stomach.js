document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));
            let image = this.getAttribute("data-image");

            addToCart(name, price, image);
        });
    });

    function addToCart(name, price, image) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;  // Increase quantity if item exists
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1  // Add quantity field
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart!");
    }
});
