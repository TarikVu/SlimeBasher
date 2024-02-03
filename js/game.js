class Game {
    constructor() {


        this.background = new Sprite({
            position: { x: 0, y: 0 },
            imageSrc: './img/field.png',
            width: canvas.width,
            height: canvas.height
        })

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
            position: { x: 100, y: 650 },
            imageSrc: './img/mc-sheet.png',
            scale: 4,
            rows: 1,
            cols: 7,
            width: 50,
            height: 37
        })

        this.sprites = []
        this.sprites.push(shop)
        this.sprites.push(mc)

       // this.sprites.push(this.background)
    }






    draw() {

        ctx.drawImage(this.background.image,0,0,canvas.width,canvas.height)
        this.sprites.forEach((element) => element.update());
    }

}

