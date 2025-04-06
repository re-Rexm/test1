AFRAME.registerComponent('distance-calc', {
  init: function () {
    this.arrowText = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
  },

  tick: function () {
    if (!this.cameraEl || !window.activeEventEntity || this.arrowText.getAttribute('visible') !== true) return;

    const eventEntity = window.activeEventEntity;

    if (eventEntity.hasAttribute('gps-entity-place')) {
      const position = eventEntity.components['gps-entity-place'].position;
      if (!position) return;
      this.targetPos.set(position.x, position.y, position.z);
    } else {
      eventEntity.object3D.getWorldPosition(this.targetPos);
    }

    this.cameraEl.object3D.getWorldPosition(this.cameraPos);
    const distance = this.cameraPos.distanceTo(this.targetPos).toFixed(2);
    this.arrowText.setAttribute('value', `Your event is this way\nDistance: ${distance}m`);
  }
});
