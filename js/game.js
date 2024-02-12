import { Player } from './models/player.js'
import { Shop } from './maps.js'
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


    }

    update() {
        this.draw()
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

}