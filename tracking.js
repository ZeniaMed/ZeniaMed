let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 },  // Default location (New Delhi)
        zoom: 12
    });

    marker = new google.maps.Marker({
        position: { lat: 28.6139, lng: 77.2090 }, 
        map: map,
        title: "Delivery Partner"
    });

    updateLocation();
}

function updateLocation() {
    // Simulated GPS coordinates (replace with real GPS data)
    let locations = [
        { lat: 28.6140, lng: 77.2091 },
        { lat: 28.6150, lng: 77.2100 },
        { lat: 28.6160, lng: 77.2110 },
        { lat: 28.6170, lng: 77.2120 }
    ];

    let index = 0;
    setInterval(() => {
        if (index < locations.length) {
            marker.setPosition(locations[index]);
            map.setCenter(locations[index]);
            index++;
        }
    }, 5000); // Updates every 5 seconds
}
