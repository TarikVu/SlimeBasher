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

    // playAnimation sets theses values
    this.startCol = 0
    this.startRow = 0

    // Frame logic, framesHold affects animation cycling speed
    this.framesMax = this.cols
    this.framesElapsed = 0
    this.framesHold = framesHold

    // Logic for Single row Sheet
    this.singleAnimation = (!this.static && this.cols > 1 && this.rows == 1)

    // Dictionary Holding the different animations in a sprite sheet
    this.animations = {}
  }

  // For a Sprite sheet with multiple animations
  // Set an animation with it's starting & ending row/col.
  // Animatino speed is set to "framesHold" The higher the value, the slower the animation
  // Example: "start" & "end" must by {start:[0,6], end:[3,7]} object of tuples. [col,row]
  // The order of animation of cells must be left to right, top to bottom.
  // This method relies on Zero-Based Indexing.  
  setAnimation(name, framesHold, start, end) {

    // Error Cases when setting animation frames
    if (this.static) {
      throw new Error("Cannot set animation for a static sprite.")
    }
    if (start.row > end.row) {
      throw new Error("Starting row of sheet greater than ending row.")
    }
    if (start.row == end.row && start.col > end.col) {
      throw new Error("Starting col greater than ending col of same row.")
    }

    // Calculate how many frames there are
    var colCount = start.col
    var rowCount = start.row
    var totalCount = 1
    while (true) {
      if (colCount == end.col && rowCount == end.row) { break }

      if (colCount == this.cols - 1) {
        colCount = 0
        rowCount += 1
        continue;
      }
      else {
        colCount += 1
        totalCount += 1
      }
    }

    // Save the animation in our dictionary
    var a = { start: start, framesHold: framesHold, frames: totalCount }
    this.animations[name] = a
  }

  // Sets the starting col & row to the saved animation
  // for animateFrames
  playAnimation(name) {

    var a = this.animations[name]
    if (a == undefined) { throw new Error("Animation " + name + " has not been set.") }

    // For resetting the animation
    this.startCol = a.start.col
    this.startRow = a.start.row

    // Sets the position on sheet for animateFrames()
    this.curCol = a.start.col
    this.curRow = a.start.row
    this.framesMax = a.frames
    this.framesHold = a.framesHold
  }


  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // Ref README
  draw() {
    ctx.drawImage(
      this.image,

      // Crop source sx,sy  (Assuming the sheet has equal spacing all around.)
      this.curCol * (this.image.width / this.cols),
      this.curRow * (this.image.height / this.rows),

      // sWidth, sHeight
      this.spriteDims.width,
      this.spriteDims.height,

      // frame position to be drawn on target canvas
      this.position.x,
      this.position.y,

      // width & height of redrawn frame
      this.spriteDims.width * this.scale,
      this.spriteDims.height * this.scale
    )
  }

  // primary animation method.
  // This method will navigate the rows for longer animations
  // and reset the animation row/col on the sheet when max frames elapses.
  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {

      if (this.curFrame != this.framesMax - 1) {

        if (this.curCol == this.cols - 1) {
          this.curRow++
          this.curCol = 0
        }
        else {
          this.curCol++
        }

        this.curFrame += 1

      } else {

        this.curCol = this.startCol
        this.curRow = this.startRow
        this.curFrame = 0
      }
    }

  }

  // Draws the sprite.
  // Static sprites do not need to be animated.
  update() {

    this.draw()

    // No need to animate if a static sprite 
    if (!this.static) {
      this.animateFrames()
    }
  }
}


