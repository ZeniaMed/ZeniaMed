document.addEventListener("DOMContentLoaded", function () {
    // Check if user is already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "home.html"; // Redirect to home page if logged in
    }

    // Toggle between Sign In and Sign Up forms
    document.getElementById("show-signin").addEventListener("click", function () {
        document.getElementById("signin-form").classList.remove("hidden");
        document.getElementById("signup-form").classList.add("hidden");
    });

    document.getElementById("show-signup").addEventListener("click", function () {
        document.getElementById("signup-form").classList.remove("hidden");
        document.getElementById("signin-form").classList.add("hidden");
    });

    // Switch between Sign In and Sign Up from text links
    document.getElementById("switch-to-signup").addEventListener("click", function () {
        document.getElementById("signup-form").classList.remove("hidden");
        document.getElementById("signin-form").classList.add("hidden");
    });

    document.getElementById("switch-to-signin").addEventListener("click", function () {
        document.getElementById("signin-form").classList.remove("hidden");
        document.getElementById("signup-form").classList.add("hidden");
    });

    // Sign Up Form Submission
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.clear();  // Clears login data
    window.location.href = "index.html";  // Redirects back to login page
});


        let name = document.getElementById("signup-name").value;
        let phone = document.getElementById("signup-phone").value;
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;

        if (name && phone && email && password) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            localStorage.setItem("isLoggedIn", "true");

            alert("Sign Up successful! Redirecting to home page...");
            window.location.href = "home.html"; // Redirect to home page after successful sign-up
        } else {
            alert("Please fill in all fields!");
        }
    });

    // Sign In Form Submission
    document.getElementById("signin-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("signin-email").value;
        let password = document.getElementById("signin-password").value;
        let storedEmail = localStorage.getItem("userEmail");
        let storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("isLoggedIn", "true");
            alert("Sign In successful! Redirecting to home page...");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
