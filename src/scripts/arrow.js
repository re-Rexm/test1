AFRAME.registerComponent("arrow-pointer", {
    init: function () {
        this.arrowEl = this.el;
        this.targetEl = document.querySelector(".event-marker[visible='true']") || 
                       document.querySelector(".event-marker");
        this.cameraEl = document.querySelector("a-camera");
    },

    tick: function () {
        if (!this.targetEl || !this.cameraEl) return;

        const targetWorldPos = new THREE.Vector3();
        this.targetEl.object3D.getWorldPosition(targetWorldPos);

        const cameraPos = new THREE.Vector3();
        this.cameraEl.object3D.getWorldPosition(cameraPos);

        const targetLocalPos = targetWorldPos.clone();
        this.cameraEl.object3D.worldToLocal(targetLocalPos);

        const angleRad = Math.atan2(targetLocalPos.y, targetLocalPos.x);
        const angleDeg = (180 / Math.PI) * angleRad - 90;

        this.arrowEl.setAttribute("rotation", { x: 0, y: 0, z: angleDeg });
    }
});
