export default class Debug{
    constructor(){
        this._list = [];

        // $(".debug").click(()=>{
        //     $(".debug").toggleClass("show");
        // })

        // var log = window.console.log;
        // window.console.log = (tip)=>{
        //     this.info(tip);
        //     log(tip);
        // }
    }

    start(){

    }

    info(tip){
        // this._list.push(tip);
    }

    show(){
        // var div = [];
        // for(var i = 0; i < this._list.length; i++){
        //     div.push(`<div class="tip">${this._list[i]}</div>`);
        // }
        // $(".debug").html(div.join("")).addClass("show");
    }
}