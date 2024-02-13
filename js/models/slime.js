import { Sprite } from './sprite.js'

// Module aliases
var Bodies = Matter.Bodies

export class Slime {
    constructor({
        position,
    }
    ) {

        this.position = position;
        this.width = 80;
        this.height = 40;
        this.image = document.getElementsByClassName("enemy")[0];
        this.showBodyBox = true;
        this.flipped = false;

        this.sprite = new Sprite(
            {
                image: this.image,
                position: this.position,
                flipped: this.flipped,
                scale: 3,
                ColRow: { cols: 8, rows: 3 },
                framesHold: 18,
                offset: { x: 10, y: 30 },
                showDrawBox: true
            }
        );

        this.body = Bodies.rectangle(
            position.x,
            position.y,
            this.width,
            this.height,
            {inertia: Infinity} // keeps ctx.draw consistent w/ body. (disables rotations)
        );

    }

    // update position w/ the body position 
    // Body position is updated w/ the physics engine.
    update(ctrl) {

        this.position = this.body.vertices[0];
        this.sprite.position = this.position
        this.sprite.update();

        if(this.showBodyBox){
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
            ctx.globalAlpha = 1.0;
    
        }
    }


}