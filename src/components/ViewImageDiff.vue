<template>
<div class="body">
  <div class="wait-input" v-if="phase == 'wait-input'">
    <input ref="input-file" type="file" multiple accept=".jpg,.png" @change="listen__x__onchange" />
  </div>
  <div class="opened" v-if="phase == 'opened'"
    ref="div_opened"
    @mousedown=listen__div_opened__onmousedown
    @wheel="listen__div_opened__onwheel">
    <div class="row-frame" v-for="(frames_, row) in frames" :key="`row-${row}`">
      <div class="col-frame" v-for="(frame, col) in frames_" :key="`col-${col}`">
        <frame-image-diff
          :frame-data="frame"
          :frame-pan-coord="framePanCoord"
          :frame-zoom="frameZoom"
          :frame-mouse-on="frameMouseOn"
          @vue-mounted="(params) => { frameZoom = params.scale; framePanCoord = {x: params.x, y: params.y}}"
          @vue-mouseenter="frameMouseOn = true"
          @vue-mouseleave="frameMouseOn = false" />
      </div>
    </div>
  </div>
  <div class="opening" v-if="phase == 'opening'">
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
import FrameImageDiff from '@/components/FrameImageDiff'
import PARSE from '@/js/parse.js'
import MISC from '@/js/miscellaneous.js'
import path from 'path'
export default {
  components: {
    'frame-image-diff': FrameImageDiff
  },
  data: function () {
    return {
      phase: 'wait-input',
      frames: [[]],
      framePanCoord: undefined,
      frameZoom: undefined,
      frameMouseOn: undefined,
      progressText: '',
      progressErrorText: '',
    }
  },
  methods: {
    listen__x__onchange: async function (e) {
      this.phase = 'opening'
      const files = e.target.files
      try {
        let data0 = []
        for (const file of files) {
          this.progressText = `parse ${file.name}`
          const res = await PARSE.parseImage(file)
          
          let {name, params, index} = this.parseName(file.name)
          data0.push({image: res, name, params, index})
        }
        data0.sort((v1, v2) => v1.index - v2.index)
        let data = []
        for (let idx in data0) {
          const defWidth = data0[0].image.width
          const defHeight = data0[0].image.height
          const datum = data0[idx]
          const image = datum.image
          let cornerstonImage
          if (defWidth != image.width || defHeight != image.height) {
            const pixelData = MISC.resizeImg(image.pixelData, image.width, image.height, defWidth, defHeight)
            cornerstonImage = await this.$cornerstone.createCornerstoneImageRgba(undefined, pixelData, defWidth, defHeight)
          } else {
            cornerstonImage = await this.$cornerstone.createCornerstoneImageRgba(undefined, image.pixelData, defWidth, defHeight)
          }
          data.push({cornerstonImage, name: datum.name, params: datum.params})
        }
        var frames
        if (data.length < 3) {
          frames = [[]]
          for (const datum of data) {
            frames[0].push(datum)
          }
        } else if (data.length < 9) {
          frames = [[], []]
          let idx = 0
          for (const datum of data) {
            frames[idx < data.length / 2? 0 : 1].push(datum)
            idx++
          }
        } else {
          frames = [[], [], []]
          let idx = 0
          for (const datum of data) {
            frames[idx < data.length / 3? 0 : (idx < 2 * data.length / 3? 1 : 2)].push(datum)
            idx++
          }
        }
        if (frames.length > 1) {
          const firstFrames_ = frames[0]
          let lastFrames_ = frames[frames.length - 1]
          lastFrames_.push(...new Array(firstFrames_.length - lastFrames_.length).fill(undefined))
        }
        this.phase = 'opened'
        this.frames = frames
      } catch (err) {
        console.log(err)
        this.progressErrorText = err
      }
    },
    listen__frame__onmousemove: function (param) {
      this.framePanCoord = param
    },
    listen__div_opened__onmousedown: function (e) {
      const Vue = this
      if (Vue.framePanCoord == undefined) return
      
      function mouseMoveHandler (e) {
        const deltaX = e.pageX - lastX
        const deltaY = e.pageY - lastY
        lastX = e.pageX
        lastY = e.pageY

        const x = Vue.framePanCoord.x + (deltaX / Vue.frameZoom)
        const y = Vue.framePanCoord.y + (deltaY / Vue.frameZoom)
        Vue.framePanCoord = {x, y}
      }

      function mouseUpHandler () {
        Vue.$el.removeEventListener('mousemove', mouseMoveHandler)
        Vue.$el.removeEventListener('mouseup', mouseUpHandler)
        // Vue.$el.removeEventListener('mouseleave', mouseUpHandler)
      }
      let lastX, lastY
      if (e.which === 1) {
        lastX = e.pageX
        lastY = e.pageY
        Vue.$el.addEventListener('mousemove', mouseMoveHandler)
        Vue.$el.addEventListener('mouseup', mouseUpHandler)
        // Vue.$el.addEventListener('mouseleave', mouseUpHandler)
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
    parseName: function(str) {
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
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  background: rgb(230, 230, 230);
}
div.wait-input {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
div.opening {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  height: 100%;
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
div.row-frame:not(:last-child) {
  border-bottom: 1px solid red;
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
div.col-frame:not(:first-child) {
  border-left: 1px solid red;
}
</style>