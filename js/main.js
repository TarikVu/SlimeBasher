import { Game } from './game.js'
import { Controller } from './controller.js'

// Utilize the event listener "load" to load in all assets "image"
window.addEventListener('load', function () {
    this.window.canvas = document.getElementById("gamescreen");
    this.window.ctx = canvas.getContext('2d');


    // Set up game screen
    canvas.width = 1440;
    canvas.height = 900;

   
    const ctrl = new Controller();
    const game = new Game({
        width: canvas.width,
        height: canvas.height
    });
 


    function animate(){
        game.update(ctrl);
        requestAnimationFrame(animate);
    }

    animate();


/* // module aliases
 var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine); 

 */

})

