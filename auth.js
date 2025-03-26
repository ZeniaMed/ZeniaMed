// ✅ Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// ✅ Ensure Buttons are Loaded Before Adding Event Listeners
document.addEventListener("DOMContentLoaded", function () {

    // ✅ Firebase Authentication State Check
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("✅ User logged in: ", user.email);
            if (window.location.pathname.includes("index.html")) {
                window.location.href = "home.html"; 
            }
        } else {
            console.log("❌ No user logged in");
            if (!window.location.pathname.includes("index.html")) {
                window.location.href = "index.html"; 
            }
        }
    });

    // ✅ Sign-Up Button Event Listener
    setTimeout(() => {
        let signupForm = document.getElementById("signup-form");
        if (signupForm) {
            signupForm.addEventListener("submit", function (event) {
                event.preventDefault();
                let email = document.getElementById("signup-email").value;
                let password = document.getElementById("signup-password").value;

                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        alert("✅ Account created successfully!");
                        window.location.href = "home.html";
                    })
                    .catch((error) => {
                        alert("❌ Sign-Up Error: " + error.message);
                    });
            });
        }
    }, 1000);

    // ✅ Sign-In Button Event Listener
    setTimeout(() => {
        let signinForm = document.getElementById("signin-form");
        if (signinForm) {
            signinForm.addEventListener("submit", function (event) {
                event.preventDefault();
                let email = document.getElementById("signin-email").value;
                let password = document.getElementById("signin-password").value;

                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        alert("✅ Login successful!");
                        window.location.href = "home.html";
                    })
                    .catch((error) => {
                        if (error.code === "auth/user-not-found") {
                            let confirmCreate = confirm("User not found. Do you want to create a new account?");
                            if (confirmCreate) {
                                createUserWithEmailAndPassword(auth, email, password)
                                    .then(() => {
                                        alert("✅ Account created and logged in!");
                                        window.location.href = "home.html";
                                    })
                                    .catch((err) => {
                                        alert("❌ Account creation failed: " + err.message);
                                    });
                            }
                        } else {
                            alert("❌ Invalid email or password.");
                        }
                    });
            });
        }
    }, 1000);

    // ✅ Logout Button Event Listener
    setTimeout(() => { 
        let logoutButton = document.getElementById("logout-btn");
        if (logoutButton) {
            logoutButton.addEventListener("click", function () {
                signOut(auth)
                    .then(() => {
                        alert("✅ You have been logged out!");
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.replace("index.html"); 
                    })
                    .catch((error) => {
                        alert("❌ Logout Error: " + error.message);
                    });
            });
        }
    }, 1000);
});
