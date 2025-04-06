// Clickable component
AFRAME.registerComponent('clickable', {
  init: function () {
    const handleClick = () => {
      const marker = this.el;
      const text = marker.parentElement.querySelector('.event-text');
      const arrow = document.getElementById('arrow');
      const arrowText = document.getElementById('arrowTxt');
      
      const isTextVisible = text.getAttribute('visible');
      text.setAttribute('visible', !isTextVisible);
      marker.setAttribute('visible', isTextVisible);
      
      if (arrow && arrowText) {
        arrow.setAttribute('visible', !isTextVisible);
        arrowText.setAttribute('visible', !isTextVisible);
      }
    };
    
    this.el.addEventListener('click', handleClick);
    this.el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleClick();
    });
  }
});

// Main event initialization
document.addEventListener("DOMContentLoaded", function() {
  const scene = document.querySelector('a-scene');
  if (!scene) return;

  scene.addEventListener('loaded', function() {
    const camera = document.querySelector('a-camera');
    if (!camera) return;

    function initEvents() {
      const userPos = camera.getAttribute('gps-camera');
      if (!userPos || !userPos.latitude) {
        setTimeout(initEvents, 500);
        return;
      }

      const baseLat = userPos.latitude;
      const baseLng = userPos.longitude;
      const offset = 0.0002; // ~20 meters

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

      events.forEach(event => {
        const entity = document.createElement('a-entity');
        entity.setAttribute('id', event.id);
        entity.setAttribute('gps-entity-place', {
          latitude: event.position.latitude,
          longitude: event.position.longitude
        });

        // Create marker
        const marker = document.createElement('a-box');
        marker.setAttribute('class', 'event-marker');
        marker.setAttribute('material', `color: ${event.color}; shader: flat`);
        marker.setAttribute('scale', '5 5 5');
        marker.setAttribute('position', '0 1.5 0');
        marker.setAttribute('look-at', '[gps-camera]');
        marker.setAttribute('clickable', '');
        marker.setAttribute('visible', true);
        entity.appendChild(marker);

        // Create text
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
        entity.appendChild(text);

        scene.appendChild(entity);
      });
    }

    initEvents();
  });
});
