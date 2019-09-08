<template>
<div class="body">
  <img class="btn" src="@/assets/icons/outline_home_white_24dp.png" title="home" @click="listen__home__onclick" />
  <img v-show="setting.fullscreen == false" class="btn" src="@/assets/icons/outline_fullscreen_white_24dp.png" title="maxmize" @click="listen__fullscreen__onclick" />
  <img v-show="setting.fullscreen == true" class="btn" src="@/assets/icons/outline_fullscreen_exit_white_24dp.png" title="minimize" @click="listen__fullscreen__onclick" />
  <img class="btn" src="@/assets/icons/outline_brightness_low_white_24dp.png" title="setting" />
</div>
</template>

<script>
export default {
  props: ['setting'],
  methods: {
    listen__home__onclick: function () {
      this.setting.phase = 'wait-input'
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
