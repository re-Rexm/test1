// Click handler component
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
            
            arrow.setAttribute('visible', !isTextVisible);
            distanceText.setAttribute('visible', !isTextVisible);
        });
    }
});

// Main event placement
document.addEventListener("DOMContentLoaded", function() {
    const scene = document.querySelector('a-scene');
    if (!scene) return;

    scene.addEventListener('loaded', function() {
        const camera = document.querySelector('a-camera');
        if (!camera) return;

        function placeEvents() {
            const userPos = camera.getAttribute('gps-camera');
            if (!userPos || !userPos.latitude) {
                setTimeout(placeEvents, 500);
                return;
            }

            const offset = 0.0002; // ~20 meters
            const events = [
                { id: 'north', color: '#4CAF50', name: 'Food Festival', desc: 'Free food for students!' },
                { id: 'south', color: '#9C27B0', name: 'Dance Party', desc: 'Campus dance night!' },
                { id: 'east', color: '#2196F3', name: 'Movie Night', desc: 'Outdoor cinema!' },
                { id: 'west', color: '#FF9800', name: 'Ice Cream', desc: 'Free ice cream!' }
            ];

            events.forEach(event => {
                const entity = document.createElement('a-entity');
                entity.setAttribute('id', event.id + '-event');
                
                // Set position based on direction
                let lat = userPos.latitude;
                let lng = userPos.longitude;
                if (event.id === 'north') lat += offset;
                else if (event.id === 'south') lat -= offset;
                else if (event.id === 'east') lng += offset;
                else if (event.id === 'west') lng -= offset;
                
                entity.setAttribute('gps-entity-place', {
                    latitude: lat,
                    longitude: lng
                });

                // Create marker
                const marker = document.createElement('a-box');
                marker.setAttribute('class', 'event-marker');
                marker.setAttribute('material', 'color: ' + event.color);
                marker.setAttribute('scale', '5 5 5');
                marker.setAttribute('position', '0 1.5 0');
                marker.setAttribute('look-at', '[gps-camera]');
                marker.setAttribute('clickable', '');
                marker.setAttribute('visible', true);
                entity.appendChild(marker);

                // Create text
                const text = document.createElement('a-text');
                text.setAttribute('class', 'event-text');
                text.setAttribute('value', event.name + '\n\n' + event.desc);
                text.setAttribute('color', 'white');
                text.setAttribute('align', 'center');
                text.setAttribute('width', 15);
                text.setAttribute('position', '0 2 0');
                text.setAttribute('visible', false);
                text.setAttribute('look-at', '[gps-camera]');
                entity.appendChild(text);

                scene.appendChild(entity);
                console.log('Placed event at:', lat, lng);
            });
        }

        placeEvents();
    });
});
