<template>
<div class="body">
  <title-bar :setting="setting"
    :frame-pan-coord="framePanCoord"
    :frame-zoom="frameZoom"
    @vue-move-home="listen__x__tohome"
    @vue-pan-x="listen__title__panx"
    @vue-pan-y="listen__title__pany"
    @vue-zoom="listen__title__zoom"
    @vue-setting-onchanged="listen__title_setting__onchanged" />
  <drop-view v-if="setting.phase == 'wait-input'" @vue-input-files="listen__drop_view__oninput"/>
  <div class="opened" v-if="setting.phase == 'opened'"
    ref="div_opened"
    @touchstart="listen__div_opened__on_x_down($event, 'touch')"
    @mousedown="listen__div_opened__on_x_down($event, 'mouse')"
    @wheel="listen__div_opened__onwheel">
    <div class="row-frame" v-for="(frames_, row) in frames" :key="`row-${row}`">
      <div class="col-frame" v-for="(frame, col) in frames_" :key="`col-${col}`">
        <frame-image-diff
          :class="`frame-${row}-${col}`"
          :frame-data="frame"
          :frame-pan-coord="framePanCoord"
          :frame-zoom="frameZoom"
          :frame-mouse-on="frameMouseOn"
          :setting="setting"
          @vue-mounted="(params) => { frameZoom = params.scale; framePanCoord = {x: params.x, y: params.y}}"
          @vue-mouseenter="frameMouseOn = true"
          @vue-mouseleave="frameMouseOn = false"
          :style="{ borderTop: getFrameBorder(row, col, true), borderLeft: getFrameBorder(row, col, false) }" />
      </div>
    </div>
  </div>
  <div class="opening" v-if="setting.phase == 'opening'">
    <div>
      <div class="w-spinner"><div class="spinner" v-show="progressErrorText == ''"></div></div>
      <span>{{ progressText }}</span>
    </div>
    <span style="color:rgb(255, 0, 0)">{{ progressErrorText }}</span>
  </div>
</div>
</template>

<script>
/* eslint-disable no-console */
import DropView from '@/components/DropView'
import FrameImageDiff from '@/components/FrameImageDiff'
import TitleBar from '@/components/TitleBar'
import PARSE from '@/js/parse.js'
import MISC from '@/js/miscellaneous.js'
import path from 'path'

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

