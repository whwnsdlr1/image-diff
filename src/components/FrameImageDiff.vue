<template>
  <div class="body"
    :class="{ 'no-frame-data': frameData == undefined }"
    @mouseenter="() => { if (frameData != undefined) { $emit('vue-mouseenter', {}) }}"
    @mouseleave="() => { if (frameData != undefined) { $emit('vue-mouseleave', {}) }}">
    <div v-if="frameData != undefined && (setting.alwaysShowOverlayText == true || frameMouseOn == true)" class="overlay">
      <span class="name" :class="{ reference: setting.diff.active == true && setting.diff.reference != undefined && (setting.diff.reference.id == frameData.id) }">{{ frameData.name }}</span>
      <div v-for="(value, key, index) in frameData.params" :key="`params-${index}`"
        class="params"
        :style="{'margin-top': '0px', 'padding': '0px'}">
        <span class="name">{{ key }}:</span><span class="value">&nbsp;{{ value }}</span>
      </div>
    </div>
    <transition name="fade">
      <div v-if="frameData != undefined && (setting.diff.active == true)" class="overlay-bottom">
        <span v-for="(text, index) in overlayBottomTexts" :key="`overlay-bottom-text-${index}`"
          :class="text.class">
          {{ text.textContent }}
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-console */
import elementResizeEvent from 'element-resize-event'

export default {
  props: ['frame-data', 'pan-x', 'frame-pan-coord', 'frame-zoom', 'frame-mouse-on', 'setting'],
  data: function () {
    return {
      layerId: undefined,
      layerLayerId: undefined
    }
  },
  methods: {
    listen__x__onresize: function () {
      const Vue = this
      Vue.$cornerstone.resize(Vue.$el, false)
      if (Vue.frameData != undefined) {
        /*
        let viewport = Vue.$cornerstone.getViewport(Vue.$el)
        if (viewport != undefined) {
          viewport.scale = Vue.frameZoom
          viewport.translation.x = Vue.framePanCoord.x
          viewport.translation.y = Vue.framePanCoord.y
          Vue.$cornerstone.setViewport(Vue.$el, viewport)
          Vue.$cornerstone.updateImage(Vue.$el)
        }
        */
        let layers = this.$cornerstone.getLayers(this.$el)
        for (let i = 0; i < layers.length; i++) {
          let viewport = layers[i].viewport
          viewport.scale = Vue.frameZoom
          viewport.translation.x = Vue.framePanCoord.x
          viewport.translation.y = Vue.framePanCoord.y
        }
        this.$cornerstone.updateImage(this.$el)
      }
    },
    listen__layer_image__onchange: function (updated) {
      if (this.layerLayerId != undefined) {
        this.$cornerstone.removeLayer(this.$el, this.layerLayerId)
        this.$cornerstone.updateImage(this.$el)
        this.layerLayerId = undefined
      }
      if (updated > 0) {
        const layerLayerId = this.$cornerstone.addLayer(
          this.$el,
          this.frameData.diff.cornerstoneImage,
          {
            viewport: this.$cornerstone.getLayer(this.$el, this.layerId).options.viewport,
            opacity: this.frameData.diff.opacity
          }
        )
        this.layerLayerId = layerLayerId
        this.$cornerstone.updateImage(this.$el)
      }
    }
  },
  computed: {
    overlayBottomTexts: function () {
      let ret = []
      const frameData = this.frameData
      if (frameData.resized == true) ret.push({class: 'tag-resized', textContent: 'resized'})
      else ret.push({class: 'size', textContent: `${frameData.cornerstoneImage.width}x${frameData.cornerstoneImage.height}`})

      if (frameData.diff.psnr != undefined) {
        ret.push({class: 'comma', textContent: `,`})
        if (isNaN(frameData.diff.psnr) == false) ret.push({class: '', textContent: `PSNR-${(frameData.diff.psnr).toFixed(2)}db`})
        else ret.push({class: '', textContent: `PSNR-Same`})
      }
      if (frameData.diff.pixelCount != undefined) {
        ret.push({class: 'comma', textContent: `,`})
        ret.push({class: '', textContent: `${(frameData.diff.pixelCount / (frameData.cornerstoneImage.width * frameData.cornerstoneImage.height) * 100).toFixed(2)}%`})
      }
      
      return ret
    }
  },
  watch: {
    framePanCoord: function (framePanCoord) {
      if (this.frameData != undefined && framePanCoord != undefined) {
        /*
        let viewport = this.$cornerstone.getViewport(this.$el)
        viewport.translation.x = framePanCoord.x
        viewport.translation.y = framePanCoord.y
        this.$cornerstone.setViewport(this.$el, viewport)
        */
        let layers = this.$cornerstone.getLayers(this.$el)
        for (let i = 0; i < layers.length; i++) {
          let viewport = layers[i].viewport
          viewport.translation.x = framePanCoord.x
          viewport.translation.y = framePanCoord.y
        }
        this.$cornerstone.updateImage(this.$el)
      }
    },
    frameZoom: function (frameZoom) {
      if (this.frameData != undefined && frameZoom != undefined) {
        /*
        let viewport = this.$cornerstone.getViewport(this.$el)
        viewport.scale = frameZoom
        this.$cornerstone.setViewport(this.$el, viewport)
        */
        let layers = this.$cornerstone.getLayers(this.$el)
        for (let i = 0; i < layers.length; i++) {
          let viewport = layers[i].viewport
          viewport.scale = frameZoom
        }
        this.$cornerstone.updateImage(this.$el)
      }
    },
    'frameData.diff.updated': function (updated) {
      this.listen__layer_image__onchange(updated)
    },
    'frameData.id': function () {
      if (this.layerId != undefined) {
        this.$cornerstone.setLayerImage(this.$el, this.frameData.cornerstoneImage, this.layerId)
        this.$cornerstone.updateImage(this.$el)
      }
    }
  },
  async mounted () {
    if (this.frameData !== undefined) {
      elementResizeEvent(this.$el, this._.debounce(this.listen__x__onresize, 10))
      this.$cornerstone.enable(this.$el)
      const image = this.frameData.cornerstoneImage
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
      const layerId = this.$cornerstone.addLayer(this.$el, this.frameData.cornerstoneImage, {viewport: defViewport})
      this.layerId = layerId
      this.listen__layer_image__onchange(this.frameData.diff.updated)
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
.body * {
  pointer-events: none;
}
.body.no-frame-data {
  background-color: #eee;
  background-image: linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd),
  linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
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
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  padding: 3px 0px 0px 0px;
}
.overlay > span.name.reference {
  color: rgb(235, 50, 50);
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
  overflow: hidden;
  white-space:nowrap;
}
.overlay-bottom span {
  position: relative;
  display: inline-block;
  top: 1px;
  font-size: 13px;
}
.overlay-bottom span.size {
  font-size: 13px;
}
.overlay-bottom span.tag-resized {
  font-size: 13px;
  color: rgb(220, 0, 0);
  font-weight: bold;
}
.overlay-bottom span.comma {
  font-size: 14px;
  padding-right: 5px;
}
</style>