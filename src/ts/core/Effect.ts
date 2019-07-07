import { Scene } from "babylonjs-loaders";
import ParticleBox from "./ParticleBox";

export class Effect{
    private _scene:BABYLON.Scene;
    private _root:BABYLON.Mesh;
    private _list:ParticleBox[];

    constructor(scene:BABYLON.Scene){
        this._scene = scene;
        this._root = new BABYLON.Mesh("root", this._scene);
    }

    init(){
        this._list = [];
        for(var i = 0; i < 48; i++){
            var box = new ParticleBox(this._scene);
            box.getMesh().parent = this._root;
            this._list.push(box);
        }
    }

    show(pot:BABYLON.Vector3){
        if(!this._list){
            this.init();
        }
        this._list.forEach(element=>{
            element.play();
        })
        this._root.position = pot.clone();
    }
}