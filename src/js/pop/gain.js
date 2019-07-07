import {getHtmlByData} from '../tooler'

export default class Gain{

    constructor(){
        this.$div = $("#FecthSkin");
        this.$div.find(".downloadBtn").click(()=>{
            console.log("立即下载");
            this.hide();
        })

        this.$div.find(".closeBtn").click(()=>{
            console.log("关闭");
            this.hide();
        })
    }

    hide(){
        this.$div.hide();
    }

    show(){
        this.$div.css("display", "flex");
    }
}