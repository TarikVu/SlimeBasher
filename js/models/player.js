import { Sprite } from './sprite.js'
export class Player {
    constructor(game) {
        this.game = game
        this.sprites = document.getElementsByClassName('player')
    }
}