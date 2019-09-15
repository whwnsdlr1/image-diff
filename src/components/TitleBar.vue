<template>
<div class="body">
  <div class="lamp">
    <div>
      <span>x:</span>
      <input type="number" :value="x" @change="listen__x__onchange" :disabled="setting.phase != 'opened'" />
    </div>
    <div>
      <span>y:</span>
      <input type="number" :value="y" @change="listen__y__onchange" :disabled="setting.phase != 'opened'"/>
    </div>
    <div>
      <span>scale:</span>
      <input type="number" min="0.01" :value="scale" @change="listen__scale__onchange" :disabled="setting.phase != 'opened'"/>
    </div>
    <div>
      <span>diff:</span>
      <input type="checkbox" @change="listen__setting__onchange({diff: $event.target.checked})" :disabled="setting.phase != 'opened'" :checked="setting.diff == true" />
    </div>
    <div>
      <span>tolerance:</span>
      <input ref="input-tolerance" type="range" min="1" max="441.67" v-model="tolerance"  :disabled="setting.phase != 'opened' || setting.diff == false" />
      <span>{{tolerance}}</span>
    </div>
  </div>
  <a href="https://github.com/whwnsdlr1/image-diff" style="line-height:0"><img class="btn github" src="@/assets/icons/GitHub-Mark-Light-32px.png" title="github"/></a>
  <img class="btn" src="@/assets/icons/outline_home_white_24dp.png" title="home" @click="listen__home__onclick" />
  <img class="btn" src="@/assets/icons/baseline_assessment_white_24dp.png" title="statistics / not yet supported" />
  <img v-show="setting.fullscreen == false" class="btn" src="@/assets/icons/outline_fullscreen_white_24dp.png" title="maxmize" @click="listen__fullscreen__onclick" />
  <img v-show="setting.fullscreen == true" class="btn" src="@/assets/icons/outline_fullscreen_exit_white_24dp.png" title="minimize" @click="listen__fullscreen__onclick" />
  <img class="btn" src="@/assets/icons/outline_brightness_low_white_24dp.png" title="setting" @click="listen__setting__onclick" />
</div>
</template>

