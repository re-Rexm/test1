AFRAME.registerComponent('clickable', {
  init: function () {
    const handleClick = () => this.el.emit('click');
    this.el.addEventListener('click', handleClick);
    this.el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleClick();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const baseLat = 39.779388;
  const baseLng = -84.063194;
  const offset = 0.0002;

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

  scene.addEventListener('loaded', function () {
    events.forEach(event => {
      const eventEntity = document.createElement('a-entity');
      eventEntity.setAttribute('id', event.id);
      eventEntity.setAttribute('gps-entity-place', {
        latitude: event.position.latitude,
        longitude: event.position.longitude
      });

      // Create marker with proper color
      const marker = document.createElement('a-box');
      marker.setAttribute('class', 'event-marker');
      marker.setAttribute('material', `color: ${event.color}; shader: flat`);
      marker.setAttribute('scale', '5 5 5');
      marker.setAttribute('position', '0 1.5 0');
      marker.setAttribute('look-at', '[gps-camera]');
      marker.setAttribute('clickable', '');
      marker.setAttribute('visible', true);
      eventEntity.appendChild(marker);

      // Create text label - initially hidden
      const text = document.createElement('a-text');
      text.setAttribute('class', 'event-text');
      text.setAttribute('value', `${event.name}\n\n${event.description}`);
      text.setAttribute('color', 'white');
      text.setAttribute('align', 'center');
      text.setAttribute('width', 15);
      text.setAttribute('position', '0 2 0');
      text.setAttribute('scale', '2 2 2');
      text.setAttribute('visible', false);
      text.setAttribute('look-at', '[gps-camera]');
      text.setAttribute('clickable', '');
      eventEntity.appendChild(text);

      // Store original position
      eventEntity.originalPosition = null;

      // Add event listeners
      const handleClick = () => toggleEventDisplay(event.id);
      marker.addEventListener('click', handleClick);
      text.addEventListener('click', handleClick);

      scene.appendChild(eventEntity);
    });
  });

  function toggleEventDisplay(eventId) {
  const eventEntity = document.getElementById(eventId);
  if (!eventEntity) return;

  const marker = eventEntity.querySelector('.event-marker');
  const text = eventEntity.querySelector('.event-text');
  const arrow = document.getElementById('arrow');
  const arrowText = document.getElementById('arrowTxt');

  const isMarkerVisible = marker.getAttribute('visible') !== false;

  if (isMarkerVisible) {
    // Store original position before moving
    if (!eventEntity.originalPosition) {
      const markerWorldPos = new THREE.Vector3();
      marker.object3D.getWorldPosition(markerWorldPos);
      eventEntity.originalPosition = markerWorldPos.clone();
      eventEntity.originalGPS = {
        latitude: eventEntity.getAttribute('gps-entity-place').latitude,
        longitude: eventEntity.getAttribute('gps-entity-place').longitude
      };
    }

    // Switch to text view
    marker.setAttribute('visible', false);
    text.setAttribute('visible', true);
    
    // Position text in front of camera but maintain original direction
    const camera = document.querySelector('a-camera');
    const cameraWorldPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(cameraWorldPos);
    
    // Calculate direction from camera to original position
    const direction = new THREE.Vector3();
    direction.subVectors(eventEntity.originalPosition, cameraWorldPos).normalize();
    
    // Position text 5 meters in that direction
    const textPosition = new THREE.Vector3();
    textPosition.copy(direction).multiplyScalar(5).add(cameraWorldPos);
    
    // Convert to local space relative to scene
    eventEntity.setAttribute('position', textPosition);
    eventEntity.removeAttribute('gps-entity-place');

    // Show arrow and text
    if (arrow && arrowText) {
      arrow.setAttribute('visible', true);
      arrowText.setAttribute('visible', true);
    }
  } else {
    // Switch back to marker view
    text.setAttribute('visible', false);
    marker.setAttribute('visible', true);

    // Restore GPS position
    if (eventEntity.originalGPS) {
      eventEntity.setAttribute('gps-entity-place', {
        latitude: eventEntity.originalGPS.latitude,
        longitude: eventEntity.originalGPS.longitude
      });
    }

    // Hide arrow and text
    if (arrow && arrowText) {
      arrow.setAttribute('visible', false);
      arrowText.setAttribute('visible', false);
    }
  }
}
});
