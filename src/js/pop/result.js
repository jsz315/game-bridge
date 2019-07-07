import {getHtmlByData} from '../tooler'
import EventCenter from '../../ts/core/EventCenter'

export default class Result{
    constructor(){
        this.data = {};
        this.$div = $("#ResultSkin");
        this.$div.find(".dom4").click(()=>{
            console.log("使用复活币");
            // this.hide();
            EventCenter.emit(EventCenter.POP_SHOW, {key: "revive"});
            //window.MtaH5.clickStat("revive_click");
        })

        this.$div.find(".dom1").click(()=>{
            console.log("点击跳过");
            this.hide();
            if(GAME.tool.getParamUrl("rankType") == 2 && window.ChangeMode == false){
                EventCenter.emit(EventCenter.POP_SHOW, {key: "challenge", data: this.data});
            }
            else{
                EventCenter.emit(EventCenter.POP_SHOW, {key: "score", data: this.data});
            }
        })
    }

    hide(){
        this.$div.hide();
    }

    show(num){
        var rankType = GAME.tool.getParamUrl("rankType") || 1;
        if(window.ChangeMode){
            rankType = 1;
        }
        GAME.tool.hpGet("/youtui/bridge/completeGame", {
            rankType: rankType,
            scoreNow: num,
            shareId: GAME.tool.getParamUrl("shareId"),
            gameId: CFG.gameId,
            sourceUserId: CFG.sourceUserId,
            sourceUnionId: CFG.sourceUnionId,
            openid: GAME.tool.getParamUrl("openid")
        }, (rsp)=>{
            this.data = rsp.data;
            if(window.UseRevive){
                this.hide();
                if(GAME.tool.getParamUrl("shareSource") == 1 && window.ChangeMode == false){
                    EventCenter.emit(EventCenter.POP_SHOW, {key: "challenge", data: this.data});
                }
                else{
                    EventCenter.emit(EventCenter.POP_SHOW, {key: "score", data: this.data});
                }
                return;
            }

            // if(rsp.data.bestScore <= rsp.data.currentScore){
            //     EventCenter.emit(EventCenter.SHOW_RECORD, {score: num});
            //     setTimeout(()=>{
            //         EventCenter.emit(EventCenter.HIDE_RECORD, {});
            //         this.$div.css("display", "flex");
            //     }, 3000);
            // }
            
            //window.MtaH5.clickStat("deathpage_expose");
            this.$div.css("display", "flex");
            this.$div.find(".dom2").html(`${num}<span class="small">米</span>`);

            var tip = "";
            var self = false;
            if(rankType == 2 && !window.ChangeMode){
                if(rsp.data.currentScore < Number(GAME.tool.getParamUrl("shareScore"))){
                    tip = `距离战胜好友
                    <img src="${CFG.shareHeadUrl}" class="img">
                    还差：
                    <span class="num">${Math.abs(Number(GAME.tool.getParamUrl("shareScore")) - rsp.data.currentScore)}</span>
                    米`;
                    this.$div.find(".tip").html(tip);
                    return;
                }
            }
            if(rsp.data.rank == 1){
                if(rsp.data.bestScore <= rsp.data.currentScore){
                    tip = `太棒了，全球排名第一`;
                }
                else{
                    tip = `距离自身最佳成绩还差
                    <span class="num">${Math.abs(rsp.data.bestScore - rsp.data.currentScore)}</span>
                    米`;
                }
            }
            else if(rsp.data.rank < 100){
                tip = `距离第${rsp.data.rank - 1}名
                <img src="${rsp.data.photo}" class="img">
                还差：
                <span class="num">${Math.abs(rsp.data.previousScore - rsp.data.currentScore)}</span>
                米`;
            }
            else if(rsp.data.rank < 200){
                tip = `距离上榜得分还差
                <span class="num">${Math.abs(rsp.data.no100Score - rsp.data.currentScore)}</span>
                米`;
            }
            else{
                self = true;
            }

            if(self){
                if(rsp.data.bestScore <= rsp.data.currentScore){
                    tip = `距离上榜得分还差
                    <span class="num">${Math.abs(rsp.data.no100Score - rsp.data.currentScore)}</span>
                    米`;
                }
                else{
                    tip = `距离自身最佳成绩还差
                    <span class="num">${Math.abs(rsp.data.bestScore - rsp.data.currentScore)}</span>
                    米`;
                }
            }
            this.$div.find(".tip").html(tip);
        })

    }
}