// @Author: Tarik Vu
// import the canvas and context
const canvas = document.getElementById("gamescreen")
const ctx = canvas.getContext('2d');

// Set up game screen
canvas.width = 1440
canvas.height = 900

const game = new Game()
const pauseMenu = new PauseMenu()


// Records user inputs
const ctrl = {
    pause: false,
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


    if (ctrl.pause) { 
        
        pauseMenu.update()
        return // Skip updating world on pause
    }

    game.update(ctrl) 


}



// Record User inputted keys. ------------
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        // Pause
        case 'Escape':
            if (ctrl.pause)
                ctrl.pause = false
            else
                ctrl.pause = true
            break

        case 's':
            ctrl.s = true
            break
    }
})


