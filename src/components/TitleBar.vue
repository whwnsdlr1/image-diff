<template>
<div class="body">
  <div class="lamp">
    <div class="pan-x">
      <span>x:</span>
      <input type="number" :value="x" @change="listen__x__onchange" :disabled="phase == 'drop'" />
    </div>
    <div class="pan-y">
      <span>y:</span>
      <input type="number" :value="y" @change="listen__y__onchange" :disabled="phase == 'drop'"/>
    </div>
    <div class="zoom">
      <span>zoom:</span>
      <input type="number" min="0.01" :value="zoom" @change="listen__zoom__onchange" :disabled="phase == 'drop'"/>
    </div>
    <div>
      <span>diff:</span>
      <input ref="check-diff" type="checkbox" @change="listen__diff_checked__onchange" :disabled="phase == 'drop'" :checked="state.diff.activate == true" />
    </div>
    <div>
      <span>ref:</span>
      <span class="diff-reference-val"
        :class="{inactive: !state.diff.activate}"
        :title="`${state.diff.reference != undefined ? state.diff.reference.id : ''}`">
        {{ state.diff.reference != undefined ? state.diff.reference.id : '' }}
      </span>
    </div>
    <div>
      <span>tolerance:</span>
      <input ref="input-tolerance" type="range" min="1" max="441.67" v-model="tolerance" :disabled="phase == 'drop' || state.diff.activate == false" />
      <span class="tolerance-val">{{ tolerance }}</span>
    </div>
  </div>
  <div class="icons">
    <a href="https://github.com/whwnsdlr1/image-diff" style="line-height:0"><img class="btn github" src="@/assets/icons/GitHub-Mark-Light-32px.png" title="github"/></a>
    <img class="btn" src="@/assets/icons/outline_home_white_24dp.png" title="home" @click="listen__home__onclick" />
    <img class="btn" src="@/assets/icons/outline_shuffle_white_24dp.png" title="rearrange frames" @click="listen__rearrange__onclick" />
    <img class="btn" src="@/assets/icons/outline_refresh_white_24dp.png" title="reset-state" @click="listen__reset_state__onclick" />
    <img class="btn" src="@/assets/icons/baseline_assessment_white_24dp.png" title="control-panel" @click="listen__cp__onclick" />
    <img class="btn" src="@/assets/icons/outline_help_outline_white_24dp.png" title="help" @click="listen__help__onclick" />
    <img v-show="isFullscreen == false" class="btn" src="@/assets/icons/outline_fullscreen_white_24dp.png" title="maxmize" @click="listen__fullscreen__onclick" />
    <img v-show="isFullscreen == true" class="btn" src="@/assets/icons/outline_fullscreen_exit_white_24dp.png" title="minimize" @click="listen__fullscreen__onclick" />
  </div>
</div>
</template>

<script>
/* eslint-disable no-console */
import lodash from 'lodash'
import elementResizeEvent from 'element-resize-event'
import MISC from '@/js/miscellaneous.js'

