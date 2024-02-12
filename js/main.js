import { Game } from './game.js'
import { Controller } from './controller.js'
// Utilize the event listener "load" to load in all assets "image"
window.addEventListener('load', function () {
    this.window.canvas = document.getElementById("gamescreen");
    this.window.ctx = canvas.getContext('2d');


    // Set up game screen
    canvas.width = 1440;
    canvas.height = 900;

    ctx.fillText("hi",100,100);

    const ctrl = new Controller();
    const game = new Game({
        width: canvas.width,
        height: canvas.height
    });
 


    function animate(){
        game.update();
        requestAnimationFrame(animate);
    }

    animate();

})
