# node-color-image
Colorize an image using NodeJS.  
This script uses [Jimp](https://jimp-dev.github.io/jimp/) to transform a PNG image and apply a fill color to it.

## Getting started

Clone this repository, then install dependencies:
```
yarn install
```
Note: please make sure you use NodeJS >= 22

## Convert images
Place your PNG images in the `./input` folder.
In your favourite terminal, run the command:

```
yarn start $$hex-color$$
```

Where `$$hex-color$$` is a HEX color **WITHOUT** the leading `#` character.  

For instance:
```
yarn start ff0000
```
To color the initial image in red.
The output images are saved in the `./output` folder