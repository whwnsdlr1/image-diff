<template>
<div class="body">
  <title-bar :setting="setting"
    :frame-pan-coord="framePanCoord"
    :frame-zoom="frameZoom"
    @vue-move-home="listen__x__tohome"
    @vue-frame-rearrange="listen__x__onrearrangeframe"
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
    <div class="row-frame" v-for="(frameRow, row) in frame2D" :key="`row-${row}`">
      <div class="col-frame" v-for="(frame, col) in frameRow" :key="`col-${row}-${col}-${setting.frameRowCount}`"
        @dblclick="listen__frame__ondblclick(frame)">
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
  <div class="layer" v-show="layer.active">
    <div>
      <div class="w-spinner"><div class="spinner" v-show="layer.errorMessage == ''"></div></div>
      <span>{{ layer.message }}</span>
    </div>
    <span style="color:rgb(255, 0, 0)">{{ layer.errorMessage }}</span>
    <img v-show="layer.errorMessage != ''" class="btn" src="@/assets/icons/outline_home_white_24dp.png" title="home" @click="listen__x__tohome" />
  </div>
</div>
</template>

<script>
/* eslint-disable no-console */
import DropView from '@/components/DropView'
import FrameImageDiff from '@/components/FrameImageDiff'
import TitleBar from '@/components/TitleBar'
import ReArrange2D from '@/components/ReArrange2D'