export default {
  components: {
    'drop-view': DropView,
    'frame-image-diff': FrameImageDiff,
    'title-bar': TitleBar
  },
  data: function () {
    return {
      frames: [[]],
      framePanCoord: undefined,
      frameZoom: undefined,
      frameMouseOn: undefined,
      moveTouch: undefined,
      zoomTouch: undefined,
      progressText: '',
      progressErrorText: '',
      setting: {
        phase: 'wait-input',
        fullscreen: false,
        diff: true,
        alwaysShowOverlayText: true,
        frameRowCount: undefined,
        borderWidth: 1,
        borderColor: [255, 0, 0],
        predefinedImageWidth: undefined,
        predefinedImageHeight: undefined,
        tolerance: 1
      }
    }
  },
  methods: {
    listen__drop_view__oninput: async function (files) {
      const Vue = this
      if (Vue.setting.fullscreen == true) {
        if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen()
        } else if (document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullScreen()
        }
      }
      await sleep(200)
      Vue.$nextTick(async () => {
        Vue.setting.phase = 'opening'
        try {
          let data0 = []
          for (const file of files) {
            Vue.progressText = `parse ${file.name}`
            const res = await PARSE.parseImage(file)
            
            let {name, params, index} = Vue.parseName(file.name)
            data0.push({image: res, name, params, index})
          }
          data0.sort((v1, v2) => v1.index - v2.index)
          const defWidth = Vue.setting.predefinedImageWidth != undefined ? Vue.setting.predefinedImageWidth : data0[0].image.width
          const defHeight = Vue.setting.predefinedImageHeight != undefined ? Vue.setting.predefinedImageHeight : data0[0].image.height
          let data = []
          for (let idx in data0) {
            const datum = data0[idx]
            const image = datum.image
            let cornerstonImage
            let resized
            if (defWidth != image.width || defHeight != image.height) {
              const pixelData = MISC.resizeImg(image.pixelData, image.width, image.height, defWidth, defHeight)
              cornerstonImage = await Vue.$cornerstone.createCornerstoneImageRgba(undefined, pixelData, defWidth, defHeight)
              Vue.$toasted.show(`${datum.name} was resized to ${defWidth}x${defHeight}`, {type: 'error', duration: 2500, position: 'bottom-center'})
              resized = true
            } else {
              cornerstonImage = await Vue.$cornerstone.createCornerstoneImageRgba(undefined, image.pixelData, defWidth, defHeight)
              resized = false
            }
            data.push({cornerstonImage, name: datum.name, params: datum.params, resized})
          }
          Vue.setting.phase = 'opened'
          Vue.frames = Vue.arrangeFrames(data)
        } catch (err) {
          console.log(err)
          Vue.progressErrorText = err
        }
      })
    },
    listen__frame__onmousemove: function (param) {
      this.framePanCoord = param
    },
    listen__div_opened__on_x_down: function (e, type) {
      const Vue = this
      function mouseUpHandler () {
        Vue.$el.removeEventListener('mousemove', mouseMoveHandler)
        Vue.$el.removeEventListener('mouseup', mouseUpHandler)
      }
      function touchUpHandler (e) {
        if (Array.prototype.findIndex.call(e.changedTouches, v => v.identifier == Vue.moveTouch.identifier) == -1) return
        Vue.moveTouch = undefined

        Vue.$el.removeEventListener('touchmove', touchMoveHandler)
        Vue.$el.removeEventListener('touchend', touchUpHandler)
      }
      function touchUpHandler2 (e) {
        if (Array.prototype.findIndex.call(e.changedTouches, v => v.identifier == Vue.zoomTouch.identifier) == -1) return
        Vue.zoomTouch = undefined

        Vue.$el.removeEventListener('touchmove', touchMoveHandler2)
        Vue.$el.removeEventListener('touchend', touchUpHandler2)
      }
      function mouseMoveHandler (e) {
        const deltaX = e.pageX - lastX
        const deltaY = e.pageY - lastY
        lastX = e.pageX
        lastY = e.pageY

        const x = Vue.framePanCoord.x + (deltaX / Vue.frameZoom)
        const y = Vue.framePanCoord.y + (deltaY / Vue.frameZoom)
        Vue.framePanCoord = {x, y}
      }
      function touchMoveHandler (e) {
        const idx = Array.prototype.findIndex.call(e.changedTouches, v => v.identifier == Vue.moveTouch.identifier)
        if (idx == -1) return
        const touch = e.changedTouches[idx]

        const deltaX = touch.pageX - lastX
        const deltaY = touch.pageY - lastY
        lastX = touch.pageX
        lastY = touch.pageY

        if (Vue.zoomTouch == undefined) {
          const x = Vue.framePanCoord.x + (deltaX / Vue.frameZoom)
          const y = Vue.framePanCoord.y + (deltaY / Vue.frameZoom)
          Vue.framePanCoord = {x, y}
        }
      }
      function touchMoveHandler2 (e) {
        const idx = Array.prototype.findIndex.call(e.changedTouches, v => v.identifier == Vue.zoomTouch.identifier)
        if (Vue.moveTouch == undefined || idx == -1) return
        const touch = e.changedTouches[idx]

        const cdist = 2.5 * (Math.abs(touch.pageX - Vue.moveTouch.pageX) + Math.abs(touch.pageY - Vue.moveTouch.pageY)) / (window.innerHeight + window.innerWidth)
        if (dist == undefined) {
          dist = cdist
          return
        }
        const as = cdist - dist
        dist = cdist
        const scale = Vue.frameZoom + as
        if (scale > 0) Vue.frameZoom = scale
      }
      function mouseDownHandler () {
        Vue.$el.addEventListener('mousemove', mouseMoveHandler)
        Vue.$el.addEventListener('mouseup', mouseUpHandler)
      }
      function touchDownHandler () {
        Vue.$el.addEventListener('touchmove', touchMoveHandler)
        Vue.$el.addEventListener('touchend', touchUpHandler)
      }
      function touchDown2Handler () {
        Vue.$el.addEventListener('touchmove', touchMoveHandler2)
        Vue.$el.addEventListener('touchend', touchUpHandler2)
      }

      if (Vue.framePanCoord == undefined) return

      let lastX, lastY, dist
      if (type == 'touch' && e.which == 0) {
        e.preventDefault()
        if (Vue.moveTouch != undefined) {
          Vue.zoomTouch = Vue.copyTouch(e.changedTouches[0])
          touchDown2Handler()
        } else {
          Vue.moveTouch = Vue.copyTouch(e.changedTouches[0])
          lastX = e.changedTouches[0].pageX
          lastY = e.changedTouches[0].pageY
          touchDownHandler()
        }
      } else if (type == 'mouse' && e.which == 1) {
        lastX = e.pageX
        lastY = e.pageY
        mouseDownHandler()
      }
    },
    listen__div_opened__onwheel: function (e) {      
      const Vue = this
      if (Vue.frameZoom == undefined) return

      const as = e.wheelDelta < 0 || e.detail > 0 ? -0.10 : 0.10
      const scale = Vue.frameZoom + as
      if (scale > 0) Vue.frameZoom = scale
      return false
    },
    listen__x__tohome: function () {
      this.framePanCoord = undefined
      this.frameZoom = undefined
      this.frames = [[]]
      this.moveTouch = undefined
      this.zoomTouch = undefined
      
      /*
      if (isNaN(parseInt(this.setting.frameRowCount))) this.setting.frameRowCount = undefined
      if (isNaN(parseInt(this.setting.predefinedImageWidth))) this.setting.predefinedImageWidth = undefined
      if (isNaN(parseInt(this.setting.predefinedImageHeight))) this.setting.predefinedImageHeight = undefined
      */
      if (this.setting.frameRowCount != undefined) {
        this.$toasted.show(`setting - 'frameRowCount' cleared`, {type: 'error', duration: 2000, position: 'bottom-center'})
        this.setting.frameRowCount = undefined
      }
      if (this.setting.predefinedImageWidth != undefined && this.setting.predefinedImageHeight != undefined) {
        this.$toasted.show(`setting - 'define image size' cleared`, {type: 'error', duration: 2000, position: 'bottom-center'})
        this.setting.predefinedImageWidth = undefined
        this.setting.predefinedImageHeight = undefined
      }
    },
    listen__title__panx: function (x) {
      this.framePanCoord = {x, y: this.framePanCoord.y}
    },
    listen__title__pany: function (y) {
      this.framePanCoord = {x: this.framePanCoord.x, y}
    },
    listen__title__zoom: function (scale) {
      this.frameZoom = scale
    },
    listen__title_setting__onchanged: function (changed) {
      if (changed.diff != undefined) {
        if (changed.diff != this.setting.diff) this.setting.diff = changed.diff
      }
      if (changed.tolerance != undefined) {
        if (changed.tolerance != this.setting.tolerance) this.setting.tolerance = changed.tolerance
      }
      if (changed.predefinedImageWidth != undefined && changed.predefinedImageHeight != undefined) {
        this.setting.predefinedImageWidth = changed.predefinedImageWidth
        this.setting.predefinedImageHeight = changed.predefinedImageHeight
      }
      if (changed.alwaysShowOverlayText != undefined) {
        this.setting.alwaysShowOverlayText = changed.alwaysShowOverlayText
      }
      if (changed.borderWidth != undefined) {
        this.setting.borderWidth = changed.borderWidth
        if (this.setting.phase == 'opened') {
          for (let row = 0; row < frames.length; row++) {
            for (let col = 0; col < frames[row].length; col++) {
              document.querySelector(`.frame-${row}-${col}`).style.borderBottom = this.getFrameBorder(row, col)
            }
          }
        }
      }
      if (changed.borderColor != undefined) {
        this.setting.borderColor = changed.borderColor
        if (this.setting.phase == 'opened') {
          for (let row = 0; row < frames.length; row++) {
            for (let col = 0; col < frames[row].length; col++) {
              document.querySelector(`.frame-${row}-${col}`).style.borderBottom = this.getFrameBorder(row, col)
            }
          }
        }
      }
      if (changed.frameRowCount != undefined) {
        this.setting.frameRowCount = changed.frameRowCount
        let frames = this.frames.reduce((acc, val) => acc.concat(val), [])
        frames = frames.filter(v => v != undefined)
        this.frames = this.arrangeFrames(frames, this.setting.frameRowCount)
      }
    },
    parseName: function (str) {
      const ext = path.extname(str)
      str = str.substr(0, str.length - ext.length)
      let tokens = str.split('__')
      const name = tokens[0]
      tokens = tokens.slice(1)
      tokens = tokens.slice(0, Math.floor(tokens.length / 2) * 2)
      let params = {}
      let index = 9999
      for (let i = 0; i < tokens.length; i += 2) {
        const key = tokens[i]
        const value = tokens[i + 1]
        if (key == 'index') {
          const valInt = parseInt(value)
          if (isNaN(valInt) == false)
            index = value
        }
        else params[key] = value
      }
      return {name, params, index}
    },
    copyTouch: function (touch) {
      return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
    },
    arrangeFrames: function (data) {
      function _arrangeFrames (data, frameRowCount) {
        let frames = []
        let idx = 0
        const cols = Math.ceil(data.length / frameRowCount)
        for (const datum of data) {
          if (idx % cols == 0) frames.push([])
          let _frames = frames[frames.length - 1]
          _frames.push(datum)
          idx++
        }
        for (; idx < cols * frameRowCount; idx++) {
          const datum = data[idx]
          if (idx % cols == 0) frames.push([])
          let _frames = frames[frames.length - 1]
          _frames.push(datum)
        }
        return frames
      }
      const Vue = this
      if (Vue.setting.frameRowCount == undefined) {
        if (data.length < 3) Vue.setting.frameRowCount = 1
        else if (data.length < 9) Vue.setting.frameRowCount = 2
        else Vue.setting.frameRowCount = 3
      }
      
      return _arrangeFrames(data, Vue.setting.frameRowCount)
    },
    getFrameBorder: function (row, col, isTop) {
      const Vue = this
      if (isTop) return row > 0? `${Vue.setting.borderWidth}px solid rgb(${Vue.setting.borderColor.join(',')})` : ''
      else return col > 0? `${Vue.setting.borderWidth}px solid rgb(${Vue.setting.borderColor.join(',')})` : ''
    }
  },
  created () {
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgb(230, 230, 230);
  min-height: 0;
}
div.wait-input {
  display: flex;
  width: 100%;
  flex: 1 0 0;
  align-items: center;
  justify-content: center;
}
div.opening {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 0;
  align-items: center;
  justify-content: center;
}
.w-spinner {
  position:relative;
  display:inline-block;
  top: 7px;
  width:20px;
  height:20px;
  margin-right: 8px;
}
div.opening span {
  font-size: 16px;
}
div.opened {
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
div.row-frame {
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  min-width: 0;
  min-height: 0;
}
div.col-frame {
  flex: 1 0 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
</style>