AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.arrowEl = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraWorldPos = new THREE.Vector3();
    this.direction = new THREE.Vector3();
  },

  tick: function () {
    if (!this.cameraEl || this.arrowEl.getAttribute('visible') !== true) return;

    const activeText = document.querySelector('.event-text[visible="true"]');
    if (!activeText) return;

    const eventEntity = activeText.closest('a-entity');
    if (!eventEntity) return;

    // Get the current position of the text (which is now relative to camera)
    eventEntity.object3D.getWorldPosition(this.targetPos);
    
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
