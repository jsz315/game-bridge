import {getHtmlByData} from '../tooler'
import EventCenter from '../../ts/core/EventCenter'

export default class Revive{
    constructor(){
        this.$div = $("#ReviveSkin");
        this.$div.find(".dom1").click(()=>{
            if(this.$div.find(".ReviveSkin").hasClass("none")){
                console.log("没有复活币");
            }
            else{
                console.log("复活");
                this.hide();
                GAME.tool.hpGet("/youtui/bridge/useCoin", {
                    gameId: CFG.gameId,
                    openid: GAME.tool.getParamUrl("openid")
                }, (rsp)=>{
                    EventCenter.emit(EventCenter.GAME_REVIVE, {});
                })
                //window.MtaH5.clickStat("revivebutton_click");
            }
        })

        this.$div.find(".dom2").click(()=>{
            console.log("邀请群友");
            // this.hide();
            // EventCenter.emit(EventCenter.POP_SHOW, {key: "shareMask"});
            EventCenter.emit(EventCenter.SHOW_SHARE, {
                title: "来趣晒搬砖造桥，连接整个世界~",
                desc: "求帮我点一下，获得复活币",
                mask: "获得复活币",
                imgUrl: "http://yun.dui88.com/h5-mami/webgame/game/bridge/v1/assets/bridge-share.png",
                //分享编号
                shareId: GAME.tool.createUUID(12),
                //1全球排行 2好友挑战 3好友接力
                rankType: 1,
                //分享者成绩
                shareScore: 0,
                //分享者排名
                shareRank: 0,
                //分享者战胜世界排名百分数
                sharePrevail: 0,
                //分享场景
                shareSource: 3
            });
        })

        this.$div.find(".close").click(()=>{
            console.log("关闭");
            this.hide();
        })

    }

    hide(){
        this.$div.hide();
    }

    show(){
        //window.MtaH5.clickStat("revivepage_expose");
        GAME.tool.hpGet("/youtui/bridge/checkCoin", {
            gameId: CFG.gameId,
            checkPointType: 1,
            openid: GAME.tool.getParamUrl("openid")
        }, (rsp)=>{
            this.$div.find(".dom3_2").html(`${rsp.data}（上限5个）`);
            this.$div.css("display", "flex");
            if(rsp.data == 0 || window.UseRevive){
                this.$div.find(".ReviveSkin").addClass("none");
            }
            else{
                this.$div.find(".ReviveSkin").removeClass("none");
            }
        })
    }
}