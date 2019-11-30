# image-diff
![Alt Text](example.gif)
<br />
client web application to compare multiple images.
<br />
you can pan, zoom and diff multiple images at the same time.
<br />
currently support 8bit jpg, png format
<br />
this project was built with the Vue framework, [vue-image-diff component](https://github.com/whwnsdlr1/vue-image-diff) and many other libraries.

## Demo
you can online demo in [https://whwnsdlr1.github.io/image-diff](https://whwnsdlr1.github.io/image-diff/).
<br />
or
<br />
install project as below
```
git clone https://github.com/whwnsdlr1/image-diff
cd image-diff
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
```
- mouse & touch drag - panning
- mouse wheel & pinch to zoom - zoom in / out
- mouse doubleclick - change reference image for diff
- right mouse drag - adjust brightness and contrast
- control panel parameter - see [vue-image-diff](https://github.com/whwnsdlr1/vue-image-diff) readme
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
- vue-image-diff: [https://github.com/whwnsdlr1/vue-image-diff](https://github.com/whwnsdlr1/vue-image-diff)
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
- vue-template-compiler