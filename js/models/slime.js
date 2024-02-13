
// Module aliases
var Bodies = Matter.Bodies
 
export class Slime {
    constructor({
        position,
    }
    ) {

        this.position = position;
        this.width = 50;
        this.height = 50;

        this.body = Bodies.rectangle(
            position.x,
            position.y,
            this.width,
            this.height
            );

    }

    // update position w/ the body position 
    // Body position is updated w/ the physics engine.
    update(ctrl) {
        this.position = this.body.position;
        this.draw();
    }

    draw(){
        ctx.fillStyle = "black"
        
         ctx.fillRect(
            this.body.vertices[0].x,
            this.body.vertices[0].y,this.width,this.height

        ); 

        
    }
}