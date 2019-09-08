<template>
  <div class="body">
    <div class="w-row-image">
      <div class="title"><span>beforever</span></div>
      <div class="row-image">
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever/0/input.png" title="0"/>
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever/1/input.png" title="1" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever/2/input.png" title="2" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever/3/input.png" title="3" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever/4/input.png" title="4" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever/5/input.png" title="5" />
        </div>
      </div>
    </div>
    <div class="w-row-image">
      <div class="title"><span>beforever_downsampling_4x</span></div>
      <div class="row-image">
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever_downsampling_4x/0/input.png" title="0" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever_downsampling_4x/1/input.png" title="1" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever_downsampling_4x/2/input.png" title="2" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever_downsampling_4x/3/input.png" title="3" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever_downsampling_4x/4/input.png" title="4" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/beforever_downsampling_4x/5/input.png" title="5" />
        </div>
      </div>
    </div>
    <div class="w-row-image">
      <div class="title"><span>Set5</span></div>
      <div class="row-image">
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set5/baby/input.png" title="baby" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set5/bird/input.png" title="bird" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set5/butterfly/input.png" title="butterfly" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set5/head/input.png" title="head" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set5/woman/input.png" title="woman" />
        </div>
      </div>
    </div>
    <div class="w-row-image">
      <div class="title"><span>Set14</span></div>
      <div class="row-image">
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/baboon/input.png" title="baboon" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/barbara/input.png" title="barbara" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/bridge/input.png" title="bridge" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/coastguard/input.png" title="coastguard" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/comic/input.png" title="comic" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/face/input.png" title="face" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/flowers/input.png" title="flowers" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/foreman/input.png" title="foreman" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/lenna/input.png" title="lenna" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/man/input.png" title="man" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/monarch/input.png" title="monarch" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/pepper/input.png" title="pepper" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/ppt3/input.png" title="ppt3" />
        </div>
        <div class="w-image" @click="listen__img__onclick">
          <img src="@/assets/super-resolution/Set14/zebra/input.png" title="zebra" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import jsonData from '@/assets/super-resolution/temp.json'
export default {
  methods: {
    listen__img__onclick: function (e) {
      const dirname = e.currentTarget.parentElement.parentElement.querySelector('.title span').textContent
      const basename = e.currentTarget.querySelector('img').title
      this.$emit('vue-change', jsonData[dirname][basename])
    }
  },
  mounted () {
    /*
    const f = require('@/assets/super-resolution/beforever/0/bicubic__index__1.png')
    fetch(f).then(res => {
      res.arrayBuffer().then(res => console.log(res))
      console.log(res)
    })
    */
    console.log(jsonData)
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 30px 40px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 800px;
  overflow-y: auto;
}
.w-row-image {
  padding: 15px 0px 0px 0px;
  margin-bottom: 20px;
}
.w-row-image .title {
  position: absolute;
  top: 0px;
  left: 25px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(50, 50, 50, 0.5);
  padding: 2px 8px;
  border-radius: 5px;
  z-index: 3;
  font-size: 14px;
}
.row-image {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  border: 1px solid rgb(50, 50, 50);
  border-radius: 9px;
  max-width: 950px;
  overflow-x: auto;
}
.w-image {
  position: relative;
  height: 120px;
  padding: 6px;
  border: 1px solid rgba(50, 50, 50, 0.3);
  border-radius: 9px;
  margin-right: 10px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.w-image:last-child {
  margin-right: 0px;
}
.w-image:hover {
  background: rgb(230, 230, 250);
  border: 1px solid rgba(50, 50, 50, 0.8);
}
.w-image img {
  height: 100%;
}
</style>