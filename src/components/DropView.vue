<template>
<div class="body">
  <input ref="input-file" class="input-file" type="file" multiple accept=".jpg,.png" @change="listen__x__onchange" />
  <div ref="drop" class="drop"
    @click="listen__x__onclick"
    @dragenter="listen__x__ondragenter"
    @dragleave="listen__x__ondragleave"
    @dragover="listen__x__ondragover"
    @drop="listen__x__ondrop">
    <img class="icon" src="@/assets/icons/baseline_insert_drive_file_black_24dp.svg" />
    <span>Drop images<i>(*.jpg, *.png)</i> or Click to open dialog</span>
    <span class="caution">It only works using the client browser. No data is sent or stored anywhere.</span>
  </div>
</div>
</template>

<script>
/* eslint-disable no-console */
export default {
  methods: {
    listen__x__onclick: function () {
      this.$refs['input-file'].click()
    },
    listen__x__onchange: function (e) {
      this.$emit('vue-input-files', e.target.files)
    },
    listen__x__ondragenter: function (e) {
      e.preventDefault()
      this.$refs.drop.classList.add('mouse-in')
    },
    listen__x__ondragleave: function (e) {
      e.preventDefault()
      this.$refs.drop.classList.remove('mouse-in')
    },
    listen__x__ondragover: function (e) {
      e.preventDefault()
    },
    listen__x__ondrop: function (e) {
      e.preventDefault()
      this.$emit('vue-input-files', e.dataTransfer.files)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
div.body {
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
}
div.drop {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 3px dashed rgb(50, 50, 50);
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
div.drop .icon {
  width: 200px;
  height: 200px;
  pointer-events: none;
}
div.drop span {
  font-size: 16px;
  color: rgb(0, 0, 0);
  pointer-events: none;
}
div.drop span i {
  font-size: 14px;
  color: rgb(80, 80, 80);
}
div.drop.mouse-in,
div.drop:hover {
  background: rgb(180, 180, 180);
}
div.drop.mouse-in span i,
div.drop:hover span i {
  color: rgb(250, 250, 250);
}
div.drop span.caution {
  font-size: 12px;
  color: rgb(200, 0, 0);
  margin-top: 5px;
}
.input-file {
  position: absolute;
  top: 0px;
  left: 0px;
  visibility: hidden;
  pointer-events: none;
}

</style>
