export default class EventCenter{

    public static ROLE_MOVE:string = "role move";
    public static ROLE_WAIT:string = "role wait";
    public static ROLE_FALL:string = "role fall";
    public static ROLE_DIE:string = "role die";
    public static SOUND_PLAY:string = "sound play";
    public static SOUND_STOP:string = "sound stop";

    public static GAME_SCORE:string = "game score";
    public static GAME_OVER:string = "game over";
    public static GAME_START:string = "game start";
    public static GAME_REVIVE:string = "game revive";

    public static POP_SHOW:string = "pop show";
    public static POP_HIDE:string = "pop hide";

    public static SHOW_LEADER:string = "show leader";
    public static HIDE_LEADER:string = "hide leader";

    public static SHOW_SHARE:string = "show share";
    public static SHOW_GAME:string = "show game";
    public static HIDE_GAME:string = "hide game";

    public static STOP_GROW:string = "stop grow";
    
    public static ADD_SHADOW:string = "add shadow";

    public static CHANGE_CAMERA:string = "change camera";
    public static MOVE_CAMERA:string = "move camera";

    public static SHOW_REFLUX:string = "show reflux";
    public static HIDE_REFLUX:string = "hide reflux";

    public static SHOW_RECORD:string = "show record";
    public static HIDE_RECORD:string = "hide record";

    public static INIT_GAME:string = "init game";

    public static sender:HTMLElement = document.getElementById("event");

    public static on(messageId:string, callback:Function){
        EventCenter.sender.addEventListener(messageId, (e:CustomEvent)=>{
            callback(e.detail);
        })
    }

    public static emit(messageId:string, param:any){
        var e = new CustomEvent(messageId, {detail: param});
        EventCenter.sender.dispatchEvent(e);
    }
}