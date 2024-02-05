// SpriteSheet Class refactored to suit entire sprite sheets
// Instead of individual sprites / one row of animations. 
// A sprite with a single col and row is static.
// The default animation that will play on a sprite sheet 
// is the first row on the sheet. 
class SpriteSheet {
  constructor({
    image,
    scale = 1,
    framesHold = 7,
    position,
    ColRow = { cols: 1, rows: 1 },
  }) {

    // Error handling
    if (ColRow.cols < 1 || ColRow.rows < 1 || scale < 0 || position.x < 0 || position.y < 0) {
      throw new Error("Invalid Spritesheet parameters.")
    }

    // Every Sprite sheet will have these. 
    this.image = image
    this.scale = scale
    this.position = position
    this.cols = ColRow.cols
    this.rows = ColRow.rows

    // Static Sprite
    this.static = (this.cols == 1 && this.rows == 1)

    // Sets the sprite's dimensions relative to the rows and col
    this.spriteDims = { width: 0, height: 0 }
    this.spriteDims.width = this.image.width / this.cols
    this.spriteDims.height = this.image.height / this.rows

    // Used to keep track of where we are on the SpriteSheet
    this.curCol = 0
    this.curRow = 0
    this.curFrame = 0
    this.curAnimation;

    // playAnimation sets theses values
    this.startCol = 0
    this.startRow = 0

    // Frame logic, framesHold affects animation cycling speed
    this.totalFrames = this.cols
    this.framesElapsed = 0
    this.framesHold = framesHold

    // Logic for Single row Sheet
    this.singleAnimation = (!this.static && this.cols > 1 && this.rows == 1)

    // Dictionary Holding the different animations in a sprite sheet
    this.animations = {}


  }

  // For a Sprite sheet with multiple animations
  // Set an animation with it's starting col,row and frames to be animated L->R Top->Bot
  // Higher framesHold value's correspond to slower animation cycles.
  setAnimation({name, start, framesHold, totalFrames}) {

    // Error Cases when setting animation frames
    if (this.static) {
      throw new Error("Cannot set animation for a static sprite.")
    }

    // Save the animation in our dictionary
    var a = { start: start, framesHold: framesHold, totalFrames: totalFrames}
    this.animations[name] = a
  }


  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // Ref: README
  draw() {
   
    //console.log('col ' + this.curCol + ' row ' + this.curRow + " tFrame: " + this.curFrame + " tFrame " + this.totalFrames )

    ctx.drawImage(
      this.image,

      // Crop src sx,sy  
      this.curCol * (this.image.width / this.cols),
      this.curRow * (this.image.height / this.rows),

      // Crop dims of src
      this.spriteDims.width,
      this.spriteDims.height,

      // pos destination
      this.position.x,
      this.position.y,

      // redraw w/ new dims
      this.spriteDims.width * this.scale,
      this.spriteDims.height * this.scale
    )
  }


  // Sets the starting col & row to the saved animation
  // for animateFrames
  playAnimation(name) {

    var a = this.animations[name]
    if (a == undefined) { throw new Error("Animation " + name + " has not been set.") }

/*  console.log("Playing animation " + name)
    console.log(a) */

    this.curAnimation = name

    // Set the current position
    this.curCol = a.start.col
    this.curRow = a.start.row

    // For resetting the animation
    this.curFrame = 0
    this.startCol = a.start.col
    this.startRow = a.start.row

    // Sets the position on sheet for animateFrames()
    this.totalFrames = a.totalFrames
    this.framesHold = a.framesHold
    
  }


  // primary animation method.
  // This method will navigate the rows for longer animations
  // and reset the animation row/col on the sheet when max frames elapses.
  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {

      if (this.curFrame < this.totalFrames-1) {

        if (this.curCol == this.cols - 1) {
          this.curRow++
          this.curCol = 0
        }
        else {
          this.curCol++
        }

        this.curFrame += 1

      } else {

        console.log("resetting to col" + this.startCol + " row " + this.startRow)
        
        // reset the animation cycle
        this.curCol = this.startCol
        this.curRow = this.startRow
        this.curFrame = 0
        
      }
    }
  }

  // Draws the sprite.
  // Static sprites do not need to be animated.
  update() {

    if (!this.static) {
      this.animateFrames()
    }
    this.draw()

    // No need to animate if a static sprite 
  
  }
}


