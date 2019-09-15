<template>
  <div class="body"
    @mouseenter="() => { if (frameData != undefined) { $emit('vue-mouseenter', {}) }}"
    @mouseleave="() => { if (frameData != undefined) { $emit('vue-mouseleave', {}) }}">
    <div v-if="frameData != undefined && (setting.alwaysShowOverlayText == true || frameMouseOn == true)" class="overlay">
      <span class="name">{{ frameData.name }}</span>
      <div v-for="(value, key, index) in frameData.params" :key="`params-${index}`"
        class="params"
        :style="{'margin-top': '0px', 'padding': '0px'}">
        <span class="name">{{ key }}:</span><span class="value">&nbsp;{{ value }}</span>
      </div>
    </div>
    <transition name="fade">
      <div v-if="frameData != undefined && (setting.diff == true)" class="overlay-bottom">
        <span v-show="frameData.resized == true" class="tag-resized">resized</span>
        <span v-show="frameData.resized == false" class="size">{{ `${frameData.cornerstonImage.width}x${frameData.cornerstonImage.height}` }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-console */
import elementResizeEvent from 'element-resize-event'

export default {
  props: ['frame-data', 'pan-x', 'frame-pan-coord', 'frame-zoom', 'frame-mouse-on', 'setting'],
  methods: {
    listen__x__onresize: function () {
      const Vue = this
      Vue.$cornerstone.resize(Vue.$el, false)
      if (Vue.frameData != undefined) {
        let viewport = Vue.$cornerstone.getViewport(Vue.$el)
        if (viewport != undefined) {
          viewport.scale = Vue.frameZoom
          viewport.translation.x = Vue.framePanCoord.x
          viewport.translation.y = Vue.framePanCoord.y
          Vue.$cornerstone.setViewport(Vue.$el, viewport)
          Vue.$cornerstone.updateImage(Vue.$el)
        }
      }
    },
  },
  async mounted () {
    if (this.frameData !== undefined) {
      elementResizeEvent(this.$el, this._.debounce(this.listen__x__onresize, 10))

      this.$cornerstone.enable(this.$el)
      const image = this.frameData.cornerstonImage
      let defViewport = this.$cornerstone.getDefaultViewport(this.$el, image)

      if (this.framePanCoord == undefined) {
        const style = getComputedStyle(this.$el)
        const thumbnailHeight = parseInt(style.height, 10)
        const thumbnailWidth = parseInt(style.width, 10)
        const scaleY = thumbnailHeight / image.height
        const scaleX = thumbnailWidth / image.width
        const scale = (scaleY < scaleX)? scaleY : scaleX
        defViewport.scale = scale
        defViewport.translation.y = 0
        defViewport.translation.x = 0
        this.$emit('vue-mounted', {scale, x: defViewport.translation.x, y: defViewport.translation.y})
      } else {
        defViewport.scale = this.frameZoom
        defViewport.translation.y = this.framePanCoord.y
        defViewport.translation.x = this.framePanCoord.x
      }
      // this.$cornerstone.displayImage(this.$el, this.frameData.cornerstonImage, defViewport)
      const cornerstoneLayerImage = await this.$cornerstone.createCornerstoneImageRgba(
        undefined,
        new Uint8Array(this.frameData.cornerstonImage.width * this.frameData.cornerstonImage.height * 4).fill(255),
        this.frameData.cornerstonImage.width,
        this.frameData.cornerstonImage.height
      )
      this.$cornerstone.addLayer(this.$el, this.frameData.cornerstonImage, {viewport: defViewport})
      const layerId = this.$cornerstone.addLayer(this.$el, cornerstoneLayerImage, {viewport: defViewport, opacity: 0.9})
      const layer = this.$cornerstone.getLayer(this.$el, layerId)
      console.log(this.$cornerstone.getLayers(this.$el))
      console.log(this.$cornerstone)
    }
  },
  watch: {
    framePanCoord: function (framePanCoord) {
      if (this.frameData != undefined && framePanCoord != undefined) {
        let viewport = this.$cornerstone.getViewport(this.$el)
        viewport.translation.x = framePanCoord.x
        viewport.translation.y = framePanCoord.y
        this.$cornerstone.setViewport(this.$el, viewport)
      }
    },
    frameZoom: function (frameZoom) {
      if (this.frameData != undefined && frameZoom != undefined) {
        let viewport = this.$cornerstone.getViewport(this.$el)
        viewport.scale = frameZoom
        this.$cornerstone.setViewport(this.$el, viewport)
      }
    }
  },
  beforeDestroy () {
    elementResizeEvent.unbind(this.$el)
    this.$cornerstone.disable(this.$el)
  }
}
</script>

<style scoped>
.body {
  position: relative;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}
.overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.65);
  padding: 1px 7px;
  pointer-events: none;
}
.overlay > span.name {
  font-size: 16px;
  font-weight: bold;
}
.overlay .params {
  font-size: 12px;
}
.overlay .params span.name {
  font-weight: bold;
}
.overlay-bottom {
  position: absolute;
  bottom: 0px;
  width: 100%;
  background: rgba(255, 255, 255, 0.65);
  border-top: 1px solid rgba(0, 0, 0, 0.65);
  padding: 1px 7px;
  pointer-events: none;
}
.overlay-bottom span.size {
  font-size: 14px;
}
.overlay-bottom span.tag-resized {
  font-size: 14px;
  color: rgb(235, 50, 50);
  font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>