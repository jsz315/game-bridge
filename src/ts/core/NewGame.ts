import * as BABYLON from 'babylonjs';
import * as GUI from "babylonjs-gui";
import { HemisphericLight } from 'babylonjs-loaders';
import { Bar } from './Bar';
import { Role } from './Role';
import { Effect } from './Effect';
import EventCenter from './EventCenter';
import Controller from './Controller';
import FloorPool from './FloorPool';
import Config from "./Config";
import { CameraFollow } from './CameraFollow';
import { Tooler } from './Tooler';

/**
 * 加载人物模型，切换动画
 */

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.TargetCamera;
    private _light: BABYLON.DirectionalLight;
    private _lightPosition: BABYLON.Vector3;
    private _role:Role;
    private _controller:Controller;
    private _cameraFollow:CameraFollow;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true, {}, true);
    }

    createScene(): void {
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.shadowsEnabled = true;
        // console.warn(this._scene.getAnimationRatio());

        // this._scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        // BABYLON.DebugLayer.InspectorURL = "https://preview.babylonjs.com/inspector/babylon.inspector.bundle.js";
        // this._scene.debugLayer.show();
        this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001); 
        this._cameraFollow = new CameraFollow(this._scene, this._canvas);

        var light = new BABYLON.DirectionalLight("dir01", BABYLON.Vector3.Up(), this._scene);
        light.position = new BABYLON.Vector3(-20, 40, -20);
        light.setDirectionToTarget(BABYLON.Vector3.Zero());
        light.intensity = 0.8;

        var hemisphericLight1 = new BABYLON.HemisphericLight("hemisphericLight1", new BABYLON.Vector3(1, -1, -1), this._scene);
        hemisphericLight1.diffuse = BABYLON.Color3.FromHexString("#FFFFFF");
        hemisphericLight1.specular = BABYLON.Color3.FromHexString("#FFFFFF");
        hemisphericLight1.groundColor = BABYLON.Color3.FromHexString("#FFFFFF");
        hemisphericLight1.intensity = 0.4;

        var hemisphericLight2 = new BABYLON.HemisphericLight("hemisphericLight2", new BABYLON.Vector3(1, -1, 0.4), this._scene);
        hemisphericLight2.diffuse = BABYLON.Color3.FromHexString("#FFFFFF");
        hemisphericLight2.specular = BABYLON.Color3.FromHexString("#FFFFFF");
        hemisphericLight2.groundColor = BABYLON.Color3.FromHexString("#FFFFFF");
        hemisphericLight2.intensity = 0.3;

        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        // shadowGenerator.useExponentialShadowMap = true;
        shadowGenerator.usePoissonSampling = true;
        // shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.forceBackFacesOnly = true;
        shadowGenerator.blurKernel = 32;
        shadowGenerator.useKernelBlur = true;
        // shadowGenerator.bias = 0.6;
        console.warn(shadowGenerator.bias);

        light.shadowMinZ = 40;
        light.shadowMaxZ = 100;

        this._light = light;
        this._lightPosition = light.position.clone();

        var box = BABYLON.MeshBuilder.CreateBox("box", {size: 1}, this._scene);
        box.parent = light;
        box.position.z = -3;

        EventCenter.on(EventCenter.ADD_SHADOW, (data:any)=>{
            // console.log("add shadow");
            data.receiveShadows = true;
            shadowGenerator.getShadowMap().renderList.push(data);
        })

        this.loadMesh();
    }


    lightMove(pot:BABYLON.Vector3, frame:number){
        Tooler.animateVector3(this._scene, this._light, "position", frame,
        this._light.position.clone(), new BABYLON.Vector3(
            this._light.position.x + pot.x,
            this._light.position.y + pot.y,
            this._light.position.z + pot.z
        ), null);
    }

    initControl(){
        this._controller = new Controller(this._scene, this._canvas);
        EventCenter.on(EventCenter.ROLE_MOVE, (data:any)=>{
            // console.log(data);
            this._role.moveTo(data);
            this.lightMove(this._role.getMoveOffset(), data.frame);
        });

        EventCenter.on(EventCenter.GAME_START, (data:any)=>{
            this._role.reset();
            this._cameraFollow.reset();
            this._controller.reset();
            EventCenter.emit(EventCenter.SHOW_LEADER, {});

            this._light.position = this._lightPosition.clone();
        });

        EventCenter.on(EventCenter.GAME_REVIVE, (data:any)=>{
            // console.log(data);
            this._role.revive();
            this._controller.revive();
        });

        EventCenter.on(EventCenter.CHANGE_CAMERA, (data:any)=>{
            this._controller.setAutoCamera(data.auto);
            this._cameraFollow.autoView(data.auto);
            this._cameraFollow.setTarget(this._role.getPosition());
        });

        EventCenter.on(EventCenter.MOVE_CAMERA, (data:any)=>{
            this._cameraFollow.move(data);
        });
    }

    loadMesh():void{
        this._role = new Role(this._scene, this._engine);
        this._role.loadMesh();
        FloorPool.loadMesh(this._scene, ()=>{
            this.initControl();
        });
    }


    /**
     * Starts the animation loop.
     */
    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            if(this._cameraFollow){
                this._cameraFollow.updateFrame();
            }
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}