
// collections of the maps for the game. 
import { Slime } from '/js/models/slime.js'
import { Tile } from '/js/models/tile.js'
import { Bounds } from '/js/models/bounds.js'



var Composite = Matter.Composite,
    Bodies = Matter.Bodies
export class Shop {
    constructor(game,player) {

        this.background = document.getElementsByClassName('field');
        this.player = player;

        this.sprites = [];
        this.enemies = [];
        this.tiles = [];
        this.bodies = [];

        this.height = game.height;
        this.width = game.width;
        this.world = game.engine.world;
        this.bounds = new Bounds(this.width, this.height);

        //slime
        this.slime = new Slime({
            position: { x: 0, y: 0 },
        });

        this.enemies.push(this.slime);
        this.bodies.push(this.slime.body);

        this.slime2 = new Slime({
            position: { x: 550, y: 50 },
        });

        this.enemies.push(this.slime2);
        this.bodies.push(this.slime2.body);


        //floor
        const floorImage = document.getElementById("grass");

        this.floor = new Tile({
            image: floorImage,
            position: { x: 0, y: this.height - floorImage.height },
        });
        this.floor2 = new Tile({
            image: floorImage,
            position: { x: this.width / 2, y: this.height - floorImage.height },
        });


        // Add Sprites to be updated
        this.tiles.push(this.floor);
        this.tiles.push(this.floor2);

        // Add to all bodies to be updated
        this.bodies.push(this.floor.body);
        this.bodies.push(this.floor2.body);

        this.bodies.push(this.bounds.wallTop);
        this.bodies.push(this.bounds.wallBot);
        this.bodies.push(this.bounds.wallLeft);
        this.bodies.push(this.bounds.wallRight);

        // Add the bodies to Matter.js engine
        Composite.add(this.world, this.bodies);
    }



    drawBG(ctrl) {

        for (var img of this.background) {

            // Parallax effect 
            var move_val = img.getAttribute('data-value');
            var x = ctrl.mouse.x * move_val / 700
            //var y = ctrl.mouse.y * move_val / 2000

            // Draw the image slightly larger than screen
            // and offset to the left in order to acc for parallax.
            ctx.drawImage(img,
                x - 100, // offset
                //y,
                0,
                this.width + 150,  // slightly bigger
                this.height - 55); // adjust for floor sprite

        }
    }
    update(ctrl) {

        this.drawBG(ctrl);


        for (var e in this.enemies) {
            this.enemies[e].update()
        }

        for (var t in this.tiles) {
            this.tiles[t].update();
        }

        this.player.update(ctrl);



    }


}