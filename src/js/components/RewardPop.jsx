import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class RewardPop extends BasePop{
    constructor(props){
        super(props);
    }

    state = {
        num: 1
    }

    render(){
        return (
            <div className='RewardSkin'>
                <div className='dom0'></div>
                <div className='goodBtn' onClick={this.close}></div>
                <div className='dom2'>获得排名奖金<span className="red">100</span>金币</div>
            </div>
        )
    }
}

export default RewardPop;