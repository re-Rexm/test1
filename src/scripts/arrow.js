AFRAME.registerComponent('arrow-pointer', {
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
        
        const direction = new THREE.Vector3()
            .subVectors(this.targetPos, this.cameraPos)
            .normalize();
        
        this.camera.object3D.worldToLocal(direction);
        const angle = Math.atan2(direction.x, direction.z);
        
        this.el.setAttribute('rotation', {
            x: 0,
            y: 0,
            z: THREE.Math.radToDeg(angle)
        });
    }
});
