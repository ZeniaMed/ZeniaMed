document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.querySelector(".cart-items");
    const totalPriceElement = document.querySelector(".total-price");

    function renderCart() {
        cartTable.innerHTML = "";
        let totalAmount = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");

            let itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <button class="decrease" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </td>
                <td>₹${itemTotal.toFixed(2)}</td>
                <td><button class="remove" data-index="${index}">❌</button></td>
            `;

            cartTable.appendChild(row);
        });

        totalPriceElement.innerText = `₹${totalAmount.toFixed(2)}`;
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart[index].quantity += 1;
                updateCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    renderCart();
});
