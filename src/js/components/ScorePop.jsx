import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class ScorePop extends BasePop{
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

    help = () => {
        // this.props.onClose(0);
        EventCenter.emit(EventCenter.SHOW_SHARE, {
            title: "我的桥才造了10米就塌了，求高手来帮我继续造~",
            desc: "每天搬砖造桥，连接整个世界",
            mask: "邀请好友接力",
            imgUrl: "http://yun.dui88.com/h5-mami/webgame/game/bridge/v1/assets/bridge-share.png",
            //分享编号
            shareId: GAME.tool.createUUID(12),
            //1全球排行 2好友挑战 3好友接力
            rankType: 3,
            //分享者成绩
            shareScore: 10,
            //分享者排名
            shareRank: 1,
            //分享者战胜世界排名百分数
            sharePrevail: 50,
            //分享场景
            shareSource: 2
        });
    }

    again = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.GAME_START, {});
        EventCenter.emit(EventCenter.SHOW_GAME, {});
    }

    render(){
        let style = {
            'backgroundImage': `url(${window.CFG.headUrl})`
        }
        return (
            <div className='ScoreSkin pages'>
                <div className='dom1'>
                    <div className='dom1_0'></div>
                    <div className='dom1_1'>
                        <div className='taHeader' style={style}></div>
                        <div className='taName one-line'>jsz</div>
                        <div className='taScore num'>100</div>
                        <div className='dom1_1_3'></div>
                    </div>
                    <div className='dom1_2'>
                        <div className='dom1_2_0'></div>
                        <div className='dom1_2_1'>本次得分已超越了90%的玩家</div>
                    </div>
                    <div className='dom1_3'>
                        <div className='taScore0 num'>4</div>
                        <div className='taScore1'>今日全球排名</div>
                        <div className='taScore2 num'>60</div>
                        <div className='taScore3'>历史最佳成绩</div>
                        <div className='dom1_3_4'></div>
                    </div>
                </div>
                <div className='dom2' onClick={this.help}></div>
                <div className='dom3' onClick={this.help}></div>
                <div className='dom4'>
                    <div className='dom4_0'></div>
                    <div className='dom4_1'>打败了90%的人，快邀请好友来挑战吧！</div>
                </div>
                <div className='dom5' onClick={this.again}></div>
            </div>
        )
    }
}

export default ScorePop;