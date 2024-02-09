// SpriteSheet Class to suit entire sprite sheets
// Instead of individual sprites / one row of animations. 
// A sprite with a single col and row is static.
// Default animation that plays is the first row on the sheet. 
class SpriteSheet {
  constructor({
    image,
    scale = 1,
    framesHold = 7,
    position = { x: 0, y: 0 },
    spriteDims = { width: 1, height: 1 },
    ColRow = { cols: 1, rows: 1 },
    flipped = false
  }) {

    // Error handling
    if (ColRow.cols < 1 || ColRow.rows < 1 || scale < 0 || position.x < 0 || position.y < 0) {
      throw new Error("Invalid Spritesheet parameters.")
    }

    // Every Sprite sheet will have these. 
    this.image = image
    this.scale = scale
    this.position = position
    this.spriteDims = spriteDims
    this.ColRow = ColRow

    this.flipped = flipped


    // Logic to split up the rows and collumns evenly depending on 
    // either being provided the sprite dimensions or the rows and collumns
    var dimsProvided = spriteDims.width != 1 || spriteDims.height != 1
    var colRowProvided = ColRow.cols != 1 || ColRow.rows != 1

    if (dimsProvided) {
      this.cols = this.image.width / spriteDims.width
      this.rows = this.image.height / spriteDims.height
      this.spriteDims.width = spriteDims.width
      this.spriteDims.height = spriteDims.height

    }
    else if (colRowProvided) {
      this.spriteDims.width = this.image.width / this.ColRow.cols
      this.spriteDims.height = this.image.height / this.ColRow.rows
      this.cols = (this.image.width / this.spriteDims.width)
      this.rows = (this.image.height / this.spriteDims.height)
    }
    // if neither the dimensions or col and row count were specifed
    // the spritedimensions are defaulted to the whole sheet, and the total
    // cols and rows are set to {1,1}
    else {
      this.spriteDims = { width: this.image.width, height: this.image.height }
      this.cols = ColRow.cols
      this.rows = ColRow.rows
    }

    // Static Sprite
    this.static = (this.cols == 1 && this.rows == 1)

    // Sets the sprite's dimensions relative to the rows and col


    // Used to keep track of where we are on the SpriteSheet
    this.curCol = 0
    this.curRow = 0
    this.curFrame = 0
    this.curAnimation

    // used for setting up animations in the sheet
    this.startCol = 0
    this.startRow = 0

    // Frame logic, framesHold affects animation cycling speed
    this.totalFrames = this.cols
    this.framesElapsed = 0
    this.framesHold = framesHold
    this.hzScale = 1

    // Logic for Single row Sheet
    this.singleAnimation = (!this.static && this.cols > 1 && this.rows == 1)

    // Dictionary Holding the different animations in a sprite sheet
    this.animations = {}
  }

  // Sets the hz scaling factor for different monitors. (144 hz default)
  // This prevents animations from cyling too fast / slow on 60 or 144 hz monitors.
  setHz(hz) {
    if (hz == "144hz") {
      this.hzScale = 1
    }
    else if (hz == "60hz") {
      this.hzScale = .5
    }

    else { throw new Error("Incorrect Hz input") }
  }

  // For a Sprite sheet with multiple animations
  // Set an animation with it's starting col,row and frames to be animated L->R Top->Bot
  // Higher framesHold value's correspond to slower animation cycles.
  addAnimation({ name, start, framesHold, totalFrames }) {

    // Error Cases when setting animation frames
    if (this.static) {
      throw new Error("Cannot set animation for a static sprite.")
    }

    // Save the animation in our dictionary
    var a = {
      start: start,
      framesHold: framesHold,
      totalFrames: totalFrames,
    }

    this.animations[name] = a

  }

