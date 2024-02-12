# Deepwood (Pre-Alpha)
Deepwood is a basic game composed of HTML5, CANVAS, and JavaScript.
for an in-depth look at my implementation please check out the [Wiki page here](https://github.com/TarikVu/Deepwood/wiki).

## Table of Contents
1. [Features](#feats)
1. [Design](#design)
1. [Planned Feature](#pfeats)
1. [References](#refs)

## <a name="feats"></a> Features
- Custom Spritesheet class
  - Splits a sprite sheet equalatterally into rows and collums for easy access to frames
  - Provides ease of use to animate, scale, and update the sprites


## <a name="design"></a> Design
![diagram](https://cdn.discordapp.com/attachments/1204513288214413352/1204513303695458435/deepwood.PNG?ex=65d5016e&is=65c28c6e&hm=f685046994b119c3fcd3e8721f9da9345e6a1b0b1cf4dad3ec1606a95f07241d&)

## <a name="pfeats"></a> Planned Features
- [ ] Animation cycles adapt to monitor refresh rate
- [ ] In browser level editor
- [ ] Saving local progression data
- [ ] Upload level designs to MONGODB

    
## <a name="refs"></a> References 
### Functionality
Canvas API
- [2D Context drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

60 FPS animation
- [Stackoverflow](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe)

Preloading images as a "promise"
- [codepen.io](https://codepen.io/isakov/pen/pogvWPY?editors=0010)

### Free Assets
- [Main Character](https://rvros.itch.io/animated-pixel-hero)
- [Backgrounds](https://free-game-assets.itch.io/free-summer-pixel-art-backgrounds)
- [Enviroment Assets](https://free-game-assets.itch.io/free-summer-pixel-art-backgrounds)
- [Pause Menu](https://srtoasty.itch.io/ui-assets-pack-2)


---
## FOR THE WIKI 
### Things I Learned

- Spritesheet would be a stronger class if sub classes such as mobs,
players, static sprites could all inherit from sprite sheet.  This way we can better focus on specific classes and their needs.
- All Sprites in the future should share 
  - Position
  - image
  - a means to crop a specific part of the sheet. ( this would be done by providing the 
  rows and cols,  then a developer can specify the col, row to crop from and then save those coordinates in a dict with the sprite name as the key and the coordinates as the value.)
  - a boundary (hitbox) the hitbox would differ than the position values.  this would be beneficial for collision detection.  This is also necessary because the starting drawing position for spritesheets often have padding starting at the top right

- inverting sprite animations:
  - This topic took a few days to finally get the sprite to flip properly for canva's draw function.  
  - Simply put, we can keep track of a sprite's flipped state with a simple boolean.
  Then we would save and then scale the context.  Since the whole context is scaled, the coordinates of the top left being the origin is flipped depending on what was used inside of scale(x,y) **Refer spritemodels.js draw function**.  In this case, the x axis is modified,
  - After the context is inverted on the x axis, the position destination will have a formula of:
  **(sprite.position + spritedimensions.width * spritescale) * - 1**
  - Before, if a sprite's animation (run for example) did not have a flipped variant
  and the animation would only run right, creating a copy & flipping the .png file itself would result in the animation being flipped, but also be played in reverse.  (Moonwalk!)
  - for future purposes, instead of manually inputting file paths into an array to be pre loaded, Utilize a method to detect all the img files in a folder and write them into an array, then use that array for the preloading. 

  - It is important to be mindful of artstyles.  Right now all the assests come from different art styles and is noticeable.

  - Hardcoding the position of the objects will not let them resize with the 
  canvas if there were a resolution setting. We must set the scaling and position relative to the size of the game window. **This should be one of the first steps when making the next game!!!!**

  - Development process should start with a canvas and then a single sprite inside that canvas. This sprite along with its animations and hitboxes need to scale appropriately with
  the canas dimensions. 

  - FramesHold is a rudementary fix for frame animations.  There must be a better method for frame timing and the framerate.


[better js practices.](https://www.youtube.com/watch?v=c-1dBd1_G8A)