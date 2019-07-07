import EventCenter from "./EventCenter";
import { Tooler } from "./Tooler";
import Sounds from "./Sounds";
import Config from "./Config";

export class Role{
    private _scene:BABYLON.Scene;
    private _engine:BABYLON.Engine;
    private _mesh:BABYLON.AbstractMesh;
    private _skeletons:BABYLON.Skeleton[];
    private _offsetPosition:BABYLON.Vector3;
    private _position:BABYLON.Vector3 = BABYLON.Vector3.Zero();
    private _ox:number;
    private _oz:number;
    private _score:number = 0;
    private _willDie:boolean;
    private _offsety:number = 0.32;
    private _lastPositon:BABYLON.Vector3;

    constructor(scene:BABYLON.Scene, engine:BABYLON.Engine){
        this._scene = scene;
        this._engine = engine;
    }

    loadMesh(){
        // BABYLON.SceneLoader.Load(Config.PATH_ASSET + "mesh/", "Lions25.babylon", this._engine, (scene)=>{
        //     console.log(scene);
        // })

        BABYLON.SceneLoader.ImportMesh("", Config.PATH_ASSET + "mesh/", "Lions.babylon", this._scene, (newMeshes, particleSystems, skeletons)=> {
         
            newMeshes.forEach((element, index)=>{
                // console.log(index + " . " + element.name);
                // console.log(element);
                element.receiveShadows = true;
                EventCenter.emit(EventCenter.ADD_SHADOW, element);
                element.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
                // element.material.freeze();
            })
            // newMeshes[5].setEnabled(false);

            skeletons.forEach((element, index)=>{
                // console.log(index + " . " + element.name);
            })

            var roleIndex = 15;
            this._mesh = new BABYLON.Mesh("mesh", this._scene);
            this._mesh.receiveShadows = true;
            newMeshes[roleIndex].receiveShadows = true;
            newMeshes[roleIndex].parent = this._mesh;
            this._scene.addMesh(this._mesh, true);
            newMeshes[roleIndex].position.set(0, this._offsety, 0.5);
            this._skeletons = skeletons;
            this.playAnimation("wait");
            this._offsetPosition = Tooler.subPosition(this._mesh.position, this._scene.activeCamera.position);
        });
    }

    setColor(mat:any, color:string){
        mat.emissiveColor = BABYLON.Color3.FromHexString(color);
    }

    fall(){
        EventCenter.emit(EventCenter.ROLE_FALL, {});
        Tooler.animateFloat(this._scene, this._mesh, "position.y", 60, this._mesh.position.y, this._mesh.position.y - 30, ()=>{
            // EventCenter.emit(EventCenter.ROLE_DIE, {});
        });
        
        setTimeout(()=>{
            EventCenter.emit(EventCenter.ROLE_DIE, {});
        }, 300)
    }

    reset(){
        this._mesh.position.set(0, this._offsety, 0);
        this._mesh.rotation.y = 0;
        this._score = 0;
        this._willDie = false;
        this.playAnimation("wait");
    }

    revive(){
        this._mesh.position = this._lastPositon.clone();
    }

    playAnimation(key:string){
        this._skeletons.forEach((element, index)=>{
            var range = element.getAnimationRange(key);
            this._scene.beginAnimation(element, range.from, range.to, true);
        })
    }

    moveTo(data:any){
        var pot = data.position;
        this._score += data.score;
        // this._willDie = data.score == 0;
        console.log(data.score, this._score);
        pot.y = this._offsety;
        this._lastPositon = this._mesh.position.clone();

        console.log("move action");
        console.log(this._mesh.position.clone(), pot);

        Tooler.animateVector3(
            this._scene,
            this._mesh,
            "position",
            data.frame,
            this._mesh.position.clone(),
            pot,
            ()=>{
                if(data.score == 0){
                    this.fall();
                }
                else{
                    this.rotate(data.isLeft);
                }
            }
        )

        this.playAnimation("walk");

        this._ox = pot.x - this._mesh.position.x;
        this._oz = pot.z - this._mesh.position.z;
        EventCenter.emit(EventCenter.SOUND_PLAY, {key: Sounds.WALK});
    }

    getMoveOffset():BABYLON.Vector3{
        return new BABYLON.Vector3(this._ox, 0, this._oz);
    }

    rotate(isLeft:boolean){
        // console.warn("left : " + isLeft);
        var animation = new BABYLON.Animation("animation", "rotation.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        var frame = 12;
        // frame = 48;
        var keys = [];
        if(isLeft){
            keys.push({
                frame: 0,
                value: -Math.PI / 2
            });
            keys.push({
                frame: frame,
                value: 0
            });
        }
        else{
            keys.push({
                frame: 0,
                value: 0
            });
            keys.push({
                frame: frame,
                // value: Math.PI * 2
                value: -Math.PI / 2
            });
        }
        
        animation.setKeys(keys);
        // this._mesh.animations = [animation];
        // this._scene.beginAnimation(this._mesh, 0, frame, false);
        this._scene.beginDirectAnimation(this._mesh, [animation], 0, frame, false, 1, ()=>{
            this.playAnimation("wait");
            //this.cameraFollow();
            EventCenter.emit(EventCenter.ROLE_WAIT, {});
        });

        // this._mesh.rotation.y = Math.PI / 4;
        // this.cameraFollow(isLeft);
    }

    cameraFollow(isLeft:boolean){
        var animation = new BABYLON.Animation("animation", "position", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        var frame = 120;
        var aim = new BABYLON.Vector3(
                    this._scene.activeCamera.position.x + this._ox,
                    this._scene.activeCamera.position.y + 0,
                    this._scene.activeCamera.position.z + this._oz,
                )
        var keys = [];

        // if(isLeft){
        //     aim.z += 8;
        // }
        // else{
        //     aim.x -= 8;
        // }

        keys.push({
            frame: 0,
            value: this._scene.activeCamera.position
        });
        keys.push({
            frame: frame,
            value: aim
        });
        
        animation.setKeys(keys);
        this._scene.activeCamera.animations = [animation];
        this._scene.beginAnimation(this._scene.activeCamera, 0, frame, false);
        this._position = this._mesh.position;
    }

    getPosition():BABYLON.Vector3{
        if(!this._mesh){
            return BABYLON.Vector3.Zero();
        }
        return this._mesh.position;
    }
}