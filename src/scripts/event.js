AFRAME.registerComponent("rotation-tick", {
    init: function () {
        this.rotationTmp = { x: 0, y: 0, z: 0 };
    },
    
    tick: function () {
        const rotation = this.el.getAttribute("rotation");
        this.rotationTmp.x = rotation.x + 0.2;
        this.rotationTmp.y = rotation.y + 0.2;
        this.el.setAttribute("rotation", this.rotationTmp);
    }
});
