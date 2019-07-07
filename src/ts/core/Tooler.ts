export class Tooler{
    
    static getMeshSize(mesh:BABYLON.Mesh|BABYLON.AbstractMesh):BABYLON.Vector3{
        var vectorsWorld = mesh.getBoundingInfo().boundingBox.vectorsWorld; 
        var width = Number(vectorsWorld[1].x-(vectorsWorld[0].x));
        var height = Number(vectorsWorld[1].y-(vectorsWorld[0].y));
        var depth = Number(vectorsWorld[1].z-(vectorsWorld[0].z));
        var size = new BABYLON.Vector3(width, height, depth);
        return size;
    }

    static subPosition(a:BABYLON.Vector3, b:BABYLON.Vector3):BABYLON.Vector3{
        return new BABYLON.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static addPosition(a:BABYLON.Vector3, b:BABYLON.Vector3):BABYLON.Vector3{
        return new BABYLON.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static getCenterPosition(a:BABYLON.Vector3, b:BABYLON.Vector3):BABYLON.Vector3{
        return new BABYLON.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
    }

    static animateFloat(scene:BABYLON.Scene, target:any, prop:string, frames:number, from:number, to:number, endCallback:Function):BABYLON.Animation{
        var animation = new BABYLON.Animation("animation", prop, 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        var keys = [];
        keys.push({
            frame: 0,
            value: from
        });
        keys.push({
            frame: frames,
            value: to
        });
        animation.setKeys(keys);
        scene.beginDirectAnimation(target, [animation], 0, frames, false, 1, ()=>{
            endCallback && endCallback()
        });
        return animation;
    }

    static animateVector3(scene:BABYLON.Scene, target:any, prop:string, frames:number, from:BABYLON.Vector3, to:BABYLON.Vector3, endCallback:Function):BABYLON.Animation{
        var animation = new BABYLON.Animation("animation", prop, 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        var keys = [];
        keys.push({
            frame: 0,
            value: from
        });
        keys.push({
            frame: frames,
            value: to
        });
        animation.setKeys(keys);
        scene.beginDirectAnimation(target, [animation], 0, frames, false, 1, ()=>{
            endCallback && endCallback()
        });
        return animation;
    }

}