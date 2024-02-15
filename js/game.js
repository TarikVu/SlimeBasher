
import { Controller } from './controller.js'
import { Player } from './models/player.js'


import { Shop } from './models/maps.js'
import { PauseMenu } from './models/pausemenu.js'


// Module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

export class Game {
    constructor(
        {
            width,
            height
        }
    ) {

        this.width = width;
        this.height = height;

        // Set up physics and Game world
        this.engine = Engine.create();
        this.world = this.engine.world;

        this.player = new Player();
        this.ctrl = new Controller();
        this.map = new Shop(this,this.player);

        // Add to move the sprites w/ the mouse (for now)
        const mouseConstraint = Matter.MouseConstraint.create(
            this.engine, { element: canvas }
        );
        Composite.add(this.world, mouseConstraint)


        // Run the physics engine for the game
        Runner.run(this.engine);
    }





    // Looped from main
    update() {

        // Updates the current gameworld's map.
        this.map.update(this.ctrl);
        
    }



}