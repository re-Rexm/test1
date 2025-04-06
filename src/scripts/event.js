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

window.activeEventEntity = null;

document.addEventListener("DOMContentLoaded", function () {
  const baseLat = 39.786495;
  const baseLng = -84.068553;
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

      const marker = document.createElement('a-box');
      marker.setAttribute('class', 'event-marker');
      marker.setAttribute('material', `color: ${event.color}; shader: flat`);
      marker.setAttribute('scale', '5 5 5');
      marker.setAttribute('position', '0 1.5 0');
      marker.setAttribute('look-at', '[gps-camera]');
      marker.setAttribute('clickable', '');
      marker.setAttribute('visible', true);
      eventEntity.appendChild(marker);

      eventEntity.originalGPS = {
        latitude: event.position.latitude,
        longitude: event.position.longitude
      };

      const textEntity = document.createElement('a-entity');
      textEntity.setAttribute('id', `${event.id}-text`);
      textEntity.setAttribute('gps-entity-place', {
        latitude: event.position.latitude,
        longitude: event.position.longitude
      });
      textEntity.setAttribute('visible', false);

      const text = document.createElement('a-text');
      text.setAttribute('class', 'event-text');
      text.setAttribute('value', `${event.name}\n\n${event.description}`);
      text.setAttribute('color', 'white');
      text.setAttribute('align', 'center');
      text.setAttribute('width', 15);
      text.setAttribute('position', '0 2 0');
      text.setAttribute('scale', '2 2 2');
      text.setAttribute('look-at', '[gps-camera]');
      text.setAttribute('clickable', '');
      textEntity.appendChild(text);

      const handleClick = () => toggleEventDisplay(event.id);
      marker.addEventListener('click', handleClick);
      textEntity.addEventListener('click', handleClick);

      scene.appendChild(eventEntity);
      scene.appendChild(textEntity);
    });
  });

  function toggleEventDisplay(eventId) {
    const eventEntity = document.getElementById(eventId);
    const marker = eventEntity.querySelector('.event-marker');
    const textEntity = document.getElementById(`${eventId}-text`);
    const arrow = document.getElementById('arrow');
    const arrowText = document.getElementById('arrowTxt');

    const isMarkerVisible = marker.getAttribute('visible') !== false;

    if (isMarkerVisible) {
      marker.setAttribute('visible', false);
      textEntity.setAttribute('visible', true);
      if (arrow && arrowText) {
        arrow.setAttribute('visible', true);
        arrowText.setAttribute('visible', true);
      }
      window.activeEventEntity = eventEntity;
    } else {
      textEntity.setAttribute('visible', false);
      marker.setAttribute('visible', true);
      eventEntity.setAttribute('position', '0 0 0');
      const gps = eventEntity.originalGPS;
      eventEntity.removeAttribute('gps-entity-place');
      setTimeout(() => {
        eventEntity.setAttribute('gps-entity-place', {
          latitude: gps.latitude,
          longitude: gps.longitude
        });
      }, 50);

      if (arrow && arrowText) {
        arrow.setAttribute('visible', false);
        arrowText.setAttribute('visible', false);
      }
      window.activeEventEntity = null;
    }
  }
});
