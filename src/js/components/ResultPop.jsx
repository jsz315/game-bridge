import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class ResultPop extends BasePop{
    constructor(props){
        super(props);
    }

    state = {
        num: 1
    }

    skip = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.POP_SHOW, {key: "score", data: {}});
    }

    use = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.POP_SHOW, {key: "revive"});
    }

    render(){
        return (
            <div className='ResultSkin pages'>
                <div className='dom0'></div>
                <div className='dom1' onClick={this.skip}>点击跳过</div>
                <div className='dom2 num'>215<span className="small">米</span></div>
                <div className='dom3'>
                    <div className='tip'>太棒了，全球排名第一</div>
                </div>
                <div className='dom4' onClick={this.use}></div>
            </div>
        )
    }
}

export default ResultPop;