// import { Game } from './game';
import 'babylonjs-materials';
import 'babylonjs-loaders';
// import CANNON = require('cannon');
import {Game} from './core/Game';
import EventCenter from './core/EventCenter';

// window.CANNON = CANNON;
// var game:Game = null;
// EventCenter.on(EventCenter.INIT_GAME, ()=>{
//     if(game == null){
//         game = new Game('renderCanvas');
//         game.createScene();
//         game.animate();
//     }
// })

// declare var $: any;

// setTimeout(() => {
//     EventCenter.emit(EventCenter.GAME_START, {});
//     $(".game").css('opacity', 1);
//     $(".loading").hide();
// }, 1200);


let game = new Game('renderCanvas');
game.createScene();
game.animate();