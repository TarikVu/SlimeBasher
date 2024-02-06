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
            './img/shop.png',
            './img/mc-sheet.png',
            './img/lamp.png'
        ];


        // Used to load images (ref README)
        const loadImage = src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });


        // *runtime*
        // Promise pre-loads the images 
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

            // Main Character
            const mc = new SpriteSheet({
                image: finishedimages["mc-sheet.png"],
                scale: 3.5,
                hzMode: this.hzMode,
                position: { x: 300, y: 300 },
                ColRow: { cols: 7, rows: 11 },
            })
            mc.setAnimation({
                name: "crouch", totalFrames: 4, framesHold: 15,
                start: { col: 4, row: 0 }
            })
            mc.setAnimation({
                name: "idle", totalFrames: 4, framesHold: 15,
                start: { col: 0, row: 0 }
            })

            mc.playAnimation("idle")


            const lamp = new SpriteSheet({
                image: finishedimages["lamp.png"],
                scale: 2.5,
                position: { x: 300, y: 300 }
            })


            // Push to list of sprites to be drawn. 
            this.sprites["shop"] = shop
            this.sprites["mc"] = mc
            this.sprites["lamp"] = lamp

        })
    }


    // Updates game world based off of controller
    update(ctrl) {
    
        // Toggle hzMode for each sprite.
        if(ctrl.hz60 && this.hzMode != "60hz"){
            this.hzMode = "60hz"
            for (var key in this.sprites){
                this.sprites[key].setHz(this.hzMode)
            }
        }
        if(ctrl.hz144 && this.hzMode != "144hz"){
            this.hzMode = "144hz"
            for (var key in this.sprites){
                this.sprites[key].setHz(this.hzMode)
            }
        }
        

        // Controls    
        if (ctrl.s) {
            this.sprites["mc"].playAnimation("crouch")
            ctrl.s = false
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

