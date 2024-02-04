// Represents the game world filled with sprites and the backgrounnd.
// Images are preloaded in as a promise, and then Sprite classes are
// Invoked with the image object.  The reason for preloading is to be 
// able to access the image width and height to dynamically split
// the Spritesheet class (assumming the sprite sheet is divided evenly.)
class Game {
    constructor() {

        this.background = new Image()
        this.background.src = './img/field.png'
        this.sprites = []

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


        // Loads the Images as a promise and then constructs Sprites
        Promise.all(imageUrls.map(loadImage)).then(images => {

            // Adds to dict. The key of the image file is
            // the full file name within the "img" folder.
            images.forEach((image) =>
                finishedimages[image.src.split('img/').pop()] = image
            );

            // Construct the Sprites of the game world. 
            const shop = new SpriteSheet({
                image: finishedimages["shop.png"],
                scale: 3.5,
                framesHold: 8,
                position: { x: 300, y: 300 },
                ColRow: { cols: 6, rows: 1 },
            })

            const mc = new SpriteSheet({
                image: finishedimages["mc-sheet.png"],
                scale: 3.5,
                position: { x: 300, y: 300 },
                ColRow: { cols: 7, rows: 11 },
            })

            // col, row
            mc.setAnimation("idle", 15, { col: 0, row: 0 }, { col: 3, row: 0 })
            mc.playAnimation("idle")

            const lamp = new SpriteSheet({
                image: finishedimages["lamp.png"],
                scale: 2.5,
                position: { x: 300, y: 300 }
            })


            // Push to list of sprites to be drawn. 
            this.sprites.push(shop)
            this.sprites.push(mc)
            this.sprites.push(lamp)

        })
    }




    // Draws the game world.
    // BG first, then list of sprites. 
    // When a SpriteSheet object is updated, update invokes draw w/ ctx
    draw() {
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height)
        this.sprites.forEach((element) => element.update());
    }

}

