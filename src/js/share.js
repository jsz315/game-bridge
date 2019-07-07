// import bridge from '@components/bridge/index';
import EventCenter from '../ts/core/EventCenter'

function start(obj, success){
    GAME.tool.hpGet("/youtui/context/getWxConfig", {
        url: window.location.href.split("#")[0]
    }, (res)=>{
        if(!res){
            console.warn("shared error");
            return;
        }
        console.log(res);

        var param = {
            contentId: CFG.gameId,
            contentType: 5,
            sourceToken: GAME.tool.getParamUrl("sourceToken"),
            sessionKey: CFG.sessionKey
        }
        if(GAME.tool.getParamUrl("consumerIdOrder")){
            param.consumerIdOrder = GAME.tool.getParamUrl("consumerIdOrder");
        }
        if(GAME.tool.getParamUrl("sourceUserId")){
            param.sourceUserId = GAME.tool.getParamUrl("sourceUserId");
        }
        if(GAME.tool.getParamUrl("sourceUnionId")){
            param.sourceUnionId = GAME.tool.getParamUrl("sourceUnionId");
        }
        
        if(obj.shareId){
            param.shareId = obj.shareId;
        }

        GAME.tool.hpGet("/youtui/share/commonShareUrl", param, (rsp)=>{
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                shareScore: obj.shareScore,
                shareRank: obj.shareRank,
                rankType: obj.rankType,
                headUrl: CFG.headUrl,
                nickName: CFG.nickName,
                jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"]
            });

            var url = rsp.data.clickUrl + appendParam({
                rankType: obj.rankType,
                //分享者成绩
                shareScore: obj.shareScore,
                //分享者排名
                shareRank: obj.shareRank,
                //分享者战胜世界排名百分数
                sharePrevail: obj.sharePrevail,
                //分享场景
                shareSource: obj.shareSource,
                share_source: obj.shareSource,
                //用户
                userid: CFG.sourceUserId,
                //分享根用户
                sourceUserId: CFG.sourceUserId,
                //用户标识
                sourceUnionId: CFG.sourceUnionId
            });

            console.log("分享链接：" + url);

            // alert(url);

            if (CFG.isPreview == 1) {
                // bridge.h5Share({
                //     shareType: 1,
                //     needDraw:0, 
                //     desc: obj.desc,
                //     imgUrl: obj.imgUrl,
                //     shareUrl: url,
                //     title: obj.title,
                //     toastText: '-1'
                // });
                return;
            }

            if(obj.gamePage != "game"){
                EventCenter.emit(EventCenter.POP_SHOW, {key: "shareMask", data: obj});
            }

            wx.ready(function () {
                var shareData = {
                    title: obj.title,
                    desc: obj.desc,
                    link: url,
                    imgUrl: obj.imgUrl,
                    success: function(){
                        // alert("分享成功");
                        // var extra = GAME.tool.paramWrapper([]);
                        // extra["enter_layer_source"] = obj.enter_layer_source;
                        // extra["layer_type"] = obj.layer_type;
                        // GAME.embed.embedExport(GAME.tool.append2Embed("share_success_click", extra));
                        success(obj);
                    }
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareQQ(shareData);
                wx.error(function (res) {
                    alert(JSON.stringify(res));
                });
            });
        })
        
    })
}

function appendParam(obj){
    var list = [];
    for(var i in obj){
        list.push(`${i}=${obj[i]}`);
    }
    return "&" + list.join("&");
}

export{
    start
}