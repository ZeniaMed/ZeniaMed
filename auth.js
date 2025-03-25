document.getElementById("show-signin").addEventListener("click", function() {
    document.getElementById("signin-form").classList.remove("hidden");
    document.getElementById("signup-form").classList.add("hidden");
    this.classList.add("active");
    document.getElementById("show-signup").classList.remove("active");
});

document.getElementById("show-signup").addEventListener("click", function() {
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("signin-form").classList.add("hidden");
    this.classList.add("active");
    document.getElementById("show-signin").classList.remove("active");
});

document.getElementById("switch-to-signup").addEventListener("click", function() {
    document.getElementById("show-signup").click();
});

document.getElementById("switch-to-signin").addEventListener("click", function() {
    document.getElementById("show-signin").click();
});
