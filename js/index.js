// @Author: Tarik Vu
// import the canvas and context
const canvas = document.getElementById("gamescreen")
const ctx = canvas.getContext('2d');

// Set up game screen
canvas.width = 1440
canvas.height = 900

const game = new Game()
const pauseMenu = new PauseMenu()



// Records user inputs and game settings modified in the pause screen.
// Animation speeds are defaulted to a 144hz monitor. 
const ctrl = {

    // Game Settings
    pause: false,
    hz60: false,
    hz144: true,

    // Mouse and movement
    mouse: { x: 0, y: 0, down: false, up: false },
    s: false,
    d: false,
    space: false
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
        console.log("60hz: " + ctrl.hz60 + " 144hz: " + ctrl.hz144)

        pauseMenu.update(ctrl)
        return // Skip updating world on pause
    }

    game.update(ctrl)

}

// Record player mouse   
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    ctrl.mouse.x = x
    ctrl.mouse.y = y
}

canvas.addEventListener("mousemove", function (e) {
    getMousePosition(canvas, e);
});

canvas.addEventListener("mousedown", function (e) {
    ctrl.mouse.down = true
    ctrl.mouse.up = false
});
canvas.addEventListener("mouseup", function (e) {
    ctrl.mouse.down = false
    ctrl.mouse.up = true
});


// Record User inputted keyboard keys
window.addEventListener('keydown', (event) => {
    console.log(event.key)

    // stops window from scrolling w/ space
    if (event.key == " " && event.target == document.body) {
        event.preventDefault();
    }

    switch (event.key) {

        // Pause
        case 'Escape':
            if (ctrl.pause)
                ctrl.pause = false
            else
                ctrl.pause = true
            break

        // Movement 
        case 's':
            ctrl.s = true
            break
        case 'd':
            ctrl.d = true
            break

        case ' ':
            ctrl.space = true
            break

    }
})

// Record User inputted keyboard keys
window.addEventListener('keyup', (event) => {
    console.log(event.key)
    switch (event.key) {
        // Movement 
        case 's':
            ctrl.s = false
            break
        case 'd':
            ctrl.d = false
            break

        case ' ':
            ctrl.space = false
            break
    }
})




