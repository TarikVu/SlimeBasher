// Note to self, the main point of making this menu is to 
// have a way for users to select a refresh rate.
class Button {
    constructor({
        image,
        text,
        position,
        scale,
        width,
        height,
        clicked = false
    }) {

        this.image = image
        this.text = text
        this.position = position
        this.scale = scale
        this.width = width
        this.height = height
    }

    // Handle Mouse position being inside the dimensions. 
    update() {
        this.draw()
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width * this.scale,
            this.height * this.scale)
    }
}

// Pause menu screen.
// Image pre-loading follows the same logic as spritesheet
class PauseMenu {
    constructor() {

        // Const values for styling the UI
        const canvasMid_x = canvas.width / 2
        const mainButtonsDim = { width: 50, height: 12, scale: 5 }
        const scale = 10

        this.image = new Image()
        this.image.src = '././img/menu.png'
        this.width = 48 * scale
        this.height = 65 * scale
        this.position = { x: 0, y: 100 }
        this.position.x = canvasMid_x - this.width / 2

        // Dictionary of images ready to be loaded as a Sprite
        const finishedimages = new Object()

        // All buttons in the menu:
        this.buttons = {}

        // List of path's to the sprite sheets
        const imageUrls = [
            './img/button1.png'
        ];


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


            // Create the buttons
            const contButton = new Button({
                image: finishedimages['button1.png'],
                text: 'Continue',
                position: {
                    x: canvasMid_x - mainButtonsDim.width,
                    y: this.position.y
                },
                scale: mainButtonsDim.scale,
                width: mainButtonsDim.width,
                height: mainButtonsDim.height
            })

            // align button position

            // Push to list of sprites to be drawn. 
            this.buttons["button1"] = contButton


        })


    }

    update() {

        this.draw()
    }

    draw() {

        // Draw main menu panel
        ctx.drawImage(
            this.image,
            this.position.x, this.position.y,
            this.width, this.height)

        // Draw each button 
        for (var key in this.buttons) {
            this.buttons[key].update()
        }

    }
}


