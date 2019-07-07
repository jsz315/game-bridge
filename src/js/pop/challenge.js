import {getHtmlByData} from '../tooler'
import EventCenter from '../../ts/core/EventCenter'


export default class Challenge{

    constructor(){
        this.$win = $("#SuccessSkin");
        this.$lost = $("#LostSkin");

        this.$win.find(".xuanBtn").click(()=>{
            console.log("立即炫耀");
            // this.hide();
            EventCenter.emit(EventCenter.SHOW_SHARE, {
                title: "我过的桥比全世界" + (100-this.data.prevail) + "%的人走的路还多，你敢来挑战吗？",
                desc: "每天搬砖造桥，连接整个世界",
                mask: "邀请好友挑战",
                imgUrl: "http://yun.dui88.com/h5-mami/webgame/game/bridge/v1/assets/bridge-share.png",
                //分享编号
                shareId: GAME.tool.createUUID(12),
                //1全球排行 2好友挑战 3好友接力
                rankType: 2,
                //分享者成绩
                shareScore: this.data.currentScore,
                //分享者排名
                shareRank: this.data.rank,
                //分享者战胜世界排名百分数
                sharePrevail: this.data.prevail,
                //分享场景
                shareSource: 4,
                //游戏页面类型
                gamePage: "pk"
            });
        })
        this.$win.find(".chuangBtn").click(()=>{
            console.log("闯关模式");
            this.hide();
            window.ChangeMode = true;
            EventCenter.emit(EventCenter.POP_SHOW, {key: "start"});
        })

        this.$lost.find(".bufuBtn").click(()=>{
            console.log("不服再战");
            this.hide();
            EventCenter.emit(EventCenter.GAME_START, {});
        })

        this.$lost.find(".fangBtn").click(()=>{
            console.log("放ta一马");
            this.hide();
            window.ChangeMode = true;
            EventCenter.emit(EventCenter.POP_SHOW, {key: "start"});
        })
    }

    hide(){
        this.$win.hide();
        this.$lost.hide();
    }

    show(data){
        EventCenter.emit(EventCenter.SHOW_REFLUX, {});
        this.data = data;
        var $div;
        if(data.currentScore >= Number(GAME.tool.getParamUrl("shareScore"))){
            $div = this.$win;
            //window.MtaH5.clickStat("pkresult_win_expose");
        }
        else{
            $div = this.$lost;
            //window.MtaH5.clickStat("pkresult_lose_expose");
        }

        $div.find(".myName").html(CFG.nickName);
        $div.find(".myHeader").css("background-image", `url(${CFG.headUrl})`);
        $div.find(".myScore").html(`${data.currentScore}<span class="letter">米</span>`);

        $div.find(".taName").html(CFG.shareNickName);
        $div.find(".taHeader").css("background-image", `url(${CFG.shareHeadUrl})`);
        $div.find(".taScore").html(`${GAME.tool.getParamUrl("shareScore")}<span class="letter">米</span>`);

        $div.find(".worldNum").html(data.rank);
        $div.find(".winNum").html((100 - data.prevail) + "%");
        $div.find(".bestNum").html(data.bestScore);

        $div.find(".dom4").addClass("fromRight");
        $div.find(".dom3").addClass("fromLeft");

        // anime({
        //     targets: $div.find(".dom4")[0],
        //     translateX: 640,
        //     opacity: 0,
        //     direction: 'reverse',
        //     delay: function(el, i, l) {
        //         return i * 10;
        //     }
        // });
        $div.css("display", "flex");
    }
}