  // Sets the starting col & row to the saved animation
  // for animateFrames
  setAnimation(name) {

    if (this.curAnimation == name) { return }

    var a = this.animations[name]
    if (a == undefined) { throw new Error("Animation " + name + " has not been set.") }

    this.curAnimation = name

    // Set the current position
    this.curCol = a.start.col
    this.curRow = a.start.row

    // For resetting the animation
    this.curFrame = 0
    this.startCol = a.start.col
    this.startRow = a.start.row

    this.totalFrames = a.totalFrames
    this.framesHold = a.framesHold


  }

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // Ref: README
  draw() {

    // Setup to draw flipped animation
    if (this.flipped) {
      ctx.save();
      ctx.scale(-1, 1);
    }

    // Draw normally
    ctx.drawImage(
      this.image,

      // Crop src sx,sy  
      this.curCol * (this.image.width / this.cols),
      this.curRow * (this.image.height / this.rows),

      // Crop dims of src
      this.spriteDims.width,
      this.spriteDims.height,

      // pos destination (Flipped : Regular)
      this.flipped ? (this.position.x + this.spriteDims.width * 3) * -1 : this.position.x,
      this.position.y,



      // redraw w/ new dims
      this.spriteDims.width * this.scale,
      this.spriteDims.height * this.scale
    )


    if (this.flipped) {
      ctx.restore();
    }

  }

  // primary animation method.
  // This method will increment the rows for longer animations
  // and reset the animation row/col on the sheet when max frames elapses.
  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % (this.framesHold * this.hzScale) === 0) {

      if (this.curFrame < this.totalFrames - 1) {


        if (this.curCol == this.cols - 1) {
          this.curRow++
          this.curCol = 0
        }
        else {
          this.curCol++
        }

        this.curFrame += 1

      } else {

        //console.log("resetting to col" + this.startCol + " row " + this.startRow)

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
  }
}


// Character sprites like our MC 
// will have movement, hitboxes and more complex animations.
class MainCharacter {
  constructor({
    spriteDims,
    scale = 1,
    framesHold = 7,
    position,
    velocity = 5
  }) {

    this.spriteDims = spriteDims
    this.scale = scale
    this.framesHold = framesHold
    this.position = position
    this.velocity = velocity
    this.allAnimations = {}
    this.curAnimation
    this.flipped = false;
  }


  do(ctrl) {

    if (!ctrl.d && !ctrl.a) {
      this.curAnimation = "_Idle.png"

    }

    if (ctrl.a) {
      this.curAnimation = "_Run.png"
      this.position.x -= this.velocity
      this.flipped = true
    }

    if (ctrl.d) {
      this.curAnimation = "_Run.png"
      this.position.x += this.velocity
      this.flipped = false
    }
  }

  setHz(hz) {
    for (var key in this.allAnimations) {
      this.allAnimations[key].setHz(hz)
    }
  }

  setAnimation(a) {
    this.curAnimation = a
  }

  // Takes a dictionary of loaded images
  // and creates the spritesheet animations for MC
  addAnimations(loadedImages) {

    let animations = {}
    for (var key in loadedImages) {
      switch (key) {

        case '_Idle.png':
          animations[key] = new SpriteSheet({
            image: loadedImages[key],
            framesHold: 15,
            scale: this.scale,
            ColRow: { cols: 10, rows: 1 }
          })
          break
        case '_Run.png':
          animations[key] = new SpriteSheet({
            image: loadedImages[key],
            framesHold: 7,
            scale: this.scale,
            ColRow: { cols: 10, rows: 1 }
          })
          break

        case '_Crouch.png':
          animations[key] = new SpriteSheet({
            image: loadedImages[key],
            scale: this.scale,
          })
          break

        case '_Roll.png':
          animations[key] = new SpriteSheet({
            image: loadedImages[key],
            scale: this.scale,
            ColRow: { cols: 12, rows: 1 },
            framesHold: 10

          })
          break
      }
    }

    this.allAnimations = animations





    this.curAnimation = "_Idle.png"
  }

  update() {

    // Handle animation velocity physics stuffs
    this.allAnimations[this.curAnimation].position = this.position
    this.allAnimations[this.curAnimation].flipped = this.flipped
    this.draw()

  }


  draw() {
    this.allAnimations[this.curAnimation].update()
  }
}


