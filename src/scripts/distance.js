AFRAME.registerComponent("distance-calc", {
    init: function () {
        this.arrowText = this.el;
        this.targetEl = document.querySelector(".event-marker[visible='true']") || 
                       document.querySelector(".event-marker");
        this.cameraEl = document.querySelector("a-camera");
    },

    tick: function () {
        if (!this.targetEl || !this.cameraEl) return;

        const targetPos = new THREE.Vector3();
        this.targetEl.object3D.getWorldPosition(targetPos);

        const cameraPos = new THREE.Vector3();
        this.cameraEl.object3D.getWorldPosition(cameraPos);

        const distance = cameraPos.distanceTo(targetPos).toFixed(1);
        this.arrowText.setAttribute("value", `Nearest event: ${distance}m\nTap colored cubes for details`);
    }
});
