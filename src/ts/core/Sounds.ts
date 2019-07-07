import Config from "./Config";



export default class Sounds{
    public static GROW:string = "grow";
    public static DIE:string = "die";
    public static FALL:string = "fall";
    public static WALK:string = "walk";
    public static SCORE:string = "score";

    private _scene:BABYLON.Scene;

    private _growSod:BABYLON.Sound;
    private _dieSod:BABYLON.Sound;
    private _fallSod:BABYLON.Sound;
    private _walkSod:BABYLON.Sound;
    private _scoreSod:BABYLON.Sound;
  
    constructor(scene:BABYLON.Scene){
        this. _scene = scene;
        this._growSod = new BABYLON.Sound("growSod", Config.PATH_ASSET + "sod/daqiao.mp3", this._scene, null, {
            loop: 8
        });
        this._dieSod = new BABYLON.Sound("dieSod", Config.PATH_ASSET + "sod/die.mp3", this._scene);
        this._fallSod = new BABYLON.Sound("fallSod", Config.PATH_ASSET + "sod/luodi.mp3", this._scene);
        this._walkSod = new BABYLON.Sound("walkSod", Config.PATH_ASSET + "sod/walk2.mp3", this._scene);
        this._scoreSod = new BABYLON.Sound("scoreSod", Config.PATH_ASSET + "sod/score2.mp3", this._scene);
    }

    play(key:string){
        switch(key){
            case Sounds.GROW:
                this._growSod.play();
                break;
            case Sounds.DIE:
                this._dieSod.play();
                break;
            case Sounds.FALL:
                this._fallSod.play();
                break;
            case Sounds.WALK:
                this._walkSod.play();
                break;
            case Sounds.SCORE:
                this._scoreSod.play();
                break;
            default:
                break;

        }
    }

    stop(key:string){
        switch(key){
            case Sounds.GROW:
                this._growSod.stop();
                break;
            case Sounds.DIE:
                this._dieSod.stop();
                break;
            case Sounds.FALL:
                this._fallSod.stop();
                break;
            case Sounds.WALK:
                this._walkSod.stop();
                break;
            case Sounds.SCORE:
                this._scoreSod.stop();
                break;
            default:
                break;

        }
    }

    
}