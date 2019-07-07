import {getHtmlByData} from '../tooler'
import EventCenter from '../../ts/core/EventCenter'

export default class Score{
    constructor(){
        this.$div = $("#ScoreSkin");
        this.$div.find(".dom1_1_3").hide();

        this.$div.find(".dom2").click(()=>{
            console.log("邀请好友接力");
            // this.hide();
            // EventCenter.emit(EventCenter.POP_SHOW, {key: "shareMask"});
            EventCenter.emit(EventCenter.SHOW_SHARE, {
                title: "我的桥才造了" + this.data.currentScore + "米就塌了，求高手来帮我继续造~",
                desc: "每天搬砖造桥，连接整个世界",
                mask: "邀请好友接力",
                imgUrl: "http://yun.dui88.com/h5-mami/webgame/game/bridge/v1/assets/bridge-share.png",
                //分享编号
                shareId: GAME.tool.createUUID(12),
                //1全球排行 2好友挑战 3好友接力
                rankType: 3,
                //分享者成绩
                shareScore: this.data.currentScore,
                //分享者排名
                shareRank: this.data.rank,
                //分享者战胜世界排名百分数
                sharePrevail: this.data.prevail,
                //分享场景
                shareSource: 2
            });
        })

        this.$div.find(".dom3").click(()=>{
            console.log("邀请好友挑战");
            // this.hide();
            // EventCenter.emit(EventCenter.POP_SHOW, {key: "shareMask"});
            track(8, {share_source: 1});
            EventCenter.emit(EventCenter.SHOW_SHARE, {
                title: `我过的桥比全世界${100-this.data.prevail}%的人走的路还多，你敢来挑战吗？`,
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
                shareSource: 1,
                //游戏页面类型
                gamePage: "result"
            });
        })

        this.$div.find(".dom5").click(()=>{
            console.log("再来一次");
            this.hide();
            EventCenter.emit(EventCenter.GAME_START, {});
        })

        this.$div.find(".dom0").click(()=>{
            console.log("返回首页");
            this.hide();
            EventCenter.emit(EventCenter.POP_SHOW, {key: "start"});
            //window.MtaH5.clickStat("result_backmain");
        })
                
    }

    hide(){
        this.$div.hide();
        this.$div.find(".dom1_1_3").hide();
        // this.GameReflux && this.GameReflux.destroy();
    }

    show(data){

        EventCenter.emit(EventCenter.SHOW_REFLUX, {});
        //window.MtaH5.clickStat("resultpage_expose");        
        this.data = data;
        this.$div.css("display", "flex");

        this.$div.find(".dom1_2_1").html(`本次得分已超越了${100-data.prevail}%的玩家`);
        this.$div.find(".taName").html(CFG.nickName);
        this.$div.find(".taHeader").css("background-image", `url(${CFG.headUrl})`);

        this.$div.find(".taScore").html(`${data.currentScore}<span class="letter">米</span>`);
        if(data.rank > 1000){
            this.$div.find(".taScore0").html(`1000+`);
        }
        else{
            this.$div.find(".taScore0").html(`${data.rank}<span class="letter">名</span>`);
        }        
        this.$div.find(".taScore2").html(`${data.bestScore}<span class="letter">米</span>`);

        var tip;
        var num = Math.random();
        if(data.prevail > 50){
            if(num > 0.5){
                tip = `我才造了<span class="max">${data.currentScore}</span>米的桥，求大神接力！`;
            }
            else{
                tip = `每天搬砖造桥还不如<span class="max">${data.prevail}%</span>的人~`;
            }
            this.$div.find(".dom4").attr("class", "dom4 help");
        }
        else{
            if(num < 0.3){
                tip = `打败了<span class="max">${100-data.prevail}%</span>的人，快邀请好友来挑战吧！`;
            }
            else if(num < 0.6){
                tip = `分享到群查看好友排名哦~！`;
            }
            else{
                tip = `分享到朋友圈查看全部好友排名~`;
            }
            this.$div.find(".dom4").attr("class", "dom4 pk");
        }
        this.$div.find(".dom4_1").html(tip);
        
        if(data.bestScore <= data.currentScore){
            this.$div.find(".dom1_1_3").show();
        }
    }
}