import VueVue from 'vue'
import path from 'path'
import PARSE from '@/js/parse.js'
import MISC from '@/js/miscellaneous.js'
import ImageSimilarity from '@/js/image_similarity.js'

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
      frames: [],
      framePanCoord: undefined,
      frameZoom: undefined,
      frameMouseOn: undefined,
      moveTouch: undefined,
      zoomTouch: undefined,
      diffs: undefined,
      psnrs: undefined,
      setting: {
        phase: 'wait-input',
        fullscreen: false,
        alwaysShowOverlayText: true,
        frameRowCount: undefined,
        borderWidth: 1,
        borderColor: [255, 0, 0],
        predefinedImageWidth: undefined,
        predefinedImageHeight: undefined,
        diff: {
          active: false,
          reference: undefined,
          tolerance: 1
        }
      },
      layer: {
        active: false,
        message: '',
        errorMessage: ''
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
      Vue.layer.active = true
      await Vue.nextTick(200)
      try {
        let data0 = []
        for (const file of files) {
          Vue.layer.message = `parse ${file.name}`
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
          let cornerstoneImage
          let resized
          if (defWidth != image.width || defHeight != image.height) {
            const pixelData = MISC.resizeImg(image.pixelData, image.width, image.height, defWidth, defHeight)
            cornerstoneImage = await Vue.$cornerstone.createCornerstoneImageRgba(undefined, pixelData, defWidth, defHeight)
            // Vue.$toasted.show(`${datum.name} was resized to ${defWidth}x${defHeight}`, {type: 'error', duration: 2500, position: 'bottom-center'})
            resized = true
          } else {
            cornerstoneImage = await Vue.$cornerstone.createCornerstoneImageRgba(undefined, image.pixelData, defWidth, defHeight)
            resized = false
          }
          
          data.push({
            id: MISC.getUuid4(),
            cornerstoneImage,
            diff: {
              cornerstoneImage: undefined,
              pixelCount: undefined,
              psnr: undefined,
              updated: 0,
              opacity: 0.7
            },
            name: datum.name,
            params: datum.params,
            resized})
        }
        Vue.setting.phase = 'opened'
        Vue.frames = data
        Vue.layer.active = false
      } catch (err) {
        console.log(err)
        Vue.layer.errorMessage = err
      }
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
    listen__frame__ondblclick: function (frame) {
      const Vue = this
      if (Vue.setting.diff.active == true) {
        Vue.listen__title_setting__onchanged({diff: {reference: frame}})
      }
    },
    listen__x__tohome: function () {
      this.framePanCoord = undefined
      this.frameZoom = undefined
      this.frames = []
      this.moveTouch = undefined
      this.zoomTouch = undefined
      this.diffs = undefined
      this.psnrs = undefined
      this.setting.diff.active = false
      this.setting.diff.reference = undefined
      this.setting.diff.tolerance = 1
      this.layer.message = ''
      this.layer.errorMessage = ''
      this.layer.active = false
      
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
    listen__x__onrearrangeframe: function () {
      const Vue = this
      if (Vue.setting.phase != 'opened') {
        Vue.$toasted.show(`open images first.`, {type: 'error', duration: 2500, position: 'bottom-center'})
      } else {
        let dom = MISC.createElement('DIV', {}, {})
        MISC.createElement('H2', {marginTop: '0px', fontSize: '16px'}, {parent: dom, text: `You Can Drag & Drop below block to rearrange frame's position`})
        MISC.createElement('hr', {marginTop: '0px', fontSize: '16px'}, {parent: dom})
        const ComponentClass = VueVue.extend(ReArrange2D)
        const array2D = this.frame2D.map((frame1D) => {
          return frame1D.map((el) => {
            return el != undefined ? {id: el.id, name: el.name} : undefined
          }).filter((el) => el != undefined)
        })
        // const domComponent = new ComponentClass({el: MISC.createElement('DIV', {}, {}), data: function () { return {'dataArray2D': array2D} }}).$el
        const domComponent = new ComponentClass({el: MISC.createElement('DIV', {}, {}), propsData: {'dataArray2D': array2D}}).$el
        dom.appendChild(domComponent)
        Vue.$mModal.show('dialog', {
          dom: dom,
          onafterdomattached: function () {
            domComponent.style.width = `${window.innerWidth * 0.7}px`
            domComponent.style.height = `${window.innerHeight * 0.6}px`
          },
          buttons: [
            {
              title: 'cancel',
              onclick: () => {}
            },
            {
              title: 'confirm',
              class: ['green'],
              onclick: () => {
                let changed = {}
                Vue.$emit('vue-setting-onchanged', changed)
              }
            }
          ]
        })
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
    listen__title_setting__onchanged: async function (changed) {
      const Vue = this
      
      Vue.layer.message = 'change setting.'
      Vue.layer.active = true
      Vue.doubleRaf(async () => {
        if (changed.diff != undefined) {
          if (Vue.frames.length <= 1) {
            Vue.$toasted.show(`To diff, need more than one image`, {type: 'error', duration: 1500, position: 'bottom-center'})
          }
          else {
            if (changed.diff.active != undefined) {
              if (changed.diff.active != Vue.setting.diff.active) Vue.setting.diff.active = changed.diff.active
              if (Vue.setting.diff.active == true) {
                Vue.layer.message = 'check pre-cacluated diff'
                await Vue.nextTick()
                let frames = Vue.frames
                for (let i = 0; i < frames.length; i++) {
                  let frame = frames[i]
                  if (frame == undefined) continue
                  if (frame.diff.cornerstoneImage == undefined) {
                    Vue.layer.message = `create ${frame.name}'s layer image.`
                    await Vue.nextTick()
                    frame.diff.cornerstoneImage = await Vue.$cornerstone.createCornerstoneImageRgba(
                      undefined,
                      new Uint8Array(frame.cornerstoneImage.width * frame.cornerstoneImage.height * 4).fill(255),
                      frame.cornerstoneImage.width,
                      frame.cornerstoneImage.height
                    )
                  }
                }
                if (Vue.diffs == undefined) {
                  let diffs = []
                  let psnrs = []
                  for (let i = 0; i < frames.length; i++) {
                    diffs.push(new Array(frames.length))
                    psnrs.push(new Array(frames.length))
                  }
                  for (let i1 = 0; i1 < frames.length - 1; i1++) {
                    const frame1 = frames[i1]
                    const pixelData1 = frame1.cornerstoneImage.getPixelData()
                    Vue.layer.message = `caculate diff between ${frame1.name} and other images.`
                    await Vue.nextTick()
                    for (let i2 = i1 + 1; i2 < frames.length; i2++) {
                      const frame2 = frames[i2]
                      const pixelData2 = frame2.cornerstoneImage.getPixelData()
                      let diff = new Int16Array(frame2.cornerstoneImage.width * frame2.cornerstoneImage.height)
                      
                      for (let ip = 0; ip < diff.length; ip++) {
                        const p1 = ip * 4
                        const p2 = p1 + 1
                        const p3 = p1 + 2
                        diff[ip] = ((pixelData1[p1] - pixelData2[p1]) ** 2 + (pixelData1[p2] - pixelData2[p2]) ** 2 + (pixelData1[p3] - pixelData2[p3]) ** 2) ** 0.5
                      }
                      diffs[i1][i2] = diff
                      psnrs[i1][i2] = ImageSimilarity.calcPsnrRgba(pixelData1, pixelData2)
                    }
                  }
                  Vue.diffs = diffs
                  Vue.psnrs = psnrs
                }
              } else {
                for (let nf = 0; nf < Vue.frames.length; nf++) {
                  Vue.frames[nf].diff.updated = 0
                }
              }
            }
            let isChangeTolerance = false
            if (changed.diff.tolerance != undefined) {
              if (changed.diff.tolerance != Vue.setting.diff.tolerance) {
                Vue.setting.diff.tolerance = changed.diff.tolerance
                isChangeTolerance = true
              }
            }
            let isChangeReference = false
            if (changed.diff.reference != undefined) {
              if (changed.diff.reference != Vue.setting.diff.reference) {
                Vue.setting.diff.reference = changed.diff.reference
                isChangeReference = true
                Vue.setting.diff.reference.diff.pixelCount = undefined
                Vue.setting.diff.reference.diff.psnr = undefined
              }
            }
            if (Vue.setting.diff.reference == undefined) {
              Vue.setting.diff.reference = Vue.frames[0]
              isChangeReference = true
              Vue.setting.diff.reference.diff.pixelCount = undefined
              Vue.setting.diff.reference.diff.psnr = undefined
            }
            if (Vue.setting.diff.active == true) {
              if (isChangeTolerance || isChangeReference) {
                // recaculate diff image
                // console.log('recal')
                const tolerance = Vue.setting.diff.tolerance
                const i1 = Vue.frames.map(v => v.id).indexOf(Vue.setting.diff.reference.id)
                for (let i2 = 0; i2 < Vue.frames.length; i2++) {
                  if (i1 == i2) continue
                  let frame2 = Vue.frames[i2]
                  const diffArray = Vue.diffs[Math.min(i1, i2)][Math.max(i1, i2)]
                  let pixelData2 = frame2.diff.cornerstoneImage.getPixelData()
                  let diffPixelCount = 0
                  for (let np = 0; np < diffArray.length; np ++) {
                    const isDiff = diffArray[np] >= tolerance
                    const p1 = 4 * np
                    const p2 = p1 + 1
                    const p3 = p2 + 1
                    if (isDiff == false) {
                      pixelData2[p1] = 0
                      pixelData2[p2] = 0
                      pixelData2[p3] = 255
                    } else {
                      pixelData2[p1] = 255
                      pixelData2[p2] = 0
                      pixelData2[p3] = 0
                      diffPixelCount++
                    }
                  }
                  Vue.frames[i2].diff.pixelCount = diffPixelCount
                  Vue.frames[i2].diff.psnr = Vue.psnrs[Math.min(i1, i2)][Math.max(i1, i2)]
                }  
              }

              for (let nf = 0; nf < Vue.frames.length; nf++) {
                let frame = Vue.frames[nf]
                if (frame.id == Vue.setting.diff.reference.id) Vue.frames[nf].diff.updated = 0
                else Vue.frames[nf].diff.updated += 1
              }
            }
          }
        }
        if (changed.predefinedImageWidth != undefined && changed.predefinedImageHeight != undefined) {
          Vue.setting.predefinedImageWidth = changed.predefinedImageWidth
          Vue.setting.predefinedImageHeight = changed.predefinedImageHeight
        }
        if (changed.alwaysShowOverlayText != undefined) {
          Vue.setting.alwaysShowOverlayText = changed.alwaysShowOverlayText
        }
        if (changed.borderWidth != undefined) {
          Vue.setting.borderWidth = changed.borderWidth
        }
        if (changed.borderColor != undefined) {
          Vue.setting.borderColor = changed.borderColor
        }
        if (changed.frameRowCount != undefined) {
          Vue.setting.frameRowCount = changed.frameRowCount
        }
        Vue.layer.active = false
      })
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
    arrangeFrames: function (data, frameRowCount) {
      function _arrangeFrames (data, frameRowCount) {
        if (data == undefined || data.length == 0) return [[]]

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
          const datum = undefined
          if (idx % cols == 0) frames.push([])
          let _frames = frames[frames.length - 1]
          _frames.push(datum)
        }
        return frames
      }
      if (frameRowCount == undefined) {
        if (data.length < 3) frameRowCount = 1
        else if (data.length < 9) frameRowCount = 2
        else frameRowCount = 3
      }
      
      return _arrangeFrames(data, frameRowCount)
    },
    getFrameBorder: function (row, col, isTop) {
      const Vue = this
      if (isTop) return row > 0? `${Vue.setting.borderWidth}px solid rgb(${Vue.setting.borderColor.join(',')})` : ''
      else return col > 0? `${Vue.setting.borderWidth}px solid rgb(${Vue.setting.borderColor.join(',')})` : ''
    },
    getUuid4: function () {
      return MISC.getUuid4()
    },
    doubleRaf: function (callback) {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback)
      })
    },
    nextTick: async function (ms = 5) {
      await this.$nextTick()
      await sleep(ms)
    }
  },
  computed: {
    frame2D: function () {  
      return this.arrangeFrames(this.frames, this.setting.frameRowCount)
    }
  },
  created () {
  },
  updated () {
    // console.log('main updated')
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
.w-spinner {
  position:relative;
  display:inline-block;
  top: 7px;
  width:20px;
  height:20px;
  margin-right: 8px;
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
div.layer {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  align-items: center;
  justify-content: center;
}
div.layer > div, span {
  margin-bottom: 10px;
}
div.layer img.btn {
  padding: 8px 50px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid rgb(36, 41, 46);
  background: rgb(120, 120, 120);
}
div.layer img.btn:hover {
  background: rgb(80, 80, 80);
  border: 1px solid rgb(150, 150, 150);
}
</style>