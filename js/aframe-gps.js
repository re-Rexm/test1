AFRAME.registerComponent('gps-camera', {
    schema: {
        gpsMinDistance: {type: 'number', default: 0}
    },
    init: function() {
        this.lastPosition = null;
        this.watchPositionId = null;
        
        if (!navigator.geolocation) {
            alert('Geolocation not supported by your browser');
            return;
        }
        
        this.watchPositionId = navigator.geolocation.watchPosition(
            position => {
                const {latitude, longitude} = position.coords;
                this.updatePosition(latitude, longitude);
            },
            err => {
                console.error('GPS error:', err);
                document.getElementById('loader').innerHTML = 
                    '<div>GPS Error<br>' +
                    '1. Enable location services<br>' +
                    '2. Refresh page</div>';
            },
            {enableHighAccuracy: true, maximumAge: 0, timeout: 10000}
        );
    },
    updatePosition: function(latitude, longitude) {
        this.el.setAttribute('position', {
            x: 0,
            y: 0,
            z: 0
        });
        
        // Hide loader once we have GPS
        document.getElementById('loader').style.display = 'none';
        
        // Update event position 10m east of current location
        const eventEntity = document.getElementById('event-entity');
        if (eventEntity) {
            eventEntity.setAttribute('gps-entity-place', {
                latitude: latitude,
                longitude: longitude + 0.0001 // ~10m east
            });
        }
    },
    remove: function() {
        if (this.watchPositionId) {
            navigator.geolocation.clearWatch(this.watchPositionId);
        }
    }
});

AFRAME.registerComponent('gps-entity-place', {
    schema: {
        latitude: {type: 'number'},
        longitude: {type: 'number'}
    },
    init: function() {
        this.positionSet = false;
    },
    update: function() {
        if (this.data.latitude && this.data.longitude && !this.positionSet) {
            this.positionSet = true;
            
            // Create white box with event info
            const box = document.createElement('a-entity');
            box.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 0.1');
            box.setAttribute('material', 'color: white; opacity: 0.9');
            box.setAttribute('position', '0 0.5 0');
            
            // Add event info from component attributes
            const eventInfo = this.el.getAttribute('event-info');
            if (eventInfo) {
                const infoPanel = document.createElement('a-entity');
                infoPanel.setAttribute('class', 'event-panel');
                infoPanel.setAttribute('text', {
                    value: `${eventInfo.title}\nLocation: ${eventInfo.location}\nTime: ${eventInfo.time}\n${eventInfo.details}`,
                    align: 'center',
                    width: 1.8,
                    color: 'black'
                });
                infoPanel.setAttribute('position', '0 0 0.06');
                box.appendChild(infoPanel);
            }
            
            this.el.appendChild(box);
        }
    }
});

AFRAME.registerComponent('event-info', {
    schema: {
        title: {type: 'string'},
        location: {type: 'string'},
        time: {type: 'string'},
        details: {type: 'string'}
    }
});
