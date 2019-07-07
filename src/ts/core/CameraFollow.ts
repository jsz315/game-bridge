import { Tooler } from "./Tooler";

export class CameraFollow{
    private _scene:BABYLON.Scene;
    private _main:BABYLON.TargetCamera;
    private _sub:BABYLON.TargetCamera;
    private _arc:BABYLON.TargetCamera;
    private _auto:boolean = false;
    private _canvas:HTMLElement;
    private _target:BABYLON.Vector3;
    private _looking:boolean = false;//静态看向目标
    private changingPosition: BABYLON.Vector3;//镜头更新位置
    private changingRotation: BABYLON.Vector3;//镜头更新角度
    private _activeCamera:BABYLON.TargetCamera;
    private _tempCamera:BABYLON.TargetCamera;
    private _position:BABYLON.Vector3;
    private size:number = 12;

    constructor(scene:BABYLON.Scene, canvas:HTMLElement){
        this._scene = scene;
        this._canvas = canvas;
        this._position = new BABYLON.Vector3(50, 50, -40);
        this._main = new BABYLON.TargetCamera("camera", this._position, this._scene);
        this._sub = new BABYLON.TargetCamera("camera", this._position, this._scene);

        this._arc = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), this._scene);
        this._sub.position = this._position;
        this._target = BABYLON.Vector3.Zero();
        this._main.setTarget(this._target);
        this._main.attachControl(this._canvas, true);
        this._sub.attachControl(this._canvas, true);
        this._arc.attachControl(this._canvas, true);
        this._sub.setTarget(this._target);
        this._scene.activeCamera = this._main;

        this._main.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        
        this.scale(this.size);
    }

    setTarget(pot:BABYLON.Vector3){
        this._activeCamera.setTarget(pot);
    }

    scale(num:number){
        var w = num;
        var h = window.innerHeight / window.innerWidth * w;     
        this._main.orthoLeft = -w;
        this._main.orthoRight = w;
        this._main.orthoTop = h;
        this._main.orthoBottom = -h;
    }

    reset(){
        this._scene.activeCamera = this._main;
        this._main.position = this._position;
    }

    getAuto():boolean{
        return this._auto;
    }

    autoView(auto:boolean){
        this._auto = auto;
        if(auto){
            this._scene.activeCamera = this._arc;
        }
        else{
            this._scene.activeCamera = this._main;
        }
        (this._scene.activeCamera as BABYLON.TargetCamera).setTarget(this._target);
    }

    updateFrame(){
        if(this._looking){
            this._activeCamera.position = this.changingPosition.clone();
            this._activeCamera.rotation = this.changingRotation.clone();
            this.scale(this.size);
        }
    }
    
    move(data:any){
        this._target = Tooler.getCenterPosition(data.startRole, data.endRole);
        if(this._scene.activeCamera == this._main){
            this._activeCamera = this._main;
            this._tempCamera = this._sub;
        }
        else{
            this._activeCamera = this._sub;
            this._tempCamera = this._main;
        }
        var distance = data.endRole.x - data.startRole.x + data.endRole.z - data.startRole.z;
        var startPosition = this._activeCamera.position.clone();
        var endPosition = startPosition.clone();

        endPosition.x += (data.endRole.x - data.startRole.x) / 2;
        // endPosition.y = this._position.y / 16 * Math.abs(distance);
        endPosition.y = this._position.y;
        endPosition.z += (data.endRole.z - data.startRole.z) / 2;

        // endPosition.x += data.endRole.x - data.startRole.x;
        // endPosition.y += 0;
        // endPosition.z += data.endRole.z - data.startRole.z;

        // this._tempCamera.rotation.normalize()

        this._tempCamera.position = endPosition.clone();
        this._tempCamera.setTarget(this._target);

        var startRotation = this._activeCamera.rotation.clone();
        var endRotation = this._tempCamera.rotation.clone();

        // this._cameraBox.position = endPosition.clone();
        // this._cameraBox.rotation = endRotation.clone();
        // console.log("s:" + this._cameraBox.position);
        // var back = distance - 30;
        // this._cameraBox.translate(new BABYLON.Vector3(0, 1, 0), back, BABYLON.Space.LOCAL);
        // console.log("e:" + this._cameraBox.position);
        
        this.changingPosition = startPosition;
        this.changingRotation = startRotation;

        var s = Math.abs(distance) * 0.64;
        console.log("bs:" + this.size);
        console.log("缩放:" + s);
        if(s < 10){
            s = 10;
        }

        this._looking = true;
        Tooler.animateVector3(this._scene, this, "changingPosition", 30, startPosition, endPosition, ()=>{
            this._looking = false;
        })

        Tooler.animateVector3(this._scene, this, "changingRotation", 30, startRotation, endRotation, ()=>{
            this._looking = false;
        })

        Tooler.animateFloat(this._scene, this, "size", 30, this.size, s, ()=>{
            this._looking = false;
        })
    }

    toggle(){
        if(this._scene.activeCamera == this._main){
            this._scene.activeCamera = this._sub;
        }
        else{
            this._scene.activeCamera = this._main;
        }
    }
}