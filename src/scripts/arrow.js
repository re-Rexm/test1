AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.arrowEl = this.el;
    this.targetEl = document.querySelector('[gps-entity-place]');
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
  },

  tick: function () {
    if (!this.targetEl || !this.cameraEl || this.arrowEl.getAttribute('visible') !== true) return;

    // Get world positions
    this.targetEl.object3D.getWorldPosition(this.targetPos);
    this.cameraEl.object3D.getWorldPosition(this.cameraPos);

    // Calculate direction (camera to target)
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
