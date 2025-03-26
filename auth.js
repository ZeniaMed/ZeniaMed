import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// ✅ Sign Up Event
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Sign-up Successful! Redirecting to Home...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// ✅ Sign In Event
document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Sign-in Successful! Redirecting to Home...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// ✅ Toggle Sign In / Sign Up
document.getElementById("show-signup").addEventListener("click", () => {
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("signin-form").classList.add("hidden");
});

document.getElementById("show-signin").addEventListener("click", () => {
    document.getElementById("signin-form").classList.remove("hidden");
    document.getElementById("signup-form").classList.add("hidden");
});
