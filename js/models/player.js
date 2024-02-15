import { Sprite } from './sprite.js'

const IDLE = 0,
    RUNNING = 1


export class Player {
    constructor() {

        var images = document.getElementsByClassName('player')
        this.position;

        this.states = [];
        this.sprites = []

        // Create and add a new sprite per image
        for (var i in images) {
            var s = new Sprite({
                image: images[i],
                spriteDims: { width: 120, height: 80 },
                scale: 4,
                debug: true
            });
            this.sprites.push(s);
        }

        this.currentState = this.states[0];
        this.currentSprite = this.sprites[0];

        //https://www.youtube.com/watch?v=jKe44NeFzwE
        // 10:20 for states stuff. 
    }

    setState(stateID) {
        this.currentState = this.states[stateID];
        this.currentSprite = this.sprites[stateID];

    }


    update(ctrl) {
        if (ctrl.keys === undefined || ctrl.keys.length == 0) {
            this.setState(IDLE);
        }
        if (ctrl.keys === 'd') {
            this.setState(RUNNING);
        }

        this.currentSprite.update();
    }

    draw() {

    }
}
