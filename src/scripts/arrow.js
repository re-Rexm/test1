AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.arrowEl = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraWorldPos = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.lastGPSUpdate = 0;
  },

  tick: function (time) {
    if (!this.cameraEl || this.arrowEl.getAttribute('visible') !== true) return;

    const activeText = document.querySelector('.event-text[visible="true"]');
    if (!activeText) return;

    const eventEntity = activeText.closest('a-entity');
    if (!eventEntity) return;

    // Get position based on whether it's using GPS or local position
    if (eventEntity.hasAttribute('gps-entity-place')) {
      // For GPS entities, we need to wait for the place to be set
      if (!eventEntity.components['gps-entity-place'] || 
          !eventEntity.components['gps-entity-place'].place) return;
      
      const position = eventEntity.components['gps-entity-place'].position;
      if (!position) return;
      
      this.targetPos.set(position.x, position.y, position.z);
    } else {
      // For local positioned entities
      eventEntity.object3D.getWorldPosition(this.targetPos);
    }
    
    // Get camera position
    this.cameraEl.object3D.getWorldPosition(this.cameraWorldPos);
    
    // Calculate direction vector
    this.direction.subVectors(this.targetPos, this.cameraWorldPos).normalize();
    
    // Calculate angle and rotate arrow
    const angle = Math.atan2(this.direction.x, this.direction.z);
    this.arrowEl.setAttribute('rotation', {
      x: 0,
      y: THREE.Math.radToDeg(angle),
      z: 0
    });
  }
});