<script>
/* eslint-disable no-console */
import MISC from '@/js/miscellaneous.js'
export default {
  props: ['setting', 'frame-zoom', 'frame-pan-coord'],
  data: function () {
    return {
      x: undefined,
      y: undefined,
      scale: undefined,
      tolerance: undefined
    }
  },
  methods: {
    listen__home__onclick: function () {
      this.setting.phase = 'wait-input'
      this.$emit('vue-move-home', {})
    },
    listen__fullscreen__onclick: function () {
      if (this.setting.fullscreen == true) {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
        this.setting.fullscreen = false
      }
      else {
        if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen()
        } else if (document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullScreen()
        }
        this.setting.fullscreen = true
      }
    },
    listen__setting__onclick: function () {
      const Vue = this
      const styleRowOption = {display: 'flex', flexDirection: 'row', marginBottom: '15px', alignItems: 'center', justifyContent: 'space-between'}
      const styleInput = {borderRadius: '5px', padding: '0px 0px 0px 3px'}
      let dom = MISC.createElement('DIV', {width: '300px'}, {})
      let rowOption0 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption0, text: `define image size`})
      let rowOption0Col1 = MISC.createElement('DIV', {}, {parent: rowOption0})
      let inputPredefinedImageWidth = MISC.createElement('INPUT', {width: '40px', ...styleInput}, {parent: rowOption0Col1, attrs: {type: 'number', min: 1, value: Vue.setting.predefinedImageWidth}})
      if (Vue.setting.phase != 'wait-input') inputPredefinedImageWidth.disabled = true
      MISC.createElement('SPAN', {fontSize: '12px', padding: '0px 5px'}, {parent: rowOption0Col1, text: 'x'})
      let inputPredefinedImageHeight = MISC.createElement('INPUT', {width: '40px', ...styleInput}, {parent: rowOption0Col1, attrs: {type: 'number', min: 1, value: Vue.setting.predefinedImageHeight}})
      if (Vue.setting.phase != 'wait-input') inputPredefinedImageHeight.disabled = true
      let rowOption1 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption1, text: 'always show overlay text'})
      let inputAlwaysShowOverlayText= MISC.createElement('INPUT', {}, {parent: rowOption1, attrs: {type: 'checkbox'}})
      if (Vue.setting.alwaysShowOverlayText == true) inputAlwaysShowOverlayText.checked = true
      let rowOption3 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption3, text: `frame row count`})
      let inputFrameRowCount = MISC.createElement('INPUT', {width: '40px', ...styleInput}, {parent: rowOption3, attrs: {type: 'number', min: 1, value: Vue.setting.frameRowCount}})
      let rowOption4 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption4, text: `border width`})
      let inputBorderWidth = MISC.createElement('INPUT', {width: '40px', ...styleInput}, {parent: rowOption4, attrs: {type: 'number', min: 0, max: 10, value: Vue.setting.borderWidth}})
      let rowOption5 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption5, text: `border color`})
      let rowOption5Col2 = MISC.createElement('DIV', {}, {parent: rowOption5})
      MISC.createElement('SPAN', {fontSize: '12px', marginRight: '3px'}, {parent: rowOption5Col2, text: `R:`})
      let inputBorderColorR = MISC.createElement('INPUT', {width: '40px', marginRight: '10px', ...styleInput}, {parent: rowOption5Col2, attrs: {type: 'number', min: 0, max: 255, value: Vue.setting.borderColor[0]}})
      MISC.createElement('SPAN', {fontSize: '12px', marginRight: '3px'}, {parent: rowOption5Col2, text: `G:`})
      let inputBorderColorG = MISC.createElement('INPUT', {width: '40px', marginRight: '10px', ...styleInput}, {parent: rowOption5Col2, attrs: {type: 'number', min: 0, max: 255, value: Vue.setting.borderColor[1]}})
      MISC.createElement('SPAN', {fontSize: '12px', marginRight: '3px'}, {parent: rowOption5Col2, text: `B:`})
      let inputBorderColorB = MISC.createElement('INPUT', {width: '40px', ...styleInput}, {parent: rowOption5Col2, attrs: {type: 'number', min: 0, max: 255, value: Vue.setting.borderColor[2]}})
      Vue.$mModal.show('dialog', {
        dom: dom,
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
              const predefinedImageWidth = inputPredefinedImageWidth.value
              const predefinedImageHeight = inputPredefinedImageHeight.value
              if (isNaN(parseInt(predefinedImageWidth)) == false && predefinedImageWidth != Vue.setting.predefinedImageWidth &&
                isNaN(parseInt(predefinedImageHeight)) == false && predefinedImageHeight != Vue.setting.predefinedImageHeight) {
                  
                if (predefinedImageWidth > 0 && predefinedImageHeight > 0) {
                  changed.predefinedImageWidth = parseInt(predefinedImageWidth)
                  changed.predefinedImageHeight = parseInt(predefinedImageHeight)
                }
              }
              const alwaysShowOverlayText = inputAlwaysShowOverlayText.checked
              if (alwaysShowOverlayText != Vue.setting.alwaysShowOverlayText) {
                changed.alwaysShowOverlayText = alwaysShowOverlayText
              }
              const frameRowCount = inputFrameRowCount.value
              if (isNaN(parseInt(frameRowCount)) == false && frameRowCount != Vue.setting.frameRowCount) {
                if (frameRowCount > 0) changed.frameRowCount = parseInt(frameRowCount)
              }
              const borderWidth = inputBorderWidth.value
              if (isNaN(parseInt(borderWidth)) == false && borderWidth != Vue.setting.borderWidth) {
                if (borderWidth >= 0 && borderWidth < 40) changed.borderWidth = parseInt(borderWidth)
              }
              const borderColor = [inputBorderColorR.value, inputBorderColorG.value, inputBorderColorB.value]
              if (borderColor.map((v, i) => v == Vue.setting.borderWidth[i]).reduce((acc, v) => acc && v, true) == false) {
                if (borderColor.map(v => isNaN(parseInt(v)) == false && v >= 0 && v <= 255).reduce((acc, v) => acc && v, true)) changed.borderColor = borderColor
              }
              Vue.$emit('vue-setting-onchanged', changed)
            }
          }
        ]
      })
    },
    listen__setting__onchange: function (changed) {
      const Vue = this
      Vue.$emit('vue-setting-onchanged', changed)
    },
    listen__x__onchange: function (e) {
      const val = parseFloat(e.currentTarget.value)
      if (isNaN(val) == false && val != this.x) {
        this.x = val
        this.$emit('vue-pan-x', val)
      }
    },
    listen__y__onchange: function (e) {
      const val = parseFloat(e.currentTarget.value)
      if (isNaN(val) == false && val != this.y) {
        this.y = val
        this.$emit('vue-pan-y', val)
      }
    },
    listen__scale__onchange: function (e) {
      const val = parseFloat(e.currentTarget.value)
      if (isNaN(val) == false && val != this.scale) {
        this.scale = val
        this.$emit('vue-zoom', val)
      }
    }
  },
  watch: {
    framePanCoord: function (framePanCoord) {
      if (framePanCoord != undefined) {
        this.x = parseFloat(framePanCoord.x.toFixed(2))
        this.y = parseFloat(framePanCoord.y.toFixed(2))
      } else {
        this.x = this.y = undefined
      }
    },
    frameZoom: function (frameZoom) {
      if (frameZoom != undefined) this.scale = parseFloat(frameZoom.toFixed(2))
      else this.scale = undefined
    },
    'setting.tolerance': function (tolerance) {
      this.tolerance = tolerance
    }
  },
  mounted () {
    const Vue = this
    Vue.tolerance = Vue.setting.tolerance
    
    Vue.$refs['input-tolerance'].onchange = Vue._.debounce(function () {
      Vue.$emit('vue-setting-onchanged', {tolerance: this.tolerance})
    }, 100)
  }
}
</script>

