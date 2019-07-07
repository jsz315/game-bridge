export default class Reward{
    constructor(){
        this.$div = $("#RewardSkin");
        this.$div.find(".goodBtn").click(()=>{
            console.log("太棒啦");
            this.hide();
        })
    }

    hide(){
        this.$div.hide();
    }

    show(){
        if(CFG.winningRecord != 0 && CFG.isPreview == 1){
            this.$div.css("display", "flex");
            this.$div.find(".dom2").html(`获得排名奖金<span class="red">${CFG.winningRecord}</span>金币`);
        }
    }
    
}