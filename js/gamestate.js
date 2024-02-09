// Represents the game world filled with sprites and the backgrounnd.
// Images are preloaded in as a promise, and then Sprite classes are
// Invoked with the image object.  The reason for preloading is to be 
// able to access the image width and height to dynamically split
// the Spritesheet class (assumming the sprite sheet is divided evenly.)
class Game {
    constructor() {

        this.background = new Image()
        this.background.src = './img/field.png'
        this.stage = {}

        this.hzMode = "144hz"
        this.loaded = false

        // Construct Main character
        this.mc = new MainCharacter({
            spriteDims: { width: 38, height: 20 },
            scale: 3,
            position: { x: 300, y: 300 },

        })

        // Paths to images to be loaded in
        const stageImages = [
            //'./img/mc-sheet.png',
            './img/shop.png',
            './img/lamp.png',
        ]

        const mcImages = [
            './img/mc/_Idle.png',
            './img/mc/_Run.png',
            './img/mc/_Crouch.png',
            './img/mc/_Roll.png'
        ]


        // *runtime* Used to load images (ref README)
        // Pre load and construct the sprites using promises
        const loadImage = src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });


        // Pre-load stage Images
        Promise.all(stageImages.map(loadImage)).then(images => {
            var loadedImages = new Object()

            // Adds loaded imgs to dict. key = imgname.png
            images.forEach((image) =>
                loadedImages[image.src.split('img/').pop()] = image
            );

            // Construct the Sprites of the game world. 
            const shop = new SpriteSheet({
                image: loadedImages["shop.png"],
                scale: 3.5,
                flipped: false,
                framesHold: 14,
                position: { x: 300, y: 300 },
                spriteDims: { width: 118, height: 128 },
                //ColRow: { cols: 6, rows: 1 },
            })

            const lamp = new SpriteSheet({
                image: loadedImages["lamp.png"],
                scale: 2.5,
                flipped :true,
                position: { x: 300, y: 300 }
            })

            // Push to list of sprites to be drawn. 
            this.stage["shop"] = shop
            this.stage["lamp"] = lamp
        })


        // Pre-load Main character sprite Images (animations)
        Promise.all(mcImages.map(loadImage)).then(images => {

            var loadedImages = new Object()

            images.forEach((image) =>
                loadedImages[image.src.split('img/mc/').pop()] = image
            );

            this.mc.addAnimations(loadedImages)
            this.loaded = true;

        })


    }


    // Updates game world based off of controller
    update(ctrl) {

        // Toggle hzMode for each sprite.
        if (ctrl.hz60 && this.hzMode != "60hz") {
            this.hzMode = "60hz"
            for (var key in this.sprites) {
                this.stage[key].setHz(this.hzMode)
            }
            this.mc.setHz("60hz")
            return
        }
        if (ctrl.hz144 && this.hzMode != "144hz") {
            this.hzMode = "144hz"

            for (var key in this.sprites) {
                this.stage[key].setHz(this.hzMode)
            }
            this.mc.setHz("144hz")
            return
        }


        // Controls
        // try catch for case for when animations were still being loaded
        // durig runtime init    
        try { this.mc.do(ctrl) }
        catch { }

        this.draw()
    }

    // Draws the game world
    // Draw order matters
    draw() {

        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height)


        // update stage, mc and enemies
        for (var key in this.stage) {
            this.stage[key].update()
        }

        this.mc.update()

    }

}

