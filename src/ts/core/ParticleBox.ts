import {Tooler} from "./Tooler";

export default class ParticleBox {

    private _scene : BABYLON.Scene;
    private _box : BABYLON.Mesh;
    private static space: number = 4;

    constructor(scene : BABYLON.Scene) {
        this._scene = scene;
        this._box = BABYLON.MeshBuilder.CreateBox("box", {
                size: 2
            }, this._scene);
        var mat = new BABYLON.StandardMaterial("mat", this._scene);
        mat.diffuseColor = new BABYLON.Color3(Math.random(), 1, Math.random());
        this._box.material = mat;
    }

    getMesh() : BABYLON.Mesh {
        return this._box;
    }

    play() {
        var size = Math.random() * 3 / 4;
        var frame = 24 + Math.floor(Math.random() * 8);
        var x = (0.5 - Math.random()) * ParticleBox.space;
        var y = (0.5 - Math.random()) * ParticleBox.space;
        var z = (0.5 - Math.random()) * ParticleBox.space;
        var aim = new BABYLON.Vector3(x, y, z);
        var animation = Tooler.animateVector3(this._scene, this._box, "position", frame, BABYLON.Vector3.Zero(), aim, null);
        var easingFunction = new BABYLON.BackEase;
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
        animation.setEasingFunction(easingFunction);
       
        Tooler.animateVector3(this._scene, this._box, "scaling", frame, new BABYLON.Vector3(size, size, size), BABYLON.Vector3.Zero(), null);
    }
}