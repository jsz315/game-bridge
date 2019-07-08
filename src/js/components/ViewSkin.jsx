import React from 'react'
import BasePop from './BasePop'
import EventCenter from '../../ts/core/EventCenter'

class ViewSkin extends React.Component{

    constructor(props){
        super(props);
        EventCenter.on(EventCenter.GAME_SCORE, (data)=>{
            this.addScore(data.score);
        })

        EventCenter.on(EventCenter.GAME_START, (data)=>{
            this.setState({
                score: 0,
                num: 0,
                tip: '',
                key: '',
                show: false,
                leader: true
            })
        });

        EventCenter.on(EventCenter.HIDE_LEADER, (data)=>{
            this.setState({
                leader: false
            })
        })
    }

    state = {
        score: 0,
        num: 0,
        tip: '',
        key: '',
        show: false,
        leader: true
    }

    addScore(n){
        var key = "";
        var tip = "";
        if(n == 4){
            key = "wanmei";
            tip = "完美";
        }
        else if(n == 3){
            key = "youxiu";
            tip = "优秀";
        }
        else if(n == 2){
            key = "yiban";
            tip = "一般";
        }
        else if(n == 1){
            key = "jige";
            tip = "及格";
        }

        if(key){
            setTimeout(()=>{
                this.setState({
                    show: false
                });
            }, 2400);
        }
        
        this.setState({
            num: n,
            tip: tip,
            score: this.state.score + n,
            key: key,
            show: key ? true : false
        })
    }


    close = () => {
        this.props.onClose(0);
        EventCenter.emit(EventCenter.GAME_START, {});
        EventCenter.emit(EventCenter.SHOW_GAME, {});
    }

    render(){
        return (
            <div className='InfoSkin'>
                <div className='userScore num'>{this.state.score}</div>
                {
                    this.state.leader && <div className='leader'></div>
                }
                {
                    this.state.show && 
                        (
                        <div className={['scoreBox', this.state.key].join(' ')}>
                            <div className='scoreFrame'></div>
                            <div className='dom2_1'>
                                <div className='scoreBg'></div>
                                <div className='scoreTip'>{this.state.tip}</div>
                                <div className='scoreNum num'>+{this.state.num}</div>
                            </div>
                        </div>
                        )
                }
            </div>
        )
    }
}

export default ViewSkin;