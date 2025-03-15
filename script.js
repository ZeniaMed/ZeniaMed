document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", function () {
        alert("Redirecting to category: " + this.innerText);
    });
});
