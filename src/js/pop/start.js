import {getHtmlByData} from '../tooler'
// import GameReflux from '@components/GameReflux'
import EventCenter from '../../ts/core/EventCenter'

export default class Start{

    constructor(){
        this.$div = $("#StartSkin");
        this.$div.find(".startBtn").click(()=>{
            console.log("开始挑战");
            this.hide();
            // //window.MtaH5.clickStat("startgame_cilck");
            EventCenter.emit(EventCenter.GAME_START, {});
            EventCenter.emit(EventCenter.HIDE_REFLUX, {});
        })
    }

    hide(){
        this.$div.hide();
        EventCenter.emit(EventCenter.SHOW_GAME, {});
    }

    show(){
        EventCenter.emit(EventCenter.SHOW_REFLUX, {});
        EventCenter.emit(EventCenter.HIDE_GAME, {});
        GAME.tool.hpGet("/youtui/bridge/getRank", {
            rankType: 1,
            shareId: 1,
            sourceScore: 0,
            gameId: CFG.gameId,
            openid: GAME.tool.getParamUrl("openid")
        }, (rsp)=>{
            this.$div.css("display", "flex");
            var html = getHtmlByData("WorldItemSkin", {list: rsp.data});
            this.$div.find(".worldList").html(html);
            if(CFG.isPreview != 1){
                this.$div.find(".icon").click(()=>{
                    // new GameReflux({ type: 2, appLink: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youtui&ckey=CK1409589132989' });
                })
            }
        })

        GAME.tool.hpGet("/youtui/bridge/getBridgeUserInfo", {
            gameId: CFG.gameId,
            checkPointType: 1,
            openid: GAME.tool.getParamUrl("openid")
        }, (rsp)=>{
            this.$div.find(".myName").html(rsp.data.nickName);
            if(rsp.data.rank == 0){
                this.$div.find(".myRank").html(`我的排名：暂无`);
            }
            else{
                if(rsp.data.rank > 1000){
                    this.$div.find(".myRank").html(`我的排名：1000+`);
                }
                else{
                    this.$div.find(".myRank").html(`我的排名：${rsp.data.rank}名`);
                }
            }
            if(rsp.data.scoreBest == 0){
                this.$div.find(".myBest").html(`最佳成绩：暂无`);
            }
            else{
                this.$div.find(".myBest").html(`最佳成绩：${rsp.data.scoreBest}米`);
            }
            this.$div.find(".dom2_2_0").css('background-image', `url(${rsp.data.headUrl})`);
        })
    }
}