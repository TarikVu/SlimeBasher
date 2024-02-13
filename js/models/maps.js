
// collections of the maps for the game. 
 import { Slime } from '/js/models/slime.js'
import { Tile } from '/js/models/tile.js' 

var Composite = Matter.Composite;
export class Shop {
    constructor(game) {

        this.background = document.getElementsByClassName('background')[0];
        this.sprites = {};
        this.enemies = [];
        this.tiles = [];

        this.bodies =[];
        this.height = game.height;
        this.width = game.width;
        this.world = game.engine.world;

        const floorImage = document.getElementById("grass");



        //slime
        this.slime = new Slime({
            position: { x: 150, y: 50 },
        });

        this.enemies.push(this.slime);
        this.bodies.push(this.slime.body);


        //floor
        this.floor = new Tile({
            image: floorImage,
            position: { x: 450, y: this.height/2 },
        });

        this.tiles.push(this.floor);
        this.bodies.push(this.floor.body);



        // Add the bodies to engine
        Composite.add(this.world, this.bodies);
    }


    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.slime.update()
        this.floor.update()
        this.draw();
    }

    draw() {
        


    }


}