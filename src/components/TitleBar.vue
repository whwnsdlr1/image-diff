<template>
<div class="body">
  <div class="lamp">
    <div>
      <span>x:</span>
      <input type="number" :value="x" @change="listen__x__onchange"/>
    </div>
    <div>
      <span>y:</span>
      <input type="number" :value="y" @change="listen__y__onchange"/>
    </div>
    <div>
      <span>scale:</span>
      <input type="number" min="0.01" :value="scale" @change="listen__scale__onchange"/>
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
      scale: undefined
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
      let rowOption1 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption1, text: 'always show overlay text'})
      MISC.createElement('INPUT', {}, {parent: rowOption1, attrs: {type: 'checkbox', checked: true}})
      let rowOption2 = MISC.createElement('DIV', styleRowOption, {parent: dom})
      let rowOption2Col1 = MISC.createElement('DIV', {}, {parent:rowOption2})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption2Col1, text: 'When you rest the mouse pointer over a image,'})
      MISC.createElement('BR', {}, {parent: rowOption2Col1})
      MISC.createElement('SPAN', {fontSize: '12px'}, {parent: rowOption2Col1, text: 'the rgb value is displayed'})
      MISC.createElement('INPUT', {}, {parent: rowOption2, attrs: {type: 'checkbox', checked: true}})
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
      MISC.createElement('INPUT', {width: '40px', marginRight: '10px', ...styleInput}, {parent: rowOption5Col2, attrs: {type: 'number', min: 0, max: 255}})
      MISC.createElement('SPAN', {fontSize: '12px', marginRight: '3px'}, {parent: rowOption5Col2, text: `G:`})
      MISC.createElement('INPUT', {width: '40px', marginRight: '10px', ...styleInput}, {parent: rowOption5Col2, attrs: {type: 'number', min: 0, max: 255}})
      MISC.createElement('SPAN', {fontSize: '12px', marginRight: '3px'}, {parent: rowOption5Col2, text: `B:`})
      MISC.createElement('INPUT', {width: '40px', ...styleInput}, {parent: rowOption5Col2, attrs: {type: 'number', min: 0, max: 255}})
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
              const frameRowCount = inputFrameRowCount.value
              if (frameRowCount != Vue.setting.frameRowCount) {
                if (frameRowCount > 0) changed.frameRowCount = frameRowCount
              }
              const borderWidth = inputBorderWidth.value
              if (borderWidth != Vue.setting.borderWidth) {
                if (borderWidth >= 0 && borderWidth < 20) changed.borderWidth = borderWidth
              }
              Vue.$emit('vue-setting-onchanged', changed)
            }
          }
        ]
      })
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
    }
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
  justify-content: center;
}
div.lamp > div:not(:last-child) {
  margin-right: 20px;
}
div.lamp span {
  font-size: 14px;
  font-weight: bold;
  color: rgb(230, 230, 230);
  margin-right: 5px;
}
div.lamp input {
  width: 60px;
  border-radius: 5px;
  padding: 0px 0px 0px 3px;
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
