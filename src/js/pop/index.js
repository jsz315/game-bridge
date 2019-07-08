// import Reward from './reward'
// import Start from './start'
// import PkShare from './pkShare'
// import Challenge from './challenge'
// import HelpShare from './helpShare'
// import Gain from './gain'
// import Revive from './revive'
// import Result from './result'
// import Score from './score'
// import ShareMask from './shareMask'
// import Loading from './loading'
// import Info from './info'
// import Record from './record'
// import Camera from './camera'
// import Debug from './debug'
// import EventCenter from '../../ts/core/EventCenter'
// import {start} from '../share.js'
// import Reflux from './reflux'

// import Modal from '../components/Modal'
// import StartPop from '../components/StartPop'
// import ScorePop from '../components/ScorePop'
// import ResultPop from '../components/ResultPop'
// import RevivePop from '../components/RevivePop'
// import SharePop from '../components/SharePop'
// import RewardPop from '../components/RewardPop'



// (function () {
//     var oHead = document.head;
//     var oScript = document.createElement('script');
//     oScript.type = "text/javascript";
//     oScript.src = "//yun.playpangu.com/h5-mami/optimize/eruda.min.js?t=20180514";
//     oHead.appendChild(oScript);
//     oScript.onload = function () { eruda.init() }
// })();

// var pops = {
//     reward: new Reward(),
//     start: new Start(),
//     pkShare: new PkShare(),
//     challenge: new Challenge(),
//     helpShare: new HelpShare(),
//     gain: new Gain(),
//     revive: new Revive(),
//     result: new Result(),
//     score: new Score(),
//     loading: new Loading(),
//     shareMask: new ShareMask(),
//     info: new Info(),
//     camera: new Camera(),
//     reflux: new Reflux(),
//     record: new Record(),
//     debug: new Debug()
// }

//是否点击过自己闯关
window.ChangeMode = false;
//是否用过复活币
window.UseRevive = false;

// pops.record.show();

// console.log(window.location.href);

// track(1, {share_source: GAME.tool.getParamUrl("shareSource")});
// setTimeout(()=>{

//     $(".bridgeGame .loading").hide();
//     pops.debug.info("hide loading");

//     if(CFG.isPreview != 1){
//         EventCenter.emit(EventCenter.SHOW_SHARE, {
//             title: "我过的桥比全世界80%的人走的路还多，你敢来挑战吗？",
//             desc: "每天搬砖造桥，连接整个世界",
//             mask: "邀请好友挑战",
//             imgUrl: "http://yun.dui88.com/h5-mami/webgame/game/bridge/v1/assets/bridge-share.png",
//             //分享编号
//             shareId: GAME.tool.createUUID(12),
//             //1全球排行 2好友挑战 3好友接力
//             rankType: 1,
//             //分享者成绩
//             shareScore: 0,
//             //分享者排名
//             shareRank: 1,
//             //分享者战胜世界排名百分数
//             sharePrevail: 1,
//             //分享场景
//             shareSource: 1,
//             //游戏页面类型
//             gamePage: "game"
//         });
//     }

//     // pops.debug.show();
    
// }, 1200)

// GAME.tool.hpGet("/youtui/bridge/addCoin", {
//     gameId: CFG.gameId,
//     openid: GAME.tool.getParamUrl("openid")
// }, (rsp)=>{
//     pops.debug.info(JSON.stringify(rsp));
// })

// EventCenter.on(EventCenter.GAME_SCORE, (data)=>{
//     console.log("得分:" + data.score);
//     pops.info.addScore(data.score);
// })



// EventCenter.on(EventCenter.SHOW_LEADER, (data)=>{
//     pops.info.showLeader();
// })

// EventCenter.on(EventCenter.HIDE_LEADER, (data)=>{
//     pops.info.hideLeader();
// })

// EventCenter.on(EventCenter.GAME_START, (data)=>{
//     pops.info.reset();
//     window.UseRevive = false;
//     EventCenter.emit(EventCenter.HIDE_REFLUX, {});
// });

// EventCenter.on(EventCenter.GAME_REVIVE, (data)=>{
//     pops.result.hide();
//     window.UseRevive = true;
// });

// EventCenter.on(EventCenter.SHOW_GAME, (data)=>{
//     $(".game").css("opacity", 1);
//     pops.info.show();
// });

// EventCenter.on(EventCenter.HIDE_GAME, (data)=>{
//     $(".game").css("opacity", 0);
//     pops.info.hide();
// });

// EventCenter.on(EventCenter.SHOW_REFLUX, (data)=>{
//     pops.reflux.show();
// });

// EventCenter.on(EventCenter.HIDE_REFLUX, (data)=>{
//     pops.reflux.hide();
// });

// EventCenter.on(EventCenter.SHOW_RECORD, (data)=>{
//     pops.record.show(data.score);
// });

// EventCenter.on(EventCenter.HIDE_RECORD, (data)=>{
//     pops.record.hide();
// });

// EventCenter.on(EventCenter.GAME_OVER, (data)=>{
//     console.log("EventCenter.GAME_OVER");
//     Modal.show(ResultPop);
// })

// EventCenter.on(EventCenter.POP_SHOW, (data)=>{
//     console.log("pop: " + data.key);
//     if(data.key == "start"){
//         showStartPage(data.loading);
//     }
//     else if(data.key == "score"){
//         // pops[data.key].show(data.data);
//         Modal.show(ScorePop);
//     }
//     else if(data.key == "challenge"){
//         pops[data.key].show(data.data);
//     }
//     else if(data.key == "shareMask"){
//         pops[data.key].show(data.data);
//     }
//     else if(data.key == "revive"){
//         // alert("show revive")
//         Modal.show(RevivePop);
//     }
//     else if(data.key == "result"){
//         Modal.show(Result);
//     }
//     else if(data.key == "reward"){
//         Modal.show(RewardPop);
//     }
//     else{
//         pops[data.key].show();
//     }
// })

// EventCenter.on(EventCenter.POP_HIDE, (data)=>{
    
// })

// EventCenter.on(EventCenter.SHOW_SHARE, (data)=>{
//     Modal.show(SharePop);
// })

// function showStartPage(loading){
//     if(loading){
//         var rankType = GAME.tool.getParamUrl("rankType");
//         if(rankType == 1){
//             Modal.show(StartPop);
//         }
//         else if(rankType == 2){
//             pops.pkShare.show();
//         }
//         else if(rankType == 3){
//             pops.helpShare.show();
//         }
//         else{
//             Modal.show(StartPop);
//         }
//     }
//     else{
//         Modal.show(StartPop);
//     }
// }

// pops.loading.show();
// pops.reward.show();