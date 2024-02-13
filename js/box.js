
// Module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

export class Box {
    constructor({
        game,
        position,
        dimensions,
        isStatic = false
    }
    ) {

        this.position = position;
        this.width = dimensions.width;
        this.height = dimensions.height;

        this.body = Bodies.rectangle(
            position.x,
            position.y,
            dimensions.width,
            dimensions.height, {
            isStatic: isStatic
        });
    }

    // update position w/ the body position 
    // Body position is updated w/ the physics engine.
    update(ctrl) {
        
        
      /*   if(ctrl.keys.some(x => x.toLowerCase() == 'd')){
        } */

     
        
        this.position = this.body.position;
    }
}