import { Bar } from "./Bar";
import { Effect } from "./Effect";
import EventCenter from "./EventCenter";
import FloorPool from "./FloorPool";
import Sounds from "./Sounds";
import { Tooler } from "./Tooler";
import BarPool from "./BarPool";
import { CameraFollow } from "./CameraFollow";
import { Record } from './Record';

export default class Controller{

    private _scene:BABYLON.Scene;
    private _bar: Bar;
    private _effect:Effect;
    private _sounds:Sounds;
    private _distance:number;
    private _guiderTimes:number = 0;
    private _isLeft:boolean = false;//当然人物朝向
    private _curPosition:BABYLON.Vector3 = null;//当前地面位置
    private _nextPosition:BABYLON.Vector3 = null;//下一个地面位置
    private _ox:number;//镜头x移动距离
    private _oz:number;//镜头z移动距离
    private _barOffset:number = 1.6;//模板偏移距离
    private _scoreSpace:number = 0.8;//分数间隔距离
    private _minDistance:number = 10;//最小距离
    private _maxDistance:number = 30;//最大距离
    private _container:BABYLON.Mesh;//容器
    private _looking:boolean = false;//静态看向目标
    private _lockState:number = 0;//控制状态锁定
    private changingPosition: BABYLON.Vector3;//镜头更新位置
    private changingRotation: BABYLON.Vector3;//镜头更新角度
    private _autoView:boolean;
    private _plane:BABYLON.Mesh;
    private _record:Record;
    private _easingFunction: BABYLON.CircleEase;
    
    constructor(scene:BABYLON.Scene, canvas:HTMLElement){
        this._scene = scene;
        this._effect = new Effect(this._scene);
        this._sounds = new Sounds(this._scene);
        this._container = new BABYLON.Mesh("container", this._scene);
        this._record = new Record(this._scene);

        this._plane = BABYLON.Mesh.CreatePlane("plane", 1200, this._scene);
        var mat = new BABYLON.StandardMaterial("mat", this._scene);
        mat.ambientColor = BABYLON.Color3.FromHexString("#FFFFFF");
        mat.diffuseColor = BABYLON.Color3.FromHexString("#334455");
        mat.alpha = 0.4;
        mat.freeze();
        this._plane.material = mat;
        this._plane.rotation.set(Math.PI / 2, 0, 0);
        this._plane.position.y = -4.2;

        this._easingFunction = new BABYLON.CircleEase();
        this._easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

        document.getElementById("renderCanvas").addEventListener("touchstart", (e)=>{
            e.preventDefault();
            if(this._autoView){
                return;
            }
            if(this._lockState == 0){
                this._lockState = 1;
                this._bar.startGrow();
                this._sounds.play(Sounds.GROW);
            }
        })

        document.getElementById("renderCanvas").addEventListener("touchend", (e)=>{
            e.preventDefault();
            if(this._autoView){
                return;
            }
            if(this._lockState == 1){
                this._lockState = 2;
                ++this._guiderTimes;
                console.log("guider times: " + this._guiderTimes);
                this._sounds.stop(Sounds.GROW);
                this._bar.stopGrow();
            }
        })

        EventCenter.on(EventCenter.ROLE_WAIT, (data:any)=>{
            this._isLeft = !this._isLeft;
            this._curPosition = this._nextPosition.clone();
            this.createFloor();
            this.cameraTarget();
            this._lockState = 0;
        });

        EventCenter.on(EventCenter.SOUND_PLAY, (data:any)=>{
            this._sounds.play(data.key);
        });

        EventCenter.on(EventCenter.SOUND_STOP, (data:any)=>{
            this._sounds.stop(data.key);
        });

        EventCenter.on(EventCenter.ROLE_DIE, (data:any)=>{
            this._sounds.play(Sounds.DIE);
            EventCenter.emit(EventCenter.GAME_OVER, {});
        });

        EventCenter.on(EventCenter.ROLE_FALL, (data:any)=>{
            this._bar.fall();
        });

        EventCenter.on(EventCenter.STOP_GROW, (data:any)=>{
            this.stopGrow();
        });

        EventCenter.on(EventCenter.SHOW_RECORD, (data:any)=>{
            this._record.show();
        });

        EventCenter.on(EventCenter.HIDE_RECORD, (data:any)=>{
            this._record.hide();
        });
    }

