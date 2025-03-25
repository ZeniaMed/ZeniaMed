document.addEventListener("DOMContentLoaded", function () {
    const signInForm = document.getElementById("signin-form");
    const signUpForm = document.getElementById("signup-form");

    const signInEmail = document.getElementById("signin-email");
    const signInPassword = document.getElementById("signin-password");

    const signUpName = document.getElementById("name");
    const signUpPhone = document.getElementById("phone");
    const signUpEmail = document.getElementById("email");
    const signUpPassword = document.getElementById("password");

    const switchToSignUp = document.getElementById("switch-to-signup");
    const switchToSignIn = document.getElementById("switch-to-signin");

    // Toggle between sign-in and sign-up
    switchToSignUp.addEventListener("click", function () {
        signInForm.classList.add("hidden");
        signUpForm.classList.remove("hidden");
    });

    switchToSignIn.addEventListener("click", function () {
        signUpForm.classList.add("hidden");
        signInForm.classList.remove("hidden");
    });

    // Handle Sign-Up
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (signUpName.value && signUpPhone.value && signUpEmail.value && signUpPassword.value) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", signUpEmail.value);

            alert("Sign-up successful! Redirecting to home...");
            window.location.href = "home.html"; // Redirect to home page (make sure the filename is correct)
        } else {
            alert("Please fill in all fields!");
        }
    });

    // Handle Sign-In
    signInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (signInEmail.value && signInPassword.value) {
            localStorage.setItem("isLoggedIn", "true");
            alert("Sign-in successful! Redirecting to home...");
            window.location.href = "home.html"; // Redirect to home page (change if needed)
        } else {
            alert("Invalid login credentials!");
        }
    });

    // Check if user is already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "home.html"; // Redirect to home if already logged in
    }
});
