import { Tooler } from "./Tooler";
import Config from "./Config";
import { Bar } from "./Bar";

export default class BarPool{

    private static list:Bar[] = [];
    private static max:number = 10;

    constructor(){
        
    }

    public static getBar(scene:BABYLON.Scene):Bar{
        var bar: Bar;
        if(BarPool.list.length > BarPool.max){
            bar = BarPool.list.shift();
        }
        if(!bar){
            bar = new Bar(scene);
        }
        bar.reset();
        BarPool.list.push(bar);
        // console.log(BarPool.list);
        return bar;
    }

    public static hideBars(){
        BarPool.list.forEach(element => {
            element.hide();
        });
    }
    
}