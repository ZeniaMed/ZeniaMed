
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// ✅ Firebase Configuration (Replace with your details)
const firebaseConfig = {
    apiKey: "AIzaSyBvjzms_g3GAfpSspsstO36A7eal7fuD7I",
    authDomain: "zeniamed.firebaseapp.com",
    projectId: "zeniamed",
    storageBucket: "zeniamed.appspot.com",  // ✅ Corrected storage bucket
    messagingSenderId: "795153300011",
    appId: "1:795153300011:web:bda2f2edd0cfe451b2486e",
    measurementId: "G-7Y0JNRYVDB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    
    // ✅ Check if user is logged in and redirect accordingly
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (window.location.pathname.includes("index.html")) {
                window.location.href = "home.html"; // Redirect to home if logged in
            }
        } else {
            if (!window.location.pathname.includes("index.html")) {
                window.location.href = "index.html"; // Redirect to login if logged out
            }
        }
    });

    // ✅ Toggle between Sign In and Sign Up forms
    document.getElementById("show-signin")?.addEventListener("click", function () {
        document.getElementById("signin-form").classList.remove("hidden");
        document.getElementById("signup-form").classList.add("hidden");
    });

    document.getElementById("show-signup")?.addEventListener("click", function () {
        document.getElementById("signup-form").classList.remove("hidden");
        document.getElementById("signin-form").classList.add("hidden");
    });

    // ✅ Sign Up Functionality
    document.getElementById("signup-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("✅ Sign Up successful! Redirecting to home page...");
                window.location.href = "home.html"; // Redirect after sign-up
            })
            .catch((error) => {
                alert("❌ Error: " + error.message);
            });
    });

    // ✅ Sign In Functionality
    document.getElementById("signin-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("signin-email").value;
        let password = document.getElementById("signin-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("✅ Sign In successful! Redirecting to home page...");
                window.location.href = "home.html"; // Redirect after sign-in
            })
            .catch((error) => {
                alert("❌ Invalid email or password. Please try again.");
            });
    });

    // ✅ Log Out Functionality
    let logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            signOut(auth).then(() => {
                alert("✅ You have been logged out!");
                window.location.href = "index.html"; // Redirect to login page
            }).catch((error) => {
                alert("❌ Error while logging out: " + error.message);
            });
        });
    }
});
