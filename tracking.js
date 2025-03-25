import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 }, // Default location (Delhi)
        zoom: 15,
    });

    marker = new google.maps.Marker({
        position: { lat: 28.6139, lng: 77.2090 },
        map: map,
        title: "Delivery Location",
    });

    const orderId = new URLSearchParams(window.location.search).get("orderId");
    if (orderId) {
        onSnapshot(doc(db, "orders", orderId), (doc) => {
            if (doc.exists()) {
                document.getElementById("order-status").textContent = `Status: ${doc.data().status}`;
                if (doc.data().location) {
                    let { lat, lng } = doc.data().location;
                    marker.setPosition({ lat, lng });
                    map.setCenter({ lat, lng });
                }
            }
        });
    }
}
