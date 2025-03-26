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

// ✅ **1. FORCE SESSION PERSISTENCE (Auto-login 100% disable)**
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("✅ Firebase persistence set to SESSION (Auto-login disabled)");
    })
    .catch((error) => {
        console.error("❌ Error setting persistence:", error);
    });

// ✅ **2. Auto Logout Every Time Page Loads**
sessionStorage.setItem("forceLogout", "true");

// ✅ **3. Check Authentication State**
onAuthStateChanged(auth, (user) => {
    if (sessionStorage.getItem("forceLogout") === "true") {
        signOut(auth).then(() => {
            console.log("✅ Forced Logout Done on Page Load");
            sessionStorage.setItem("forceLogout", "false");
        }).catch((error) => {
            console.error("❌ Error during forced logout:", error);
        });
        return;
    }

    if (user) {
        console.log("✅ User is logged in:", user.email);
        document.getElementById("logout-btn").style.display = "block"; 
        
        if (window.location.pathname.includes("index.html")) {
            setTimeout(() => { window.location.href = "home.html"; }, 500);
        }
    } else {
        console.log("⚠️ No user logged in.");
        document.getElementById("logout-btn").style.display = "none";
    }
});

// ✅ **4. Sign Up**
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

// ✅ **5. Sign In**
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

// ✅ **6. Logout (Auto-login 100% Fixed)**
// ✅ LOGOUT FUNCTION (Fix auto-login issue)
document.getElementById("logout-btn").addEventListener("click", async () => {
    sessionStorage.setItem("isLoggingOut", "true"); // Prevent auto-login

    try {
        await signOut(auth);
        console.log("✅ Successfully logged out!");

        // ✅ Ensure state change is detected before redirecting
        setTimeout(() => {
            sessionStorage.removeItem("isLoggingOut");
            window.location.href = "index.html"; // Redirect to login page
        }, 1000); // 1-second delay to ensure proper logout
    } catch (error) {
        console.error("❌ Logout Error:", error.message);
        alert("❌ Error: " + error.message);
    }
});


// ✅ **7. Toggle Between Sign In & Sign Up Forms**
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
