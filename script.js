document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slides = document.querySelectorAll(".banner-img");

    if (slides.length === 0) {
        console.error("No images found with class .banner-img");
        return;
    }

    function showSlides() {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? "block" : "none";
        });
        index = (index + 1) % slides.length;
    }

    showSlides(); // Show the first image
    setInterval(showSlides, 3000); // Change every 3 seconds
});
<script src="/ZeniaMed/script.js"></script>
