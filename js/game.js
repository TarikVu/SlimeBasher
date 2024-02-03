class Game {
    constructor() {



        this.background = new Image()
        this.background.src = './img/field.png'

        const shop = new Sprite({
            position: { x: 100, y: 600 },
            imageSrc: './img/shop.png',
            scale: 3.5,
            rows: 1,
            cols: 6,
            width:50,
            height:150
        })


        // MAKE METHODS FOR SPLITTING UP SHEET 
        // AND SETTING DIFFERENT ANIMATION Sections
        const mc = new Sprite({
            position: { x: 100, y: 0 },
            imageSrc: './img/mc-sheet.png',
            scale: 3.5,
            rows: 11,
            cols: 7,
            // Source image dimensions 
            srcDims: {width: 350, height: 407},
            frDims: {width: 50, height: 37}
        })

        



        this.sprites = []
        //this.sprites.push(shop)
        this.sprites.push(mc)
        console.log(mc)

       // this.sprites.push(this.background)
    }






    draw() {

        ctx.drawImage(this.background,0,0,canvas.width,canvas.height)
        this.sprites.forEach((element) => element.update());
    }

}

