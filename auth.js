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

// ✅ Keep user logged in (Even after page refresh)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User is logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block"; // Show Logout button

        // 🛑 Prevent auto-login after logout
        if (!sessionStorage.getItem("loggedOut")) {
            if (window.location.pathname.includes("index.html")) {
                window.location.href = "home.html"; // Redirect to home if already logged in
            }
        }
    } else {
        console.log("⚠️ No user logged in.");
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
            sessionStorage.removeItem("loggedOut"); // Remove logout flag
            alert("🎉 Sign-up Successful! Redirecting to Home...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ Sign In Event Listener
document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            sessionStorage.removeItem("loggedOut"); // Remove logout flag
            alert("✅ Sign-in Successful! Redirecting to Home...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ Logout Function (Fixed)
document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.setItem("loggedOut", "true"); // Set logout flag
    signOut(auth)
        .then(() => {
            alert("🚪 Logged out successfully!");
            window.location.href = "index.html"; // Redirect to login page
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
