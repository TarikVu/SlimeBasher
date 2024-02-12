import { Player } from './models/player.js'
import { Shop } from './models/maps.js'
import { PauseMenu } from './models/pausemenu.js'

export class Game {
    constructor(
        {
            width,
            height
        }
    ) {
        this.width = width;
        this.height = height;
        this.pause = new PauseMenu();
        this.player = new Player();
        this.map = new Shop();

        // Matter.js Physics Engine
        this.engine = Matter.Engine.create();



        /*  this.coin = Matter.Bodies.circle(100, 0, 100, {
             density: 0.0005,
             frictionAir: 0.06,
             restitution: 0,
             friction: 0,
         });
 
          this.ground = Matter.Bodies.rectangle(
             0, 350, 1500, 170, { isStatic: true }
         );
  
         this.mouseConstraint = Matter.MouseConstraint.create(
             this.engine, { element: canvas }
         );
 
         Matter.Composite.add(
             this.engine.world, [this.coin, this.ground, this.mouseConstraint]
         );
 
 
         this.image = document.getElementById("coin")
 
         this.w = 200;
         this.h = 168;
         this.frameNumber = 0; */



    }



    //////////////////////


    rerender() {



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




    ///////////////////


    update(ctrl) {
        this.draw()
        Matter.Engine.update(this.engine);

    }

    draw() {

        this.drawImageScaled(this.map.background, canvas)


        //this.rerender()
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

}