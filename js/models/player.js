import { Sprite } from './sprite.js'
var Bodies = Matter.Bodies

const IDLE = 0,
    RUNNING = 1


export class Player {
    constructor(
        {
            position,
            debug = true,
            flipped = false
        }
    ) {

        this.bodyWidth = 80;
        this.bodyHeight = 135;

        this.position = position;
        this.flipped = false;

        var images = document.getElementsByClassName('player')
        this.debug = debug;

        this.states = [IDLE, RUNNING];
        this.sprites = [];


        this.body = Bodies.rectangle(
            this.position.x,
            this.position.y,
            this.bodyWidth,
            this.bodyHeight,
            {
                inertia: Infinity,
                restitution: 0,
                friction: 1
            });

        // Create and add a new sprite per image
        for (var i in images) {
            var s = new Sprite({
                image: images[i],
                spriteDims: { width: 120, height: 80 },
                scale: 3.5,
                debug: this.debug
            });
            this.sprites.push(s);
        }

        this.currentState = this.states[0];
        this.currentSprite = this.sprites[0];


    }

    setState(stateID) {
        this.currentState = this.states[stateID];
        this.currentSprite = this.sprites[stateID];

    }


    update(ctrl) {

        /* if (ctrl.keys === undefined || ctrl.keys.length == 0) {
            this.setState(IDLE);
        }
        if (ctrl.keys === 'd') {
            this.setState(RUNNING);
        }*/

        this.position = this.body.vertices[0];
        this.currentSprite.position.y = this.position.y - 145;
        this.currentSprite.position.x = this.position.x - 150;

        this.currentSprite.update();

        if (this.debug) {
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.bodyWidth,
                this.bodyHeight,
            );
            ctx.globalAlpha = 1.0;

        }
    }

    draw() {

    }
}
