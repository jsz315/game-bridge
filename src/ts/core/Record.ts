import Config from "./Config";

export class Record{

    private _scene:BABYLON.Scene;
    private _particleSystem:BABYLON.ParticleSystem;
    private _plane:BABYLON.Mesh;
    private _emitter:BABYLON.Mesh;

    constructor(scene:BABYLON.Scene){
        this._scene = scene;
        // this.init();
        // this.hide();
    }

    init(){
        var emitter0 = BABYLON.Mesh.CreateBox("emitter0", 0.1, this._scene);
        emitter0.isVisible = false;

        var particleSystem = new BABYLON.ParticleSystem("particles", 300, this._scene);
        particleSystem.particleTexture = new BABYLON.Texture(Config.PATH_ASSET + "web/jinbi_6d1c782.png", this._scene);
        // particleSystem.particleTexture.hasAlpha = true;
        particleSystem.minAngularSpeed = -0.9;
        particleSystem.maxAngularSpeed = 0.9;
        particleSystem.minSize = 0.4;
        particleSystem.maxSize = 1.2;
        particleSystem.minLifeTime = 0.9;
        particleSystem.maxLifeTime = 3.6;
        particleSystem.minEmitPower = 2.4;
        particleSystem.maxEmitPower = 8;
        particleSystem.emitter = emitter0;
        particleSystem.emitRate = 120;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        var power = 3;
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, -1, -1);
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1);
        particleSystem.direction1 = new BABYLON.Vector3(-power, 2, -power);
        particleSystem.direction2 = new BABYLON.Vector3(power, 2, power);
        particleSystem.color1 = BABYLON.Color4.FromHexString("#FFEB3BFF");
        particleSystem.color2 = BABYLON.Color4.FromHexString("#ffffffff");
        particleSystem.gravity = new BABYLON.Vector3(0, -120.0, 0);
        // particleSystem.start();

        console.log(particleSystem);

        var plane = BABYLON.MeshBuilder.CreatePlane("plane", {size: 100}, this._scene);
        var mat = new BABYLON.StandardMaterial("mat", this._scene);
        mat.ambientColor = BABYLON.Color3.FromHexString("#000000");
        mat.diffuseColor = BABYLON.Color3.FromHexString("#000000");
        mat.emissiveColor = BABYLON.Color3.FromHexString("#000000");
        mat.alpha = 0.32;
        plane.material = mat;
        // plane.rotation = (this._scene.activeCamera as BABYLON.TargetCamera).rotation.clone();

        var camera:BABYLON.TargetCamera = this._scene.activeCamera as BABYLON.TargetCamera;

        this._emitter = emitter0;
        this._particleSystem = particleSystem;
        this._plane = plane;
    }

    show(){
        var camera:BABYLON.TargetCamera = this._scene.activeCamera as BABYLON.TargetCamera;
        
        console.log(camera.position);
        console.log(camera.getTarget());

        this._emitter.position = camera.getTarget();
        this._emitter.rotation = camera.rotation;

        this._plane.position = camera.getTarget();
        this._plane.rotation = camera.rotation;
        
        this._emitter.translate(new BABYLON.Vector3(0, 0, 1), 10, BABYLON.Space.LOCAL);
        this._plane.translate(new BABYLON.Vector3(0, 0, 1), 4, BABYLON.Space.LOCAL);

        this._emitter.setEnabled(true);
        this._plane.setEnabled(true);

        this._particleSystem.start();

        // this._emitter.position = camera.getTarget();
        // this._plane.position = camera.position;
        // this._plane.rotation = camera.rotation;
        // this._emitter.translate(new BABYLON.Vector3(0, 0, -1), 20, BABYLON.Space.LOCAL);
        // this._plane.translate(new BABYLON.Vector3(0, 0, -1), 10, BABYLON.Space.LOCAL);
    }

    hide(){
        this._emitter.setEnabled(false);
        this._plane.setEnabled(false);
        this._particleSystem.reset();
    }
}