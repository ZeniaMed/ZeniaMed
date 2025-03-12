window.onload = function () {
    let index = 0;
    const slides = document.querySelectorAll(".banner-img");

    function showSlides() {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? "block" : "none";
        });
        index = (index + 1) % slides.length;
    }

    if (slides.length > 0) {
        showSlides(); // Show first image
        setInterval(showSlides, 3000); // Change every 3 seconds
    }
};
