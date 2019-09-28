# image-diff
![Alt Text](example.gif)

client web application to compare multiple images.
<br />
you can pan, zoom and diff multiple images at the same time.
<br />
currently support 8bit jpg, png format
<br />
this project was built with the Vue framework and many other libraries.

## Demo
you can online demo in [https://whwnsdlr1.github.io/image-diff](https://whwnsdlr1.github.io/image-diff/).
<br />
or
<br />
install project as below
```
git clone https://github.com/whwnsdlr1/image-diff
yarn install
yarn run serve
```
and access to http://localhost:port

## Usage
1. load images by drag & drop or dialog that you can open by panel click.
2. (optional) if the images are different sizes, the other images will be resized to the first image size.
you can set order of images using file name(index key and value, seperated by two underscore).
ex) barbara__index__0.jpg, cameraman__index__1.jpg, salesman__index__3.png...
3. diff !

- x: coordinate x.
- y: coordinate y.
- scale: scale, scale is applied before coordinate.(panning)
- diff: turn on / off diff mode.
- ref: reference image to diff. you can change ref by frame click in diff mode.
- tolerance: if difference(Mean Square Error) is greater than or equal tolerance, pixel is set difference. opposite, set same less than tolerance. ![equation](http://latex.codecogs.com/png.latex?%5Csum_%7BP%7D%5E%7Bp%7D%28%5Csqrt%7B%28R_%7Bp1%7D-R_%7Bp2%7D%29%5E%7B2%7D%20&plus;%20%28G_%7Bp1%7D-G_%7Bp2%7D%29%5E%7B2%7D%20&plus;%20%28B_%7Bp1%7D-B_%7Bp2%7D%29%5E%7B2%7D%7D%29)
- home: move to image load page.
- rearrange: rearrange frames. drag and drop.
- setting
```
- define image size: image size to be resized. only set in load frame.
- always show overlay text: show / hidden file name and description.
- frame row count: frames row count.
- border width: border width. limit to [0, 40)
- border color: border color.
```

## Browser support - (tested)
- Google Chrome 77+
- Google Chrome 77+ on Android 9+
- Mozilla FireFox 68+

## Project setup
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Third-party libraries
### Dependencies
- vue: [https://github.com/vuejs/vue](https://github.com/vuejs/vue)
- cornerstone-core: [https://github.com/cornerstonejs/cornerstone](https://github.com/cornerstonejs/cornerstone)
- jpeg-js: [https://github.com/eugeneware/jpeg-js](https://github.com/eugeneware/jpeg-js)
- pngjs: [https://github.com/arian/pngjs](https://github.com/arian/pngjs)
- element-resize-event: [https://github.com/KyleAMathews/element-resize-event](https://github.com/KyleAMathews/element-resize-event)
- vue-lodash: [https://github.com/Ewocker/vue-lodash](https://github.com/Ewocker/vue-lodash)
- vue-toasted: [https://github.com/shakee93/vue-toasted](https://github.com/shakee93/vue-toasted)

### Dev-Dependencies
- @vue/cli-plugin-babel
- @vue/cli-plugin-eslint
- @vue/cli-service
- babel-eslint
- eslint
- eslint-plugin-vue
- sitemap-webpack-plugin
- vue-template-compiler