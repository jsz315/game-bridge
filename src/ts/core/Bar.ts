import { Tooler } from "./Tooler";
import { Draw } from "./Draw";
import Sounds from "./Sounds";
import EventCenter from "./EventCenter";
import FloorPool from "./FloorPool";

export class Bar{
    private _instance:BABYLON.Mesh;
    private _height: number = 0;
    private _add:number = 0.6;
    private _scene:BABYLON.Scene;
    private _timer:number = 0;
    private _offsetY:number = 1;
    private _draw:Draw;
    private _width:number = 2;
    private _distance:number;
    private _running:boolean = false;
    public static barSpace:number = 3;//板子和中心之间的距离


    constructor(scene:BABYLON.Scene){
        this._scene = scene;
        this._instance = BABYLON.MeshBuilder.CreateBox("bar", {size:1}, scene);
        var mat = new BABYLON.StandardMaterial("mat", this._scene);
        mat.diffuseColor = BABYLON.Color3.FromHexString("#FFFFFF");
        // mat.alpha = 0.84;
        this._instance.material = mat;
        // this._instance.position.set(0, this._offsetY, 0);
        this._instance.setPivotPoint(new BABYLON.Vector3(0, -0.5, 0.5));
        this._instance.scaling.set(this._width, 1, 0.1);
        this._instance.receiveShadows = true;
        EventCenter.emit(EventCenter.ADD_SHADOW, this._instance);
        
        this._draw = new Draw(scene);
        // this._draw.getMesh().parent = this._instance;
        // this.hide();
        // this.reset();
    }

    startGrow(){
        // this._scene.addMesh(this._instance);
        this._timer = window.setInterval(()=>{
            this._height += this._add;
            this._instance.scaling.y = this._height;
            if(this._height > this._distance + 6){
                this.stopGrow();
            }
        }, 30);
        this._running = true;
    }

    fall(){
        // this._instance.setPivotPoint(new BABYLON.Vector3(0, -0.5, 0));
        // Tooler.animateFloat(this._scene, this._instance, "rotation.x", 60, Math.PI / 2, Math.PI * 0.8, null);
    }

    getDistance():number{
        return this._height;
    }

    stopGrow(){
        if(this._running == false){
            return;
        }
        this._running = false;
        clearInterval(this._timer);
        this._draw.hide();

        var animation = Tooler.animateFloat(this._scene, this._instance, "rotation.x", 20, 0, Math.PI / 2, ()=>{
            EventCenter.emit(EventCenter.SOUND_PLAY, {key: Sounds.SCORE});
            EventCenter.emit(EventCenter.STOP_GROW, {});
        });
        // var easingFunction = new BABYLON.CircleEase();
        // easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        // animation.setEasingFunction(easingFunction);

        EventCenter.emit(EventCenter.SOUND_PLAY, {key: Sounds.FALL});
    }

    reset(){
        // this._instance.position.set(0, this._offsetY, 0);
        // this.hide();
        // FloorPool.hideFloors(this._scene);
        this._draw.reset();
        this._height = 0;
        this._instance.scaling.y = 0;
        this._instance.rotation.x = 0;
    }

    guider(pot:BABYLON.Vector3, rotation:number, distance:number, isGuider:boolean){
        this._distance = distance;
        var spaceX = 0;
        var spaceZ = 0;
        if(rotation == 0){
            spaceZ = Bar.barSpace;
        }
        else{
            spaceX = -1 * Bar.barSpace;
        }
        if(isGuider){
            this._draw.show(distance, this._width);
            this._draw.setRotate(rotation);
            this._draw.setPosition(pot.x + spaceX, this._offsetY, pot.z + spaceZ);
        }
        else{
            this._draw.hide();
        }

        this._instance.rotation.x = 0;
        this._instance.rotation.y = rotation;
        console.log("rotation = " + rotation);
        this._instance.position.set(pot.x + spaceX, this._offsetY, pot.z + spaceZ);
        // if(rotation = 0){
        //     this._instance.position.set(pot.x - 0.6, this._offsetY, pot.z + 1);
        // }
        // else{
        //     this._instance.position.set(pot.x - 0.6, this._offsetY, pot.z + 0.5);
        // }
        
        this._height = 0;
    }

    hide(){
        this._instance.position.set(100, 0, 0);
        this._draw.hide();
    }
}