AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.arrowEl = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
    this.direction = new THREE.Vector3();
  },

  tick: function () {
    if (this.arrowEl.getAttribute('visible') !== true) return;

    const activeText = document.querySelector('.event-text[visible="true"]');
    if (!activeText) return;

    const eventEntity = activeText.parentElement;
    if (!eventEntity) return;

    // Get world position of the event
    eventEntity.object3D.getWorldPosition(this.targetPos);
    this.cameraEl.object3D.getWorldPosition(this.cameraPos);

    // Calculate direction vector
    this.direction.subVectors(this.targetPos, this.cameraPos).normalize();
    
    // Convert to camera local space
    this.cameraEl.object3D.worldToLocal(this.direction);
    
    // Calculate angle and rotate arrow
    const angle = Math.atan2(this.direction.x, this.direction.z);
    this.arrowEl.setAttribute('rotation', {
      x: 0,
      y: 0,
      z: THREE.Math.radToDeg(angle)
    });
  }
});
