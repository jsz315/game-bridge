export default class Info{

    constructor(){
        this.$div = $("#InfoSkin");
        this._score = 0;
        this.showScore();
        this.$div.find(".scoreBox").hide();
        // this.hide();
    }

    reset(){
        this._score = 0;
        this.showScore();
        this.showLeader();
    }

    addScore(n){
        this._score += n;
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
            this.$div.find(".scoreTip").html(tip);
            this.$div.find(".scoreNum").html("+" + n);
            this.$div.find(".scoreBox").show();
            setTimeout(()=>{
                this.$div.find(".scoreBox").hide();
            }, 2400);
            this.$div.find(".scoreBox").attr("class", "scoreBox " + key).show();
        }
                
        this.showScore();
    }

    showLeader(){
        this.$div.find(".leader").show();
    }

    hideLeader(){
        this.$div.find(".leader").hide();
    }

    showScore(){
        this.$div.find(".userScore").html(this._score);
    }

    hide(){
        this.$div.hide();
    }

    show(){
        this.showLeader();
        this.$div.css("display", "flex");
    }

    getScore(){
        return this._score;
    }
}