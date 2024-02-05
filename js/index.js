// @Author: Tarik Vu
// import the canvas and context
const canvas = document.getElementById("gamescreen")
const ctx = canvas.getContext('2d');

// Set up game screen
canvas.width = 1920
canvas.height = 1080

const game = new Game()

// Record user inputs
const ctrl = {
    s: false
}

// For animation purposes
var stop = false;

// Sharpens pixel art sprites
ctx.imageSmoothingEnabled = false;
animate()

// Main loop to invoke drawing the game.
function animate() {

    if (stop) {
        return;
    }

    // request another frame
    requestAnimationFrame(animate);


    // game.update() will envoke draw()
    game.update(ctrl)

}



// Record User inputted keys.
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 's':
            ctrl.s = true;
    }
})
