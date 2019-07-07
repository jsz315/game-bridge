import {getRandomItem} from '../tooler'
import EventCenter from '../../ts/core/EventCenter'

export default class Loading{

    constructor(){
        this.$div = $("#LoadingSkin");
        this.tips = [
            "每日排行榜都会送出高额金币哦",
            "按住屏幕造桥，放开桥落下", 
            "拿到好成绩后别忘记分享给好友哦",
            "分享到微信群可以查看群排名哦"
        ]
    }

    hide(){
        this.$div.hide();
    }

    show(callback){
        this.$div.css("display", "flex");
        var tip = getRandomItem(this.tips);
        this.$div.find(".dom1").html("小贴士：" + tip);
        setTimeout(() => {
            this.hide();
            EventCenter.emit(EventCenter.POP_SHOW, {key: "start", loading: true});
            // //window.MtaH5.clickStat("loadingpage_expose");
        }, 1500);
    }
}