export default {
  props: [
    'phase',
    'state'
  ],
  data: function () {
    const Vue = this
    return {
      x: Vue.state.coord.x,
      y: Vue.state.coord.y,
      zoom: Vue.state.zoom,
      tolerance: Vue.state.diff.tolerance,
      isFullscreen: false
    }
  },
  methods: {
    listen__home__onclick: function () {
      this.$emit('tohome', {})
    },
    listen__fullscreen__onclick: function () {
      if (this.isFullscreen == true) {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
        this.isFullscreen = false
      }
      else {
        if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen()
        } else if (document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullScreen()
        }
        this.isFullscreen = true
      }
    },
    listen__rearrange__onclick: function () {
      this.$emit('frame-rearrange')
    },
    listen__x__onchange: function (e) {
      const val = parseFloat(e.currentTarget.value)
      if (isNaN(val) == false && val != this.state.coord.x) {
        this.$emit('state-tochange', {coord: {x: val, y: this.y}})
      }
    },
    listen__y__onchange: function (e) {
      const val = parseFloat(e.currentTarget.value)
      if (isNaN(val) == false && val != this.state.coord.y) {
        this.$emit('state-tochange', {coord: {x: this.x, y: val}})
      }
    },
    listen__zoom__onchange: function (e) {
      const val = parseFloat(e.currentTarget.value)
      if (isNaN(val) == false && val != this.state.zoom) {
        this.zoom = val
        this.$emit('state-tochange', {zoom: val})
      }
    },
    listen__diff_checked__onchange: function (e) {
      const val = e.target.checked
      if (val != this.state.diff.activate) {
        this.$emit('state-tochange', {diff: {activate: val}})
      }
    },
    listen__cp__onclick: function () {
      this.$emit('cp-onclick', {})
    },
    listen__reset_state__onclick: function () {
      this.$emit('state-toreset', {})
    },
    listen__help__onclick: function () {
      const Vue = this
      let dom = MISC.createElement('DIV', {}, {})
      MISC.createElement('H3', {fontSize: '20px', marginBottom: '0px', marginTop: '5px'}, {parent: dom, text: 'Control'})
      MISC.createElement('HR', {}, {parent: dom})
      const styleSpan = {fontSize: '14px', lineHeight: 1.5}
      let data = {
        Pan: 'PC - left mouse drag / Mobile - touch drag',
        Zoom: 'PC - middle mouse, or mousewheel / Mobile - two-finger spread or squish',
        'Change reference image': 'left mouse doubleclick',
        'Adjust Brightness': 'right mouse drag along a vertical axis',
        'Adjust Contrast': 'right mouse drag along a horizontal axis'
      }
      for (let key in data) {
        let div = MISC.createElement('DIV', {}, {parent: dom})
        MISC.createElement('SPAN', {...styleSpan, fontWeight: 'bold', paddingRight: '10px'}, {parent: div, text: `${key}:`})
        MISC.createElement('SPAN', styleSpan, {parent: div, text: data[key]})
      }
      Vue.$mModal.show('dialog', {
        dom: dom,
        buttons: [
          {
            title: 'confirm',
            class: ['green'],
            onclick: () => {
            }
          }
        ]
      })
    }
  },
  watch: {
    'state.coord': function (coord) {
      if (coord.x != undefined && coord.y != undefined) {
        this.x = parseFloat(coord.x.toFixed(2))
        this.y = parseFloat(coord.y.toFixed(2))
      } else {
        this.x = this.y = undefined
      }
    },
    "state.zoom": function (zoom) {
      if (zoom != undefined) this.zoom = parseFloat(zoom.toFixed(2))
      else this.zoom = undefined
    },
    "state.diff.tolerance": function (tolerance) {
      if (tolerance != undefined) this.tolerance = tolerance
      else this.tolerance = undefined
    }
  },
  mounted () {
    const Vue = this
    Vue.tolerance = Vue.state.diff.tolerance
    
    Vue.$refs['input-tolerance'].onchange = lodash.debounce(function () {
      Vue.$emit('state-tochange', {diff: {tolerance: Vue.tolerance}})
    }, 100)
    const lamp__onresize = () => {
      const elLamp = this.$el.querySelector('.lamp')
      if (elLamp.clientWidth < elLamp.scrollWidth) {
        elLamp.querySelectorAll('div:not(.w-control-panel)').forEach(el => el.style.visibility = 'hidden')
        elLamp.querySelectorAll('div.w-control-panel').forEach(el => el.style.visibility = 'visible')
      } else {
        elLamp.querySelectorAll('div:not(.w-control-panel)').forEach(el => el.style.visibility = 'visible')
        elLamp.querySelectorAll('div.w-control-panel').forEach(el => el.style.visibility = 'hidden')
      }
    }
    elementResizeEvent(this.$el.querySelector('.lamp'), lodash.debounce(lamp__onresize, 10))
    lamp__onresize()
  },
  beforeDestroy () {
    elementResizeEvent.unbind(this.$el.querySelector('.lamp'))
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
  padding: 0px 20px;
  border-bottom: 1px solid rgb(80, 80, 80);
}
div.body * {
  -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}
div.lamp {
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
  overflow:hidden;
}
div.lamp > div {
  display: inline-block;
  white-space: nowrap;
}
div.lamp > div:not(:last-of-type) {
  margin-right: 15px;
}
div.lamp span:first-child {
  font-size: 14px;
  font-weight: bold;
  color: rgb(230, 230, 230);
  margin-right: 5px;
}
div.lamp span.diff-reference-val {
  display: inline-block;
  max-width: 90px;
  font-size: 12px;
  color: rgb(230, 230, 230);
  overflow-x: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}
div.lamp span.diff-reference-val.inactive {
  color: rgb(130, 130, 130);
}
div.lamp span.tolerance-val {
  display: inline-block;
  width: 25px;
  font-size: 12px;
  color: rgb(230, 230, 230);
  margin-left: 5px;
}
div.lamp .w-control-panel {
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  padding: 6px 0px;
  justify-content: center;
}
div.lamp input {
  width: 40px;
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
  cursor: default;
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
  cursor: default;
}

div.icons {
  display: flex;
  flex-direction: row;
  align-items: center;
}
div.icons img.btn {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 1px;
  border-radius: 3px;
  border: 1px solid rgb(36, 41, 46);
}
div.incos img.btn.github {
  width: 20px;
  height: 20px;
  padding: 3px;
}
div.icons img.btn:hover {
  background: rgb(80, 80, 80);
  border: 1px solid rgb(150, 150, 150);
}
div.icons img.btn:not(:last-of-type) {
  margin-right: 1px;
}
</style>
