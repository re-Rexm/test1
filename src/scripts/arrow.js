AFRAME.registerComponent('arrow-pointer', {
  init: function () {
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
  },

  tick: function () {
    if (this.el.getAttribute('visible') !== true) return;

    // Find the active event (visible text = active)
    const activeText = document.querySelector('.event-text[visible="true"]');
    if (!activeText) return;

    const eventEntity = activeText.parentElement;
    eventEntity.object3D.getWorldPosition(this.targetPos);
    this.cameraEl.object3D.getWorldPosition(this.cameraPos);

    // Calculate direction (camera → target)
    const direction = new THREE.Vector3()
      .subVectors(this.targetPos, this.cameraPos)
      .normalize();

    // Convert to camera space and rotate arrow
    this.cameraEl.object3D.worldToLocal(direction);
    const angle = Math.atan2(direction.x, direction.z);
    this.el.setAttribute('rotation', { x: 0, y: 0, z: THREE.Math.radToDeg(angle) });
  }
});
