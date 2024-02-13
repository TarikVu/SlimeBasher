
// Module aliases
var Bodies = Matter.Bodies

export class Tile {
    constructor({
        image,
        position,
    }
    ) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.scale = 2
        this.position = position;

        this.body = Bodies.rectangle(
            position.x,
            position.y,
            this.width * this.scale,
            this.height * this.scale,
            { isStatic: true }
        );

    }

    // update position w/ the body position 
    // Body position is updated w/ the physics engine.
    update(ctrl) {

        //this.position = this.body.position;
        this.draw()
    }
    draw() {



        ctx.drawImage(
            this.image,

            0,
            0,

            this.image.width,
            this.image.height,

            this.position.x - (this.image.width*this.scale) / 2,
            this.position.y - (this.image.height*this.scale) / 2,

            this.image.width * this.scale,
            this.image.height * this.scale

        );

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "blue"
        ctx.fillRect(
            this.body.vertices[0].x,
            this.body.vertices[0].y,
            this.width * this.scale,
            this.height * this.scale
        );
        ctx.globalAlpha = 1;



    }
}