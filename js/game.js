import { Player } from './models/player.js'
import { Shop } from './models/maps.js'
import { PauseMenu } from './models/pausemenu.js'
import { Box } from './box.js'

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
        
        // Set up physics
        this.engine = Engine.create();
        this.world = this.engine.world;

        var render = Render.create({
            element: canvas,
            engine: this.engine
        });
        

        const mouseConstraint = Matter.MouseConstraint.create(
            this.engine, {element: canvas}
          );

        this.map = new Shop(this);

        Composite.add(this.world,mouseConstraint)
        
        Render.run(render);
        Runner.run(this.engine);

    }





    // Looped from main
    update(ctrl) {

        

        var bodies = this.map.bodies;
        this.map.update()

   
        


    }



    draw() {
        this.drawImageScaled(this.map.background, canvas)
    }


    // Scales Bg to game screen REF: README
    drawImageScaled(img, canvas) {
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }











    /* 
    
    /////constructor////////////
    
    
             // this.pause = new PauseMenu(this);
            this.player = new Player(this);
            this.map = new Shop(this);
            this.map.load();
    
            // Matter.js Physics Engine
    
    
    
            this.coin = Matter.Bodies.circle(100, 0, 100, {
                density: 0.0005,
                frictionAir: 0.06,
                restitution: 0,
                friction: 0,
            });
    
            /*  this.ground = Matter.Bodies.rectangle(
                0, 350, 1500, 170, { isStatic: true }
            ); */

    /*   this.mouseConstraint = Matter.MouseConstraint.create(
          this.engine, { element: canvas }
      );

      Matter.Composite.add(
          this.engine.world, [this.coin,  this.map.floor.rect, this.mouseConstraint]
      );


      this.image = document.getElementById("coin")

      this.w = 200;
      this.h = 168;
      this.frameNumber = 0; */



    ////////////////////////

    /////UPDATE////

    //this.draw()
    //this.rendercoin()
    //this.map.update()
    //this.player.update()
    //Matter.Engine.update(this.engine);
    ////////




    /////Helper////

    /* 
        rendercoin() {
            const offset = (~~this.frameNumber * this.w) % this.image.width;
            const { x, y } = this.coin.position;
            ctx.drawImage(
                this.image,      // image
    
                offset,     // sx
                40,         // sy
    
                this.w,          // sWidth
                this.h,          // sHeight
    
                x - this.w / 2,  // dx
                y - this.h / 2,  // dy
    
                this.w,          // dWidth
                this.h           // dHeight
            );
    
            this.frameNumber += 0.1;
            // requestAnimationFrame(rerender);
        }
    
      */


}