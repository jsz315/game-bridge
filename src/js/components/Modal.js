import React from 'react'
import ReactDom from 'react-dom'

const Modal = {

    show: function(Component, callback, zIndex = 100){
        // debugger
        let body = document.body;
        let dom = document.createElement("div");
        dom.setAttribute("class", "modal");
        dom.style.zIndex = zIndex;
        body.appendChild(dom);

        let close = (param) => {
            ReactDom.unmountComponentAtNode(dom);
            body.removeChild(dom);
            callback && callback(param);
        }

        ReactDom.render(
            <Component onClose={close} />,
            dom
        );
    }
}

export default Modal;