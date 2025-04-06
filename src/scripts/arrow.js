AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.arrowEl = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraWorldPos = new THREE.Vector3();
    this.direction = new THREE.Vector3();
  },

  tick: function () {
    if (!this.cameraEl || !window.activeEventEntity || this.arrowEl.getAttribute('visible') !== true) return;

    const activeEvent = window.activeEventEntity;
    activeEvent.object3D.getWorldPosition(this.targetPos);
    this.cameraEl.object3D.getWorldPosition(this.cameraWorldPos);
    this.direction.subVectors(this.targetPos, this.cameraWorldPos).normalize();

    const angle = Math.atan2(this.direction.x, this.direction.z);
    this.arrowEl.setAttribute('rotation', {
      x: 0,
      y: THREE.Math.radToDeg(angle),
      z: 0
    });
  }
});
