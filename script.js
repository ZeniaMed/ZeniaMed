let currentIndex = 0;
function changeBanner() {
    const banners = document.querySelector(".banner");
    const totalBanners = document.querySelectorAll(".banner-img").length;

    currentIndex++;
    if (currentIndex >= totalBanners) {
        currentIndex = 0;
    }

    banners.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Change banner every 3 seconds
setInterval(changeBanner, 3000);
