import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// ✅ Prevent Auto Login After Logout
let isLoggingOut = sessionStorage.getItem("isLoggingOut") === "true";

// ✅ Check Authentication State
onAuthStateChanged(auth, (user) => {
    if (isLoggingOut) {
        console.log("✅ User manually logged out. Ignoring auto-login.");
        return; // Prevent auto-login
    }

    if (user) {
        console.log("✅ User is logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block"; // Show Logout button
        
        // ✅ Redirect only if not on home page already
        if (window.location.pathname.includes("index.html")) {
            setTimeout(() => { window.location.href = "home.html"; }, 500);
        }
    } else {
        console.log("⚠️ No user logged in.");
        document.getElementById("logout-btn").style.display = "none"; // Hide Logout button
    }
});

// ✅ Sign Up
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            sessionStorage.removeItem("isLoggingOut");
            alert("🎉 Sign-up Successful! Redirecting...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ Sign In
document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            sessionStorage.removeItem("isLoggingOut");
            alert("✅ Sign-in Successful! Redirecting...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ Logout (100% Fixed)
document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.setItem("isLoggingOut", "true"); // Prevent re-login

    signOut(auth)
        .then(() => {
            alert("🚪 Logged out successfully!");
            setTimeout(() => {
                sessionStorage.removeItem("isLoggingOut");
                window.location.href = "index.html"; // Redirect to login page
            }, 2000); // 2 seconds delay to ensure logout is complete
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ Toggle Between Sign In & Sign Up Forms
document.getElementById("show-signin").addEventListener("click", () => {
    document.getElementById("signin-form").classList.remove("hidden");
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("show-signin").classList.add("active");
    document.getElementById("show-signup").classList.remove("active");
});

document.getElementById("show-signup").addEventListener("click", () => {
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("signin-form").classList.add("hidden");
    document.getElementById("show-signup").classList.add("active");
    document.getElementById("show-signin").classList.remove("active");
});