<style scoped>
div.body {
  display: flex;
  flex-direction: row;
  flex: 0 0 35px;
  background: rgb(36, 41, 46);
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
  border-bottom: 1px solid rgb(80, 80, 80);
}
div.lamp {
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  top: -2px;
  justify-content: center;
  overflow:hidden;
}
div.lamp > div:not(:last-child) {
  margin-right: 20px;
}
div.lamp span:first-child {
  font-size: 14px;
  font-weight: bold;
  color: rgb(230, 230, 230);
  margin-right: 5px;
}
div.lamp span:not(:first-child) {
  display: inline-block;
  width: 25px;
  font-size: 12px;
  color: rgb(230, 230, 230);
  margin-left: 5px;
}
div.lamp input {
  width: 60px;
  border-radius: 5px;
  padding: 0px 0px 0px 3px;
}
div.lamp input[type=checkbox] {
  position: relative;
  top: 2px;
  width: 15px;
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
}
div.lamp input[type=range] {
  position: relative;
  bottom: 1px;
  width: 100px;
  height: 6px;
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
  -webkit-appearance: none;
  border-radius: 3px;
  border: 1px solid rgb(180, 180, 180);
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  box-sizing: border-box;
}
div.lamp input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 8px;
  height: 15px;
  background: rgb(0, 123, 255);
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
}
div.lamp input[type=range][disabled]::-webkit-slider-thumb {
  background: rgb(80, 80, 80);
}
div.lamp input[type=range]::-moz-range-thumb {
  width: 8px;
  height: 15px;
  background: rgb(0, 123, 255);
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
}
div.lamp input[type=range][disabled]::-moz-range-thumb {
  background: rgb(80, 80, 80);
}
img.btn {
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid rgb(36, 41, 46);
  margin-right: 5px;
}
img.btn.github {
  width: 20px;
  height: 20px;
  padding: 3px;
}
img.btn:hover {
  background: rgb(80, 80, 80);
  border: 1px solid rgb(150, 150, 150);
}
</style>
