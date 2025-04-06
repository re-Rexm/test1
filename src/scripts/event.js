AFRAME.registerComponent('clickable', {
  init: function () {
    this.el.addEventListener('click', () => {
      const marker = this.el;
      const eventEntity = this.el.parentElement;
      const text = eventEntity.querySelector('.event-text');
      
      if (text) {
        const isTextVisible = text.getAttribute('visible');
        text.setAttribute('visible', !isTextVisible);
        marker.setAttribute('visible', isTextVisible);

        // Toggle arrow/distance text
        const arrow = document.getElementById('arrow');
        const arrowText = document.getElementById('arrowTxt');
        if (arrow && arrowText) {
          arrow.setAttribute('visible', !isTextVisible);
          arrowText.setAttribute('visible', !isTextVisible);
        }
      }
    });
  }
});

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
      {
        id: "north-event",
        name: "SPRING FOOD FESTIVAL",
        color: "#4CAF50",
        description: "Free food for all students!\n12PM-6PM\nLocation: Student Union",
        offset: { lat: offset, lng: 0 }
      },
      {
        id: "south-event",
        name: "DANCE PARTY",
        color: "#9C27B0",
        description: "Campus dance night!\n8PM-12AM\nDJ: Campus Radio",
        offset: { lat: -offset, lng: 0 }
      },
      {
        id: "east-event",
        name: "MOVIE NIGHT",
        color: "#2196F3",
        description: "Outdoor cinema!\n7PM-11PM\nMovie: Avengers Endgame",
        offset: { lat: 0, lng: offset }
      },
      {
        id: "west-event",
        name: "ICE CREAM PARTY",
        color: "#FF9800",
        description: "Free ice cream!\n2PM-5PM\nFlavors: 10+ varieties",
        offset: { lat: 0, lng: -offset }
      }
    ];

    events.forEach(event => {
      const entity = document.createElement('a-entity');
      entity.setAttribute('id', event.id);
      entity.setAttribute('gps-entity-place', {
        latitude: baseLat + event.offset.lat,
        longitude: baseLng + event.offset.lng
      });

      // Box marker (visible by default)
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
      text.setAttribute('value', `${event.name}\n\n${event.description}`);
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
