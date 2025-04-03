document.addEventListener("DOMContentLoaded", function() {
    const baseLat = 39.786495;
    const baseLng = -84.068553;
    const offset = 0.0045; // ~500m
    
    const events = [
        {
            id: "north-event",
            name: "SPRING FOOD FESTIVAL",
            position: { latitude: baseLat + offset, longitude: baseLng },
            color: "#4CAF50",
            description: "Free food for all students!\n12PM-6PM\nLocation: Student Union"
        },
        {
            id: "south-event",
            name: "DANCE PARTY",
            position: { latitude: baseLat - offset, longitude: baseLng },
            color: "#9C27B0",
            description: "Campus dance night!\n8PM-12AM\nDJ: Campus Radio"
        },
        {
            id: "east-event",
            name: "MOVIE NIGHT",
            position: { latitude: baseLat, longitude: baseLng + offset },
            color: "#2196F3",
            description: "Outdoor cinema!\n7PM-11PM\nMovie: Avengers Endgame"
        },
        {
            id: "west-event",
            name: "ICE CREAM PARTY",
            position: { latitude: baseLat, longitude: baseLng - offset },
            color: "#FF9800",
            description: "Free ice cream!\n2PM-5PM\nFlavors: 10+ varieties"
        }
    ];

    const scene = document.querySelector('a-scene');
    if (!scene) return;

    scene.addEventListener('loaded', function() {
        events.forEach(event => createEventMarker(event));
    });

    function createEventMarker(event) {
        const entity = document.createElement('a-entity');
        entity.setAttribute('id', event.id);
        entity.setAttribute('gps-new-entity-place', event.position);
        entity.setAttribute('class', 'event-entity');

        // Marker
        const marker = document.createElement('a-box');
        marker.setAttribute('class', 'event-marker clickable');
        marker.setAttribute('color', event.color);
        marker.setAttribute('scale', '6 6 6');
        marker.setAttribute('position', '0 0 0');
        marker.setAttribute('look-at', '[gps-new-camera]');
        marker.setAttribute('data-event-id', event.id);
        marker.setAttribute('cursor-listener', '');
        entity.appendChild(marker);

        // Text
        const text = document.createElement('a-text');
        text.setAttribute('class', 'event-text clickable');
        text.setAttribute('value', `${event.name}\n\n${event.description}`);
        text.setAttribute('color', 'white');
        text.setAttribute('align', 'center');
        text.setAttribute('width', 15);
        text.setAttribute('position', '0 2 0');
        text.setAttribute('scale', '2 2 2');
        text.setAttribute('visible', 'false');
        text.setAttribute('look-at', '[gps-new-camera]');
        text.setAttribute('data-event-id', event.id);
        text.setAttribute('cursor-listener', '');
        entity.appendChild(text);

        scene.appendChild(entity);
    }

    window.toggleEventDisplay = function(eventId) {
        const entity = document.getElementById(eventId);
        if (!entity) return;

        const marker = entity.querySelector('.event-marker');
        const text = entity.querySelector('.event-text');
        
        if (marker.getAttribute('visible') !== 'false') {
            // Show text
            marker.setAttribute('visible', 'false');
            text.setAttribute('visible', 'true');
            entity.removeAttribute('gps-new-entity-place');
            entity.setAttribute('position', '0 1.5 -3');
            
            // Vibrate on tap
            if ('vibrate' in navigator) navigator.vibrate(10);
        } else {
            // Show marker
            text.setAttribute('visible', 'false');
            marker.setAttribute('visible', 'true');
            const eventData = events.find(e => e.id === eventId);
            if (eventData) {
                entity.setAttribute('gps-new-entity-place', eventData.position);
            }
        }
    };
});

// Mobile tap component
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('click', this.handleClick);
        this.el.addEventListener('touchstart', this.handleTouch);
    },
    
    handleClick: function (evt) {
        const eventId = this.el.getAttribute('data-event-id');
        if (eventId) window.toggleEventDisplay(eventId);
    },
    
    handleTouch: function (evt) {
        evt.preventDefault();
        this.handleClick(evt);
    }
});
