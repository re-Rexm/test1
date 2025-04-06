AFRAME.registerComponent('distance-calc', {
    init: function() {
        this.camera = document.querySelector('a-camera');
        this.targetPos = new THREE.Vector3();
        this.cameraPos = new THREE.Vector3();
    },
    
    tick: function() {
        if (this.el.getAttribute('visible') !== true) return;
        
        const activeText = document.querySelector('.event-text[visible="true"]');
        if (!activeText) return;
        
        const eventEntity = activeText.parentElement;
        eventEntity.object3D.getWorldPosition(this.targetPos);
        this.camera.object3D.getWorldPosition(this.cameraPos);
        
        const distance = this.cameraPos.distanceTo(this.targetPos).toFixed(2);
        this.el.setAttribute('value', 'Distance: ' + distance + 'm');
    }
});
