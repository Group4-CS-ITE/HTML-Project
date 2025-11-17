function getLocation() {
    const status = document.getElementById("status");
    const mapFrame = document.getElementById("map");

    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    status.textContent = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Update map to user's location
        const zoom = 15;
        mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

        // Reverse geocoding (OpenStreetMap)
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

        fetch(url, { headers: { "User-Agent": "SizzlaWebApp/1.0" } })
            .then(res => res.json())
            .then(data => {
                status.textContent = " " + (data.display_name || "Location found");
            })
            .catch(() => {
                status.textContent = `Latitude: ${lat}, Longitude: ${lng}`;
            });
    }

    function error() {
        status.textContent = "Unable to retrieve your location.";
    }
}
