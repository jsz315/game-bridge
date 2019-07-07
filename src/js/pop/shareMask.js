import {getHtmlByData} from '../tooler'

export default class ShareMask{

    constructor(){
        this.$div = $("#ShareSkin");
        this.$div.click(()=>{
            console.log("知道啦");
            this.hide();
        })
    }

    hide(){
        this.$div.hide();
    }

    show(data){
        this.$div.css("display", "flex");
        this.$div.find(".dom0_2").html(data.mask);
        if(data.shareSource == 1){
            //window.MtaH5.clickStat("pkresult_share_expose");
        }
    }
}