    setAutoCamera(auto:boolean){
        this._autoView = auto;
    }

    cameraTarget(){
        EventCenter.emit(EventCenter.MOVE_CAMERA, {startRole: this._curPosition, endRole: this._nextPosition});
        this.showGuider();
    }

    showGuider(){
        this._bar = BarPool.getBar(this._scene);

        var pot = this._curPosition.clone();
        var rotation = 0;
        if(this._isLeft){
            pot.z -= 0.5;
            rotation = -Math.PI / 2;
        }
        else{
            pot.z -= 0.5;
            rotation = 0;
        }
        
        this._bar.guider(pot, rotation, this._distance, this._guiderTimes < 4);
    }

    stopGrow(){
        var per = this._scoreSpace;
        var height = this._bar.getDistance() + Bar.barSpace;
        var space = Math.abs(this._distance - height);
        console.log("d: " + this._distance, "h: " + height);
        var score = 0;
        if(space < per){
            score = 4;
        }
        else if(space < 2 * per){
            score = 3;
        }
        else if(space < 3 * per){
            score = 2;
        }
        else if(space < 4.8 * per){
            score = 1;
        }
        else{
            score = 0;
        }

        var moveSpace = score ? this._distance : height;
        var position = this._curPosition.clone();
        if(this._isLeft){
            position.x -= moveSpace;
        }
        else{
            position.z += moveSpace;
        }
        var frame = moveSpace / 10 * 40;
        EventCenter.emit(EventCenter.ROLE_MOVE, {position: position, score: score, frame: frame, isLeft: this._isLeft});
        EventCenter.emit(EventCenter.GAME_SCORE, {score: score});

        EventCenter.emit(EventCenter.HIDE_LEADER, {});

        console.log(this._scene.activeCamera);

        if(score > 0){
            this._effect.show(this._nextPosition);
        }        
    }

    revive(){
        this._lockState = 0;
        this._bar.reset();
        this.showGuider();
    }

    reset(){
        FloorPool.hideFloors();
        BarPool.hideBars();
        this._plane.position.x = 0;
        this._plane.position.z = 0;
        this._guiderTimes = 0;
        this._isLeft = false;
        this._curPosition = null;
        this._nextPosition = null;
        this.createFloor();
        this.createFloor();
        this.cameraTarget();
        this._lockState = 0;
    }

    createFloor():BABYLON.AbstractMesh{
        var floor = FloorPool.getFloor(this._scene);
        this._distance = Math.floor(Math.random() * (this._maxDistance - this._minDistance)) + this._minDistance;
        if(this._guiderTimes < 4){
            this._distance = 16;
        }
        if(this._curPosition){
            this._nextPosition = this._curPosition.clone();
            if(this._isLeft){
                this._nextPosition.x -= this._distance;
                // floor.rotation.y = 0;
                floor.getChildMeshes()[1].rotation.y = Math.PI / 2;
                this._plane.position.x -= this._distance;
            }
            else{
                this._nextPosition.z += this._distance;
                // floor.rotation.y = Math.PI / 2;
                floor.getChildMeshes()[1].rotation.y = 0;
                this._plane.position.z += this._distance;
            }

            var animation = Tooler.animateVector3(this._scene, floor, "position", 30, 
                new BABYLON.Vector3(this._nextPosition.x, this._nextPosition.y - 8, this._nextPosition.z), 
                this._nextPosition.clone(), null);

                animation.setEasingFunction(this._easingFunction);
        }
        else{
            this._curPosition = BABYLON.Vector3.Zero();
            floor.position.set(this._curPosition.x, this._curPosition.y, this._curPosition.z);
            floor.getChildMeshes()[1].rotation.y = Math.PI / 2;
        }

        return floor;
    }
}