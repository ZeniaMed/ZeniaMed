document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get user input values
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name && phone && email && password) {
        // Save login state
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to home page after successful sign-up
        window.location.href = "index.html"; 
    } else {
        alert("Please fill in all fields!");
    }
});
