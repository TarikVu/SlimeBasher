import { Game } from './game.js'
import { Controller } from './controller.js'

// Utilize the event listener "load" to load in all assets "image"
window.addEventListener('load', function () {

    // Clear loading header
    const loading = this.document.getElementById('loading');
    loading.style.display = 'none';

    this.window.canvas = document.getElementById("gamescreen");
    this.window.ctx = canvas.getContext('2d');

    // Set up game screen
    canvas.width = 1600;
    canvas.height = 1200;

    const engine = Matter.Engine.create();

    const game = new Game({
        engine: engine,
        width: canvas.width,
        height: canvas.height
    });

    ctx.imageSmoothingEnabled = false;


    animate();


   // Starts the game
   function animate() {
       game.update();
       requestAnimationFrame(animate);
   }


  /*   let isRunning = true;
    let lastUpdate = performance.now();
    const fixedDelta = 1000 / 144;
    const runnerFunc = () => {
        const now = performance.now();

        while (progress < now) {
            Matter.Engine.update(engine, fixedDelta);
            lastUpdate += fixedDelta;
        }

        if (isRunning) {
            requestAnimationFrame(runnerFunc);
        }
    }
    requestAnimationFrame(runnerFunc);
 */

})

