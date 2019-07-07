// import { Floor } from "./Floor";
import { Tooler } from "./Tooler";
import Config from "./Config";
import EventCenter from "./EventCenter";

export default class FloorPool{

    private static list:BABYLON.AbstractMesh[] = [];
    private static max:number = 10;
    public static instance:BABYLON.AbstractMesh;
    public static floorMat1:BABYLON.StandardMaterial;
    public static floorMat2:BABYLON.StandardMaterial;
    public static floorMat3:BABYLON.StandardMaterial;

    constructor(){
        
    }

    public static init(scene:BABYLON.Scene){
        FloorPool.floorMat1 = FloorPool.getFloordMaterial(scene, "#5995e4");
        FloorPool.floorMat2 = FloorPool.getFloordMaterial(scene, "#d5398f");
        FloorPool.floorMat3 = FloorPool.getFloordMaterial(scene, "#9ec14f");
    }

    public static getFloordMaterial(scene:BABYLON.Scene, diffuseColor:string):BABYLON.StandardMaterial{
        var mat = new BABYLON.StandardMaterial("outside_mat", scene);
        mat.emissiveColor = BABYLON.Color3.FromHexString("#000000");
        mat.diffuseColor = BABYLON.Color3.FromHexString(diffuseColor);
        mat.freeze();
        return mat;
    }

    public static getFloor(scene:BABYLON.Scene):BABYLON.AbstractMesh{
        var floor:BABYLON.AbstractMesh;
        if(FloorPool.list.length > FloorPool.max){
            floor = FloorPool.list.shift();
        }
        if(!floor){
            floor = FloorPool.instance.clone("floor", null);
            floor.receiveShadows = true;
            EventCenter.emit(EventCenter.ADD_SHADOW, floor);
        }
        floor.isEnabled(true);
        FloorPool.setColor(floor, scene);
        FloorPool.list.push(floor);
        // console.log(FloorPool.list);
        return floor;
    }

    public static setColor(mesh:BABYLON.AbstractMesh, scene:BABYLON.Scene){
        if(!FloorPool.floorMat1){
            FloorPool.init(scene);
        }
        var outside = mesh.getChildMeshes()[0];
        var n = Math.random();
        if(n < 0.36){
            outside.material = FloorPool.floorMat1;
        }
        else if(n < 0.72){
            outside.material = FloorPool.floorMat2;
        }
        else{
            outside.material = FloorPool.floorMat3;
        }
    }

    public static hideFloors(){
        FloorPool.list.forEach(element => {
            element.position.set(100, 0, 0);
        });
    }

    public static loadMesh(scene:BABYLON.Scene, callbck:Function){
        
        BABYLON.SceneLoader.ImportMesh("", Config.PATH_ASSET + "mesh/", "SampleScene.babylon", scene, (newMeshes, particleSystems, skeletons)=> {

            var clone = newMeshes[3].clone("clone", null);
            var outside = clone.getChildMeshes()[0];
            var mat = new BABYLON.StandardMaterial("outside_mat", scene);
            mat.ambientColor = new BABYLON.Color3(0.5, 0.5, 1);
            mat.emissiveColor = new BABYLON.Color3(0.4, 0, 0.2);
            mat.diffuseColor = new BABYLON.Color3(0, 1, 1);
            outside.material = mat;

            var inside = clone.getChildMeshes()[1];
            var inside_mat = new BABYLON.StandardMaterial("mat1", scene);
            inside_mat.diffuseTexture = new BABYLON.Texture(Config.PATH_ASSET + "mesh/bock.png", scene);
            // inside_mat.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
            inside_mat.ambientColor = new BABYLON.Color3(0.7, 0.7, 0.7);
            // inside_mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
            inside.material = inside_mat;

            // inside.position.y -= 0.3;

            outside.receiveShadows = true;
            inside.receiveShadows = true;


            EventCenter.emit(EventCenter.ADD_SHADOW, outside);
            EventCenter.emit(EventCenter.ADD_SHADOW, inside);
            EventCenter.emit(EventCenter.ADD_SHADOW, clone);

            // inside.scaling.set(0.8, 2, 1.8);
            var size1 = Tooler.getMeshSize(outside);
            // outside.setPivotPoint(new BABYLON.Vector3(0, -size.y / 2, 0));
            outside.position.y = -size1.y / 2;

            var size2 = Tooler.getMeshSize(inside);
            inside.position.y = -size2.y / 2 + inside.position.y / 2 - 0.132;

            clone.scaling.set(3.6, 3.6, 3.6);
            clone.rotation.set(0, Math.PI / 2, 0);
            clone.position.set(0, 0, 0);

            scene.removeMesh(clone, true);
            clone.isVisible = false;
            clone.isEnabled(false);

            for(var i = 0; i < newMeshes.length; i++){
                newMeshes[i].isVisible = false;
                scene.removeMesh(newMeshes[i], true);
                newMeshes[i].isEnabled(false);
            }

            FloorPool.instance = clone;
            callbck();
           
        }, function(evt){
            // console.log(evt);
        });
    }
}