export default class Record{

    constructor(){
        this.$div = $("#RecordSkin");
    }

    hide(){
        this.$div.hide();
    }

    show(num){
        var str = num + "";
        var list = [];
        for(var i = 0; i < str.length; i++){
            list.push(`<div class='num${str[i]} num'></div>`);
        }
        this.$div.find(".FontSkin").html(list.join(""));
        this.$div.css("display", "flex");
    }
}