import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    setPersistence, 
    browserSessionPersistence 
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

// ✅ **FORCE SESSION PERSISTENCE (Auto-login Disabled)**
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("✅ Firebase persistence set to SESSION (Auto-login disabled)");
    })
    .catch((error) => {
        console.error("❌ Error setting persistence:", error);
    });

// ✅ **Force Logout on Page Load**
if (sessionStorage.getItem("forceLogout") !== "false") {
    signOut(auth)
        .then(() => {
            console.log("✅ Forced logout on page load to prevent auto-login.");
            sessionStorage.setItem("forceLogout", "false"); // Prevent infinite loop
        })
        .catch((error) => console.error("❌ Error during forced logout:", error));
}

// ✅ **Check Authentication State**
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block"; 
        
        if (window.location.pathname.includes("index.html")) {
            setTimeout(() => { window.location.href = "home.html"; }, 500);
        }
    } else {
        console.log("⚠️ No user logged in.");
        document.getElementById("logout-btn").style.display = "none";
    }
});

// ✅ **Sign Up**
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("🎉 Sign-up Successful! Redirecting...");
            sessionStorage.setItem("forceLogout", "false");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ **Sign In**
document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("✅ Sign-in Successful! Redirecting...");
            sessionStorage.setItem("forceLogout", "false");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ **Logout (Auto-login 100% Fixed)**
document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.setItem("forceLogout", "true"); // Prevent auto-login

    signOut(auth)
        .then(() => {
            alert("🚪 Logged out successfully!");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});

// ✅ **Toggle Between Sign In & Sign Up Forms**
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
