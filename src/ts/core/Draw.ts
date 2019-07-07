import * as BABYLON from 'babylonjs';
import { Tooler } from './Tooler';
import Config from "./Config";


export class Draw{
    private _scene: BABYLON.Scene;
    private _line: BABYLON.Mesh;
    private _curHeight: number = 0;
    private _add: number = 0.1;

    constructor(scene:BABYLON.Scene){
        this._scene = scene;
        this._line = this.createLines();
    }

    getMesh():BABYLON.Mesh{
        return this._line;
    }

    createLines():BABYLON.Mesh{
        var mat = new BABYLON.StandardMaterial("mat", this._scene);
        mat.emissiveColor = BABYLON.Color3.FromHexString("#FFFFFF");
        mat.freeze();
        var root = new BABYLON.Mesh("root", this._scene);
        for(let i = 0; i < 6; i++){
            var box = BABYLON.MeshBuilder.CreateBox("box", {
                size: 1,
                width: 3,
                height: 1,
                depth: 1
            }, this._scene);
            box.parent = root;
            box.material = mat;
            var x = Math.floor(i / 2) * 5;
            var y = (i % 2) * 80 - 1.2;
            box.position.set(x, y, 0);
        }
        
        for(let i = 0; i < 32; i++){
            var box = BABYLON.MeshBuilder.CreateBox("box", {
                size: 1,
                width: 1,
                height: 3,
                depth: 1
            }, this._scene);
            box.parent = root;
            box.material = mat;
            var x = (i % 2) * 12 - 1;
            var y = Math.floor(i / 2) * 5;
            box.position.set(x, y, 0);
        }

        this._scene.addMesh(root, true);
        console.log(Tooler.getMeshSize(root));
        var scale = 2 / 13; 
        root.scaling.set(scale, scale, scale * 0.2);
        return root;
    }

    reset(){
        // this._scene.addMesh(this._line);
    }

    setRotate(r:number){
        this._line.rotation.y = r;
    }

    setPosition(x:number, y:number, z:number){
        if(this._line.rotation.y == 0){
            this._line.position.set(x - 0.8, y, z + 0.5);
        }
        else{
            this._line.position.set(x + 0.1, y, z - 0.3);
        }
    }

    show(h:number, w:number):void{
        this._curHeight = h;
    }

    hide(){
        this._line && this._line.position.set(100, 0, 0);
    }
}