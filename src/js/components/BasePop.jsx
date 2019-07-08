import React from 'react'

class BasePop extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        
    }

    close = () => {
        this.props.onClose(0);
    }

    render(){
        return (
            <div onClick={this.close}></div>
        )
    }
}

export default BasePop;