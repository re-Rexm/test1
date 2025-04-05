AFRAME.registerComponent('distance-calc', {
  init: function () {
    this.arrowText = this.el;
    this.cameraEl = document.querySelector('a-camera');
    this.targetPos = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3();
  },

  tick: function () {
    if (!this.cameraEl || this.arrowText.getAttribute('visible') !== true) return;

    const activeText = document.querySelector('.event-text[visible="true"]');
    if (!activeText) return;

    const eventEntity = activeText.closest('a-entity');
    if (!eventEntity) return;

    // Get position of the text (which stays where the box was)
    eventEntity.object3D.getWorldPosition(this.targetPos);
    
    // Get camera position
    this.cameraEl.object3D.getWorldPosition(this.cameraPos);
    
    // Calculate distance
    const distance = this.cameraPos.distanceTo(this.targetPos).toFixed(2);
    this.arrowText.setAttribute('value', `Your event is this way\nDistance: ${distance}m`);
  }
});
