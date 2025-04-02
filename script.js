document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Calculate position 10 meters in front of the user
                // This is a simplified calculation - in a real app you'd use proper geospatial math
                const distance = 0.0001; // ~10 meters in degrees (approximate)
                
                // Set the poster's GPS position
                const poster = document.getElementById('poster');
                poster.setAttribute('gps-entity-place', {
                    latitude: latitude + distance,
                    longitude: longitude
                });
                
                console.log('Poster placed at:', latitude + distance, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                alert('Please enable location services for this demo to work.');
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
