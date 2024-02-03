// SpriteSheet
class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    frameRows = 1,
    cols = 1,
    width,
    height,

  }) {

    this.position = position
    this.width = width
    this.height = height

    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale

    this.frameRows = frameRows
    this.cols = cols
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 8

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
      this.framesCurrent * (this.image.width / this.cols),
      0,

      // sWidth, sHeight
      this.image.width / this.cols,
      this.image.height,

      // dx, dy
      this.position.x, 
      this.position.y, 
      
      // dWidth, dHeight
      (this.image.width / this.cols) * this.scale,
      this.image.height * this.scale
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


