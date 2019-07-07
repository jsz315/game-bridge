import Reward from './reward'
import Start from './start'
import PkShare from './pkShare'
import Challenge from './challenge'
import HelpShare from './helpShare'
import Gain from './gain'
import Revive from './revive'
import Result from './result'
import Score from './score'
import ShareMask from './shareMask'
import Loading from './loading'
import Info from './info'
import Record from './record'
import Camera from './camera'
import Debug from './debug'
import EventCenter from '../../ts/core/EventCenter'
import {start} from '../share.js'
import Reflux from './reflux'

(function () {
    if ( typeof window.CustomEvent === "function" ) return false;
    console.log("不支持 CustomEvent");
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail:  undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();


// (function () {
//     var oHead = document.head;
//     var oScript = document.createElement('script');
//     oScript.type = "text/javascript";
//     oScript.src = "//yun.playpangu.com/h5-mami/optimize/eruda.min.js?t=20180514";
//     oHead.appendChild(oScript);
//     oScript.onload = function () { eruda.init() }
// })();

var pops = {
    reward: new Reward(),
    start: new Start(),
    pkShare: new PkShare(),
    challenge: new Challenge(),
    helpShare: new HelpShare(),
    gain: new Gain(),
    revive: new Revive(),
    result: new Result(),
    score: new Score(),
    loading: new Loading(),
    shareMask: new ShareMask(),
    info: new Info(),
    camera: new Camera(),
    reflux: new Reflux(),
    record: new Record(),
    debug: new Debug()
}

//是否点击过自己闯关
window.ChangeMode = false;
//是否用过复活币
window.UseRevive = false;

// pops.record.show();

console.log(window.location.href);

// track(1, {share_source: GAME.tool.getParamUrl("shareSource")});
setTimeout(()=>{

    // //window.MtaH5.clickStat("mainpage_expose");
    $(".bridgeGame .loading").hide();
    pops.debug.info("hide loading");

    if(CFG.isPreview != 1){
        EventCenter.emit(EventCenter.SHOW_SHARE, {
            title: "我过的桥比全世界80%的人走的路还多，你敢来挑战吗？",
            desc: "每天搬砖造桥，连接整个世界",
            mask: "邀请好友挑战",
            imgUrl: "http://yun.dui88.com/h5-mami/webgame/game/bridge/v1/assets/bridge-share.png",
            //分享编号
            shareId: GAME.tool.createUUID(12),
            //1全球排行 2好友挑战 3好友接力
            rankType: 1,
            //分享者成绩
            shareScore: 0,
            //分享者排名
            shareRank: 1,
            //分享者战胜世界排名百分数
            sharePrevail: 1,
            //分享场景
            shareSource: 1,
            //游戏页面类型
            gamePage: "game"
        });
    }

    pops.debug.show();
    
}, 1200)

GAME.tool.hpGet("/youtui/bridge/addCoin", {
    gameId: CFG.gameId,
    openid: GAME.tool.getParamUrl("openid")
}, (rsp)=>{
    pops.debug.info(JSON.stringify(rsp));
})

EventCenter.on(EventCenter.GAME_SCORE, (data)=>{
    console.log("得分:" + data.score);
    pops.info.addScore(data.score);
})

EventCenter.on(EventCenter.GAME_OVER, (data)=>{
    pops.result.show(pops.info.getScore());
})

EventCenter.on(EventCenter.SHOW_LEADER, (data)=>{
    pops.info.showLeader();
})

EventCenter.on(EventCenter.HIDE_LEADER, (data)=>{
    pops.info.hideLeader();
})

EventCenter.on(EventCenter.GAME_START, (data)=>{
    // console.log(data);
    // EventCenter.emit(EventCenter.INIT_GAME, {});
    pops.info.reset();
    window.UseRevive = false;
    EventCenter.emit(EventCenter.HIDE_REFLUX, {});
});

EventCenter.on(EventCenter.GAME_REVIVE, (data)=>{
    // console.log(data);
    pops.result.hide();
    window.UseRevive = true;
});

EventCenter.on(EventCenter.SHOW_GAME, (data)=>{
    // console.log(data);
    $(".game").css("opacity", 1);
    pops.info.show();
});

EventCenter.on(EventCenter.HIDE_GAME, (data)=>{
    // console.log(data);
    $(".game").css("opacity", 0);
    pops.info.hide();
});

EventCenter.on(EventCenter.SHOW_REFLUX, (data)=>{
    // console.log(data);
    pops.reflux.show();
});

EventCenter.on(EventCenter.HIDE_REFLUX, (data)=>{
    // console.log(data);
    pops.reflux.hide();
});

EventCenter.on(EventCenter.SHOW_RECORD, (data)=>{
    pops.record.show(data.score);
});

EventCenter.on(EventCenter.HIDE_RECORD, (data)=>{
    pops.record.hide();
});


EventCenter.on(EventCenter.POP_SHOW, (data)=>{
    pops.debug.info(JSON.stringify(data));
    pops.debug.info("pop: " + data.key);
    if(data.key == "start"){
        showStartPage(data.loading);
    }
    else if(data.key == "score"){
        pops[data.key].show(data.data);
    }
    else if(data.key == "challenge"){
        pops[data.key].show(data.data);
    }
    else if(data.key == "shareMask"){
        pops[data.key].show(data.data);
    }
    else{
        pops[data.key].show();
    }
})

EventCenter.on(EventCenter.POP_HIDE, (data)=>{
    
})

EventCenter.on(EventCenter.SHOW_SHARE, (data)=>{
    // //window.MtaH5.clickStat("sharegame_click");
    start(data, ()=>{
        // 1-来源结果页“邀请好友挑战”的分享
        // 2-来源结果页“邀请好友助力”的分享
        // 3-来源获取复活币的分享
        // 4-来源PK 结果页胜利炫耀成绩分享
        // track(801, {share_source: data.shareSource});
        if(data.shareSource == 1){      
            if(data.gamePage == "result"){
                // //window.MtaH5.clickStat("result_invite_pk_sucess");
            }   
            else if(data.gamePage == "pk"){   
                // //window.MtaH5.clickStat("pkresult_share_sucess");
            }
        }
        else if(data.shareSource == 2){
            // //window.MtaH5.clickStat("result_invite_help_sucess");
        }
        else if(data.shareSource == 3){
            // //window.MtaH5.clickStat("invite_share_sucess");
        }
    })
})

function showStartPage(loading){
    if(loading){
        var rankType = GAME.tool.getParamUrl("rankType");
        if(rankType == 1){
            pops.start.show();
        }
        else if(rankType == 2){
            pops.pkShare.show();
        }
        else if(rankType == 3){
            pops.helpShare.show();
        }
        else{
            pops.start.show();
        }
    }
    else{
        pops.start.show();
    }
}

pops.loading.show();
pops.reward.show();