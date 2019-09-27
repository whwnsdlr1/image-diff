<template>
<div class="m-modal">
  <div class="content">
    <div class="row0"></div>
    <div class="row1">
    </div>
    <div class="row2">
      <button v-for="(button, index) in dButtons" :key="`btn-${index}`" :class="button.class" @click="listen__x__onclick(button.onclick)">{{ button.title }}</button>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable no-console */
export default {
  methods: {
    listen__x__onclick: function (onclick) {
      onclick()
      this.$destroy()
    },
    set: function (div) {
      this.$el.querySelector('.row1').appendChild(div)
    },
    doubleRaf: function (callback) {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback)
      })
    }
  },
  mounted () {
    // console.log('modal mounted.')
    this.$el.querySelector('.row1').appendChild(this.dDom)
    this.doubleRaf(() => {
      if (this.onafterdomattached != undefined) {
        this.onafterdomattached(this.dDom)
      }
    })
  },
  destroyed () {
    // console.log('modal destroyed.')
    document.body.removeChild(this.$el)
  }
}
</script>

<style scoped>
.m-modal {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.63);
  z-index: 1000000;
}
.content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
}
.content * {
  box-sizing: border-box;
}
.content .row0 {
  position: relative;
  height: 15px;
  /* border: 1px solid rgba(20, 20, 20, 0.3); */
  /* background: rgb(190, 190, 230); */
  border-bottom: 1px solid rgb(80, 80, 80);
  background: rgb(36, 41, 46);
}
.content .row1 {
  position: relative;
  display: block;
  padding: 10px 20px;
  border-left: 1px solid rgba(20, 20, 20, 0.3);
  border-right: 1px solid rgba(20, 20, 20, 0.3);
  background: rgba(230, 230, 230, 1);
}
.content .row2 {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  height: 40px;
  align-items: center;
  padding: 0px 8px;
  border: 1px solid rgba(20, 20, 20, 0.3);
  background: rgba(230, 230, 230, 1);
}
.content .row2 button {
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0;
  padding: 2px 10px;
  font-size: 12px;
  color: rgb(20, 20, 20);
  border: 1px solid rgb(160, 160, 160);
  text-shadow: 0 1px 0 rgba(0,0,0,.2);
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: linear-gradient(to bottom, rgba(255,255,255,.3), rgba(255,255,255,0));
  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  cursor: pointer;
}
.content .row2 button:hover{
  background-color: rgb(220, 220, 220);
  color: rgb(10, 10, 10);
}
.content .row2 button:active{
  top: 1px;
  text-shadow: none;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}
.content .row2 > button:not(:first-child) {
  margin-right: -1px;
}
.content .row2 > button:first-child {
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
.content .row2 > button:last-child {
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}
.content .row2 > button.green {
  background-color: #57a957;
  color: rgb(255, 255, 255);
}
.content .row2 > button.green:hover{
  background-color: #62c462;
}
.content .row2 > button.green:active{
  background: #57a957;
}
</style>
