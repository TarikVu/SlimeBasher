// SpriteSheet
class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    rows = 1,
    cols = 1,
    srcDims= {width: 0, height:0},
    frDims= {width: 0, height:0}

  }) {

    this.position = position
    this.srcDims = srcDims
    this.frDims = frDims

    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale

    this.rows = rows
    this.cols = cols


    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 12

    
  }


  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

  // sx, sy : the top left corner of the sourced image to start the crop
  // sWidth,sHeight : the size of the rectangle to grab from img

  // dx, dy: Cordinates of the destination to draw the image
  // dWidth, dHeight: size of the image drawn. (scaling here)
  draw() {
    
    ctx.drawImage(
      this.image,
      
      // sx, sy
      this.framesCurrent * (this.srcDims.width / this.cols),
      this.frDims.height * 8,

      // sWidth, sHeight
      this.srcDims.width / this.cols,
      this.srcDims.height / this.rows,

      // frame position to be drawn on target canvas
      this.position.x, 
      this.position.y, 
      
      // width & height of redrawn frame
      this.frDims.width  * this.scale,
      this.frDims.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.cols - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}


