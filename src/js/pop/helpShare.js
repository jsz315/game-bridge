import {getHtmlByData} from '../tooler'
import EventCenter from '../../ts/core/EventCenter'

export default class HelpShare{

    constructor(){
        this.$list = $("#HelpListSkin");
        this.$none = $("#HelpNoneSkin");

        this.$list.find(".pkBtn").click(()=>{
            console.log("开始接力");
            this.hide();

            if(CFG.startGame == 1){
                EventCenter.emit(EventCenter.GAME_START, {});
                return;
            }

            // wxAuth(CFG.sourceUnionId, {
            //     rankType: 3,
            //     shareId: GAME.tool.getParamUrl("shareId"),
            //     sourceScore: GAME.tool.getParamUrl("shareScore"),
            //     sourceUserId: CFG.sourceUserId,
            //     sourceUnionId: CFG.sourceUnionId,
            //     gameId: CFG.gameId,
            //     startGame: 1
            // }, "/youtui/temporary/getWxUserInfo4Bridge");
        })
        this.$list.find(".selfBtn").click(()=>{
            console.log("不接力，自己闯关");
            window.ChangeMode = true;
            this.hide();
            //window.MtaH5.clickStat("help_backmain");
            // EventCenter.emit(EventCenter.GAME_START, {});
            EventCenter.emit(EventCenter.POP_SHOW, {key: "start"});
        })

        this.$none.find(".helpBtn").click(()=>{
            console.log("开始接力");
            this.hide();

            if(CFG.startGame == 1){
                EventCenter.emit(EventCenter.GAME_START, {});
                return;
            }

            wxAuth(CFG.sourceUnionId, {
                rankType: 3,
                shareId: GAME.tool.getParamUrl("shareId"),
                sourceScore: GAME.tool.getParamUrl("shareScore"),
                sourceUserId: CFG.sourceUserId,
                sourceUnionId: CFG.sourceUnionId,
                gameId: CFG.gameId,
                startGame: 1
            }, "/youtui/temporary/getWxUserInfo4Bridge");
        })

        this.$none.find(".goBtn").click(()=>{
            console.log("闯关模式");
            window.ChangeMode = true;
            this.hide();
            //window.MtaH5.clickStat("help_backmain");
            // EventCenter.emit(EventCenter.GAME_START, {});
            EventCenter.emit(EventCenter.POP_SHOW, {key: "start"});
        })
    }

    hide(){
        this.$list.hide();
        this.$none.hide();
        EventCenter.emit(EventCenter.SHOW_GAME, {});
    }

    show(){
        EventCenter.emit(EventCenter.SHOW_REFLUX, {});
        EventCenter.emit(EventCenter.HIDE_GAME, {});
        //window.MtaH5.clickStat("helppage_expose");

        GAME.tool.hpGet("/youtui/bridge/getRank", {
            rankType: 3,
            shareId: GAME.tool.getParamUrl("shareId"),
            sourceScore: 0,
            gameId: CFG.gameId,
            openid: GAME.tool.getParamUrl("openid")
        }, (rsp)=>{
            var list = rsp.data;
            var $div;
            if(list && list.length){
                $div = this.$list;
                var html = getHtmlByData("HelpItemSkin", {list:list});
                this.$list.find(".friendList").html(html);
            }
            else{
                $div = this.$none;
            }

            $div.find(".tip").html(`ta的成绩击败了全国${100-Number(GAME.tool.getParamUrl("sharePrevail"))}%的人`);
            $div.find(".taHeader").css('background-image', `url(${CFG.shareHeadUrl})`);
            $div.find(".taName").html(CFG.shareNickName);

            var scoreBestHelp = CFG.scoreBestHelp < 0 ? 0 : CFG.scoreBestHelp;
            $div.find(".startScore").html(`${GAME.tool.getParamUrl("shareScore")}<span class="letter">米</span>`);
            $div.find(".helpScore").html(`${scoreBestHelp}<span class="letter">米</span>`);
            $div.find(".lastScore").html(`${Number(GAME.tool.getParamUrl("shareScore")) + Number(scoreBestHelp)}<span class="letter">米</span>`);

            $div.css("display", "flex");

            // GAME.tool.hpGet("/youtui/bridge/getBridgeUserInfo", {
            //     gameId: CFG.gameId,
            //     appId: GAME.tool.getParamUrl("appId"),
            //     checkPointType: 1,
            // }, (rsp)=>{

            //     $div.find(".tip").html(`ta的成绩击败了全国${rsp.data.rank}%的人`);
            //     $div.find(".taHeader").css('background-image', `url(${rsp.data.headUrl})`);
            //     $div.find(".taName").html(rsp.data.nickName);
                
            //     $div.find(".startScore").html(`1234<span class="letter">米</span>`);
            //     $div.find(".helpScore").html(`1234<span class="letter">米</span>`);
            //     $div.find(".lastScore").html(`1234<span class="letter">米</span>`);

            //     $div.css("display", "flex");
            // })
        })
    }
}