import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class RevivePop extends BasePop{
    constructor(props){
        super(props);
    }

    state = {
        num: 1
    }

    close = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.POP_SHOW, {key: "score", data: {}});
    }

    revive = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.GAME_REVIVE, {});
    }

    invite = () => {
        // this.props.onClose(0);
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
    }

    render(){
        return (
            <div className='ReviveSkin'>
                <div className='dom0'></div>
                <div className='dom1' onClick={this.revive}></div>
                <div className='dom2' onClick={this.invite}></div>
                <div className='dom3'>
                    <div className='dom3_0'></div>
                    <div className='dom3_1'>目前拥有：</div>
                    <div className='dom3_2'>2（上限5个）</div>
                </div>
                <div className='dom4'>
                    <div className='dom4_0'>说明：</div>
                    <div className='dom4_1'>每天首次登陆立刻赠送1个。 邀请群友点入你的分享链接 可恢复1个</div>
                </div>
                <div className='dom5'></div>
                <div className='dom6'>复活币</div>
                <div className="close" onClick={this.close}></div>
            </div>
        )
    }
}

export default RevivePop;