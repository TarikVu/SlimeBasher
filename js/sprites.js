// SpriteSheet Class refactored to suit entire sprite sheets
// Instead of individual sprites / one row of animations. 
class SpriteSheet {
  constructor({
    image,
    scale = 1,
    position,
    ColRow = { cols: 0, rows: 0 }, 
  }) {

    this.image = image
    this.scale = scale
    this.position = position
    this.cols = ColRow.cols
    this.rows = ColRow.rows

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
    
  }



  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // sx, sy : the top left corner of the sourced image to start the crop
  // sWidth,sHeight : the size of the rectangle to grab from img
  // dx, dy: Cordinates of the destination to draw the image
  // dWidth, dHeight: size of the image drawn. (scaling here)
  draw() {

    console.log(this)
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

  update() {
    this.draw()
    this.animateFrames()
  }
}


