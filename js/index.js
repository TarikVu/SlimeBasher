// import the canvas and context
const canvas = document.getElementById("gamescreen")
const ctx = canvas.getContext('2d');



// Set up game screen
canvas.width = 1920
canvas.height = 1080

const game = new Game()


// Animation Code 
var stop = false;
animate()


function animate() {
    ctx.imageSmoothingEnabled = false;
    if (stop){
        return;
    }

    // request another frame
    requestAnimationFrame(animate);



    game.draw()

}