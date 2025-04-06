// Register clickable component
AFRAME.registerComponent('clickable', {
  init: function () {
    this.el.addEventListener('click', () => {
      const marker = this.el;
      const text = this.el.parentElement.querySelector('.event-text');
      if (text) {
        const isVisible = text.getAttribute('visible');
        text.setAttribute('visible', !isVisible);
        marker.setAttribute('visible', isVisible);

        // Toggle arrow/distance text
        const arrow = document.getElementById('arrow');
        const arrowText = document.getElementById('arrowTxt');
        if (arrow && arrowText) {
          arrow.setAttribute('visible', !isVisible);
          arrowText.setAttribute('visible', !isVisible);
        }
      }
    });
  }
});

// Initialize events
document.addEventListener("DOMContentLoaded", function () {
  const scene = document.querySelector('a-scene');
  if (!scene) return;

  scene.addEventListener('loaded', function () {
    const camera = document.querySelector('a-camera');
    if (!camera) return;

    // Use GPS camera position as base
    const userPos = camera.getAttribute('gps-camera');
    const baseLat = userPos.latitude;
    const baseLng = userPos.longitude;
    const offset = 0.0002; // ~20 meters

    const events = [
      { id: "north-event", color: "#4CAF50", offset: { lat: offset, lng: 0 } },
      { id: "south-event", color: "#9C27B0", offset: { lat: -offset, lng: 0 } },
      { id: "east-event", color: "#2196F3", offset: { lat: 0, lng: offset } },
      { id: "west-event", color: "#FF9800", offset: { lat: 0, lng: -offset } }
    ];

    events.forEach(event => {
      const entity = document.createElement('a-entity');
      entity.setAttribute('id', event.id);
      entity.setAttribute('gps-entity-place', {
        latitude: baseLat + event.offset.lat,
        longitude: baseLng + event.offset.lng
      });

      // Box marker
      const marker = document.createElement('a-box');
      marker.setAttribute('class', 'event-marker');
      marker.setAttribute('color', event.color);
      marker.setAttribute('scale', '5 5 5');
      marker.setAttribute('position', '0 1.5 0');
      marker.setAttribute('look-at', '[gps-camera]');
      marker.setAttribute('clickable', '');
      marker.setAttribute('visible', true);
      entity.appendChild(marker);

      // Event text (hidden initially)
      const text = document.createElement('a-text');
      text.setAttribute('class', 'event-text');
      text.setAttribute('value', `Event: ${event.id}\nDescription goes here.`);
      text.setAttribute('color', 'white');
      text.setAttribute('width', '15');
      text.setAttribute('position', '0 2 0');
      text.setAttribute('visible', false);
      text.setAttribute('look-at', '[gps-camera]');
      entity.appendChild(text);

      scene.appendChild(entity);
    });
  });
});
