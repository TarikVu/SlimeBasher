// SpriteSheet Class refactored to suit entire sprite sheets
// Instead of individual sprites / one row of animations. 
// A sprite with a single col and row is static.
class SpriteSheet {
  constructor({
    image,
    scale = 1,
    position,
    ColRow = { cols: 1, rows: 1 },
  }) {

    if (ColRow.cols < 1 || ColRow.rows < 1 || scale < 0 || position.x < 0 || position.y < 0)
    {throw new Error("Invalid Spritesheet parameters.")}

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

    // Used to keep track of where we are on the SpriteSheet.
    this.curCol = 0
    this.curRow = 0

    // Frame logic, framesHold affects animation cycling speed. 
    this.framesMax = 6
    this.framesElapsed = 0
    this.framesHold = 25

    // Logic for Single row Sheet
    this.singleAnimation = (!this.static && this.cols > 1 && this.rows == 1)

    // Dictionary Holding the different animations in a sprite sheet.
    this.animations = {}
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

  // For a Sprite sheet with multiple animations
  // Set an animation with it's starting & ending row/col.
  // Example: "start" & "end" must by {start:[0,6], end:[3,7]} object of tuples. [col,row]
  // The order of animation of cells must be left to right, top to bottom. 
  setAnimation(name,start,end){

    // Calculate how many frames there are
    var colCount = 0
    var rowCount = 0
    var rowTarget = end[1] - start[1]
    
    while (rowCount != rowTarget){
      totalCount += 1
      colCount += 1
      if colCount == 
    }
    

  }

  animateFrames() {
    this.framesElapsed++
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.curCol < this.framesMax - 1) {
        this.curCol++
      } else {
        this.curCol = 0
      }
    }
  }

  // Draws the sprite.
  // Static sprites do not need to be animated.
  update() {

    this.draw()

    // No need to animate if a static sprite 
    if (!this.static) { 
      this.animateFrames() }
  }
}


