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

    const game = new Game({
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


})

