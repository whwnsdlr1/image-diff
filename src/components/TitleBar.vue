<template>
<div class="body">
  <div class="lamp">
    <div>
      <span>x:</span>
      <input type="number" v-model="x" />
    </div>
    <div>
      <span>y:</span>
      <input type="number" />
    </div>
    <div>
      <span>scale:</span>
      <input type="number" min="0.01" :value="scale"/>
    </div>
  </div>
  <img class="btn" src="@/assets/icons/outline_home_white_24dp.png" title="home" @click="listen__home__onclick" />
  <img v-show="setting.fullscreen == false" class="btn" src="@/assets/icons/outline_fullscreen_white_24dp.png" title="maxmize" @click="listen__fullscreen__onclick" />
  <img v-show="setting.fullscreen == true" class="btn" src="@/assets/icons/outline_fullscreen_exit_white_24dp.png" title="minimize" @click="listen__fullscreen__onclick" />
  <img class="btn" src="@/assets/icons/outline_brightness_low_white_24dp.png" title="setting" @click="listen__setting__onclick" />
</div>
</template>

<script>
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
      const dom = document.createElement('SPAN')
      dom.textContent = '3434'
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
            onclick: () => {}
          }
        ]
      })
    }
  },
  watch: {
    frameZoom: function (frameZoom) {
      this.scale = parseFloat(frameZoom.toFixed(2))
    },
    scale: function (scale) {
      this.$emit('vue-zoom', scale)
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
}
div.lamp {
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  top: -2px;
  justify-content: center;
}
div.lamp > div:not(:last-child) {
  margin-right: 20px;
}
div.lamp span {
  color: rgb(230, 230, 230);
  margin-right: 5px;
}
div.lamp input {
  width: 60px;
  border-radius: 5px;
  padding: 0px 3px;
}
img.btn {
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid rgb(36, 41, 46);
  margin-right: 5px;
}
img.btn:hover {
  background: rgb(80, 80, 80);
  border: 1px solid rgb(150, 150, 150);
}
</style>
