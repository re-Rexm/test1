AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.arrowEl = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
  },

  tick: function () {
    if (!this.cameraEl || this.arrowEl.getAttribute('visible') !== true) return;

    const activeText = document.querySelector('.event-text[visible="true"]');
    if (!activeText) return;

    const eventEntity = activeText.closest('a-entity');
    if (!eventEntity) return;

    // Get world position of the event
    eventEntity.object3D.getWorldPosition(this.targetPos);
    this.cameraEl.object3D.getWorldPosition(this.cameraPos);

    // Calculate direction vector (camera to target)
    const direction = new THREE.Vector3().subVectors(this.targetPos, this.cameraPos).normalize();

    // Convert to camera local space
    this.cameraEl.object3D.worldToLocal(direction);

    // Calculate angle (rotate around Y-axis)
    const angle = Math.atan2(direction.x, direction.z);
    this.arrowEl.setAttribute('rotation', {
      x: 0,
      y: 0,
      z: THREE.Math.radToDeg(angle)
    });
  }
});
