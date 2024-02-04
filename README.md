# Deepwood (Pre-Alpha)
Deepwood is a basic game composed of HTML5, CANVAS, and JavaScript.

## Table of Contents
1. [Features](#feats)
1. [Design](#design)
1. [References](#refs)

## <a name="feats"></a> Features
### secondary headline
TBD


## <a name="design"></a> Design
The Game world is seperated into different scripts to handle View, Modeling, and Controlling the sprites on screen (MVC).

- Custom Spritesheet class
    - Sheets are preloaded within a promise call in js.  This allows the image to provide the sprites.js file with the correct dimensions.  Otherwise the image width and height would be asynchronously loaded seperately and the sprites class would be unable to crop properly.  This workout prevents having to provide the image dimensions manually during the Spritesheet class construction time. 
    
    - A Spritesheet class will be able to handle varying .png files:
      - A single static sprite
      - A sheet with one row of animations for a sprite (defaulted animation)
      - An equilateral sprite sheet.  In this case the user must set the default animation for a sprite by providing the starting row and col for the animation as well as the ending row and col.  
    
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
