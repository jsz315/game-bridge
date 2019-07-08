import React from 'react'
import StartPop from '../components/StartPop'
import Modal from '../components/Modal'

class Start extends React.Component{
    state = {
        rank: 1,
        best: 60
    }

    test = ()=> {
        // Test.open({num: 100});
        console.log("StartPop");
        Modal.show(StartPop, (n) => {
            alert(n);
        });
    }

    render(){
        return (
            <div className="pop-mask" id="StartSkin">
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
                    <div className='startBtn'></div>
                </div>
            </div>
        )
    }
}

export default Start;