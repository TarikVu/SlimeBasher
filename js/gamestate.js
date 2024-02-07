// Represents the game world filled with sprites and the backgrounnd.
// Images are preloaded in as a promise, and then Sprite classes are
// Invoked with the image object.  The reason for preloading is to be 
// able to access the image width and height to dynamically split
// the Spritesheet class (assumming the sprite sheet is divided evenly.)
class Game {
    constructor() {

        this.background = new Image()
        this.background.src = './img/field.png'
        this.sprites = {}
        this.hzMode = "144hz"


        // Dictionary of images ready to be loaded as a Sprite
        const finishedimages = new Object()

        // List of path's to the sprite sheets
        const imageUrls = [
            //'./img/mc-sheet.png',
            './img/shop.png',
            './img/lamp.png',
            './img/knight/_Idle.png'
        ]


        // Used to load images (ref README)
        const loadImage = src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });


        // *runtime*
        // a Promise pre-loads the images 
        Promise.all(imageUrls.map(loadImage)).then(images => {

            // Adds loaded imgs to dict. key = imgname.png
            images.forEach((image) =>
                finishedimages[image.src.split('img/').pop()] = image
            );

            // Construct the Sprites of the game world. 
            const shop = new SpriteSheet({
                image: finishedimages["shop.png"],
                scale: 3.5,
                framesHold: 14,
                position: { x: 300, y: 300 },
                ColRow: { cols: 6, rows: 1 },
            })

            // // Main Character
            // const mc = new Character({
            //     image: finishedimages["mc-sheet.png"],
            //     scale: 3.5,
            //     hzMode: this.hzMode,
            //     position: { x: 300, y: 300 },
            //     ColRow: { cols: 7, rows: 11 },
            // })

            // mc.addAnimation({
            //     name: "jump", totalFrames: 9, framesHold: 15,
            //     start: { col: 0, row: 2 },
            //     overflow: 2
            // })

            // mc.addAnimation({
            //     name: "run", totalFrames: 6, framesHold: 16,
            //     start: { col: 1, row: 1 }
            // })

            // mc.addAnimation({
            //     name: "crouch", totalFrames: 4, framesHold: 15,
            //     start: { col: 4, row: 0 }
            // })
            // mc.addAnimation({
            //     name: "idle", totalFrames: 4, framesHold: 15,
            //     start: { col: 0, row: 0 }
            // })

            const mc = new mainCharacter({
                image: finishedimages["knight/_Idle.png"],
                scale: 4,
                hzMode: this.hzMode,
                position: { x: 300, y: 300 },
                ColRow: { cols: 12, rows: 11 },
            })

             /* mc.addAnimation({
                 name: "all", totalFrames: 127, framesHold: 5,
                 start: { col: 0, row: 2 },
             })
            mc.setAnimation("all") */


            const lamp = new SpriteSheet({
                image: finishedimages["lamp.png"],
                scale: 2.5,
                position: { x: 300, y: 300 }
            })


            // Push to list of sprites to be drawn. 
            //this.sprites["shop"] = shop
            this.sprites["mc"] = mc
            //this.sprites["lamp"] = lamp



        })
    }


    // Updates game world based off of controller
    update(ctrl) {

        // Toggle hzMode for each sprite.
        if (ctrl.hz60 && this.hzMode != "60hz") {
            this.hzMode = "60hz"
            for (var key in this.sprites) {
                this.sprites[key].setHz(this.hzMode)
            }
            return
        }
        if (ctrl.hz144 && this.hzMode != "144hz") {
            this.hzMode = "144hz"
            for (var key in this.sprites) {
                this.sprites[key].setHz(this.hzMode)
            }
            return
        }


        var mc = this.sprites["mc"]

        // Controls
        // try catch for case for when animations were still being loaded
        // durig runtime init    
        try {
            if (!mc.isBusy()) {
                if (!ctrl.s && !ctrl.d && !ctrl.space) {
                    mc.setAnimation("idle")
                }
                if (ctrl.s) {
                    mc.setAnimation("crouch")
                }
                if (ctrl.d) {
                    mc.setAnimation("run")
                }
                if (ctrl.space) {
                    mc.setAnimation("jump")
                }
            }
        }
        catch {

        }



        this.draw()
    }

    // Draws the game world
    // Draw order matters
    draw() {

        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height)

        for (var key in this.sprites) {
            this.sprites[key].update()
        }
    }

}

