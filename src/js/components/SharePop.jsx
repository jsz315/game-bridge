import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class SharePop extends BasePop{
    constructor(props){
        super(props);
    }

    state = {
        num: 1
    }

    close = () => {
        this.props.onClose(0);
        // EventCenter.emit(EventCenter.POP_SHOW, {key: "score", data: {}});
    }

    render(){
        return (
            <div className='ShareSkin'>
                <div className='dom0'>
                    <div className='dom0_0'></div>
                    <div className='dom0_1'>点击右上角选择分享到群或朋友圈</div>
                    <div className='dom0_2'>让好友来挑战吧</div>
                    <div className='knowBtn' onClick={this.close}></div>
                </div>
            </div>
        )
    }
}

export default SharePop;