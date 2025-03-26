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

// ✅ Logout ke Baad Redirect Fix
let isLoggingOut = false; // 🔥 Logout ke time prevent re-login

// ✅ Keep user logged in, but prevent auto-login after logout
onAuthStateChanged(auth, (user) => {
    if (isLoggingOut) return; // ⚠️ Agar user logout kar raha hai, toh kuch mat karo

    if (user) {
        console.log("✅ User is logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block"; // Show Logout button
        
        // ✅ Logout ke Baad Auto Login Na Ho
        if (!sessionStorage.getItem("loggedOut")) {
            if (window.location.pathname.includes("index.html")) {
                setTimeout(() => { window.location.href = "home.html"; }, 500); // Delay to prevent flash login
            }
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
            sessionStorage.removeItem("loggedOut"); // Logout flag hatana
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
            sessionStorage.removeItem("loggedOut"); // Logout flag hatana
            alert("✅ Sign-in Successful! Redirecting...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ Logout Function (100% Fixed)
document.getElementById("logout-btn").addEventListener("click", () => {
    isLoggingOut = true; // 🔥 Prevent re-login immediately after logout
    sessionStorage.setItem("loggedOut", "true"); // Logout flag set karna

    signOut(auth)
        .then(() => {
            alert("🚪 Logged out successfully!");
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect with delay to prevent auto login
            }, 1000); // 1 second delay so Firebase doesn't instantly trigger login
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
