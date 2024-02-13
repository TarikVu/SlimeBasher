
// Module aliases
var Bodies = Matter.Bodies

export class Tile {
    constructor({
        image,
        position,
    }
    ) {
        this.image = image;
        this.position = position;
        this.width = image.width;
        this.height = image.height;

        this.body = Bodies.rectangle(
            position.x,
            position.y,
            this.width,
            this.height,
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
        

        ctx.fillStyle = "blue"


        console.log(this.body.vertices)
        ctx.fillRect(
            this.body.vertices[0].x,
            this.body.vertices[0].y,
            this.body.vertices[1].x-this.body.vertices[0].x,
            this.body.vertices[3].y-this.body.vertices[0].y
        );

    }
}