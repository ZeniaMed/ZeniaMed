import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvjzms_g3GAfpSspsstO36A7eal7fuD7I",
    authDomain: "zeniamed.firebaseapp.com",
    projectId: "zeniamed",
    storageBucket: "zeniamed.appspot.com",
    messagingSenderId: "795153300011",
    appId: "1:795153300011:web:bda2f2edd0cfe451b2486e",
    measurementId: "G-7Y0JNRYVDB"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Check If User is Logged In
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block"; // Show Logout button
    } else {
        console.log("No user logged in.");
        document.getElementById("logout-btn").style.display = "none"; // Hide Logout button
    }
});

// ✅ Sign Up Event Listener
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Sign-up Successful! Redirecting to Home...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// ✅ Sign In Event Listener
document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            if (rememberMe) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            }
            alert("Sign-in Successful! Redirecting to Home...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// ✅ Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully!");
            localStorage.removeItem("email"); // Remove saved credentials
            localStorage.removeItem("password");
            window.location.href = "index.html"; // Redirect to login page
        })
        .catch((error) => {
            alert(error.message);
        });
});
