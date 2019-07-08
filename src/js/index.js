import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './components/Modal';
import EventCenter from '../ts/core/EventCenter'
import ViewSkin from './components/ViewSkin'

import StartPop from './components/StartPop'
import ScorePop from './components/ScorePop'
import ResultPop from './components/ResultPop'
import RevivePop from './components/RevivePop'
import SharePop from './components/SharePop'
import RewardPop from './components/RewardPop'

// ReactDOM.unstable_renderSubtreeIntoContainer

(function () {
    if ( typeof window.CustomEvent === "function" ) return false;
    console.log("不支持 CustomEvent");
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail:  undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();


class Game extends React.Component {

    constructor(props){
        super(props);

        EventCenter.on(EventCenter.GAME_OVER, (data)=>{
            Modal.show(ResultPop);
        })

        EventCenter.on(EventCenter.SHOW_SHARE, (data)=>{
            Modal.show(SharePop);
        })

        EventCenter.on(EventCenter.SHOW_GAME, (data)=>{
            this.setState({
                show: true
            })
        })
        
        EventCenter.on(EventCenter.POP_SHOW, (data)=>{
            console.log("pop: " + data.key);
            if(data.key == "start"){
                Modal.show(StartPop);
            }
            else if(data.key == "score"){
                Modal.show(ScorePop);
            }
            else if(data.key == "revive"){
                // alert("show revive")
                Modal.show(RevivePop);
            }
            else if(data.key == "result"){
                Modal.show(Result);
            }
            else if(data.key == "reward"){
                Modal.show(RewardPop);
            }
        })
    }

    state = {
        auto: false,
        show: false
    }

    componentDidMount() {
        EventCenter.emit(EventCenter.INIT_GAME, {});
        Modal.show(StartPop);
    }

    toggleCamera = () => {
        this.setState({
            auto: !this.state.auto
        })
        EventCenter.emit(EventCenter.CHANGE_CAMERA, {auto: !this.state.auto});
    }

    render() {
        let style = {
            opacity: this.state.show ? 1 : 0
        }
        return (
            <div style={style}>
                <div className="game">
                    <div className={["controll" , this.state.auto ? "auto" : ""].join(" ")} onClick={this.toggleCamera}></div>
                    <canvas id="renderCanvas"></canvas>
                </div>
                <ViewSkin></ViewSkin>
            </div>
        );
    }
}

ReactDOM.render(<Game/>, document.getElementById("root"));