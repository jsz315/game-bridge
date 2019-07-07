import EventCenter from '../../ts/core/EventCenter'

export default class Camera{
    constructor(){
        this.$div = $(".controll");
        this.$div.click(()=>{
            this.$div.toggleClass("auto");
            if(this.$div.hasClass("auto")){
                EventCenter.emit(EventCenter.CHANGE_CAMERA, {auto: true});
            }
            else{
                EventCenter.emit(EventCenter.CHANGE_CAMERA, {auto: false});
            }
        })
    }
}