// Click handler
AFRAME.registerComponent('clickable', {
    init: function() {
        this.el.addEventListener('click', () => {
            const marker = this.el;
            const text = marker.parentElement.querySelector('.event-text');
            const arrow = document.getElementById('arrow');
            const distanceText = document.getElementById('distanceText');
            
            const isTextVisible = text.getAttribute('visible');
            text.setAttribute('visible', !isTextVisible);
            marker.setAttribute('visible', isTextVisible);
            
            if(arrow && distanceText) {
                arrow.setAttribute('visible', !isTextVisible);
                distanceText.setAttribute('visible', !isTextVisible);
            }
        });
    }
});

// Main events
document.addEventListener("DOMContentLoaded", function() {
    const scene = document.querySelector('a-scene');
    const status = document.getElementById('status');
    if (!scene) return;

    scene.addEventListener('loaded', function() {
        const camera = document.querySelector('a-camera');
        if (!camera) return;

        function initEvents() {
            const userPos = camera.getAttribute('gps-camera');
            if (!userPos || !userPos.latitude) {
                status.textContent = "Waiting for GPS...";
                setTimeout(initEvents, 500);
                return;
            }

            status.textContent = `GPS locked! (${userPos.latitude.toFixed(6)}, ${userPos.longitude.toFixed(6)})`;
            const baseLat = userPos.latitude;
            const baseLng = userPos.longitude;
            const offset = 0.0002; // ~20 meters

            // Event data from Code Set 2 with GPS offsets
            const events = [
                {
                    id: "north-event",
                    name: "SPRING FOOD FESTIVAL",
                    color: "#4CAF50",
                    description: "Free food for all students!\n12PM-6PM\nLocation: Student Union",
                    position: { latitude: baseLat + offset, longitude: baseLng }
                },
                {
                    id: "south-event",
                    name: "DANCE PARTY",
                    color: "#9C27B0",
                    description: "Campus dance night!\n8PM-12AM\nDJ: Campus Radio",
                    position: { latitude: baseLat - offset, longitude: baseLng }
                },
                {
                    id: "east-event",
                    name: "MOVIE NIGHT",
                    color: "#2196F3",
                    description: "Outdoor cinema!\n7PM-11PM\nMovie: Avengers Endgame",
                    position: { latitude: baseLat, longitude: baseLng + offset }
                },
                {
                    id: "west-event",
                    name: "ICE CREAM PARTY",
                    color: "#FF9800",
                    description: "Free ice cream!\n2PM-5PM\nFlavors: 10+ varieties",
                    position: { latitude: baseLat, longitude: baseLng - offset }
                }
