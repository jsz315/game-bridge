import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class StartPop extends BasePop{
    constructor(props){
        super(props);
    }

    state = {
        rank: 3,
        best: 16
    }

    close = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.GAME_START, {});
        EventCenter.emit(EventCenter.SHOW_GAME, {});
    }

    render(){
        return (
            <div className='StartSkin pages'>
                <div className='dom0'></div>
                <div className='dom1' onClick={this.test}>
                    <div className='dom1_0'></div>
                    <div className='worldList'></div>
                    <div className='dom1_2'>世界排名</div>
                    <div className='dom1_3'>最佳成绩</div>
                </div>
                <div className='dom2'>
                    <div className='dom2_0'></div>
                    <div className='dom2_1'>
                        <div className='dom2_1_0'></div>
                        <div className='sendTip'>每日1点发放奖金  更新榜单</div>
                    </div>
                    <div className='dom2_2'>
                        <div className='dom2_2_0'></div>
                        <div className='myName one-line'>jsz</div>
                        <div className='myRank'>我的排名：{this.state.rank}名</div>
                        <div className='myBest'>最佳成绩：{this.state.best}米</div>
                    </div>
                </div>
                <div className='startBtn' onClick={this.close}></div>
            </div>
        )
    }
}

export default StartPop;